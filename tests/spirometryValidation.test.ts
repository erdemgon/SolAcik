import assert from 'node:assert/strict';
import test from 'node:test';
import { runGliLocalEngine } from '../services/gliLocalEngine';
import {
  normalizeFev1FvcRatioInput,
  validateSpirometryInputs,
} from '../utils/spirometry/spirometryInputValidation';

test('blocks GLI calculation below 36 months', () => {
  const validation = validateSpirometryInputs(35, 95);
  assert.ok(validation.blocking.some((message) => message.includes('3 yaş altı')));
});

test('blocks GLI calculation for impossible height', () => {
  assert.ok(validateSpirometryInputs(96, 39).blocking.some((message) => message.includes('Boy 40–230 cm')));
  assert.ok(validateSpirometryInputs(96, 231).blocking.some((message) => message.includes('Boy 40–230 cm')));
});

test('normalizes FEV1/FVC ratio entered as percent', () => {
  assert.equal(normalizeFev1FvcRatioInput('85'), 0.85);
  assert.equal(normalizeFev1FvcRatioInput('0.85'), 0.85);
  assert.equal(normalizeFev1FvcRatioInput('85,0'), 0.85);
});

test('does not report FEF25-75 predicted or z-score for GLI2022 Global when unavailable', async () => {
  const result = await runGliLocalEngine({
    ageMonths: 96,
    heightCm: 128,
    referenceSet: 'GLI2022_GLOBAL',
    sex: 'male',
    observed: {
      fef2575Lps: 1.4,
    },
    engine: 'local_coefficients',
  });

  const fef = result.results.find((item) => item.parameter === 'FEF25_75');
  assert.ok(fef);
  assert.equal(fef.predicted, null);
  assert.equal(fef.zScore, null);
  assert.equal(fef.interpretation, 'Hesaplanamadı / referans yok');
  assert.ok(fef.warning?.includes('GLI Global 2022 race-neutral'));
});
