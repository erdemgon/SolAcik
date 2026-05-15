import assert from 'node:assert/strict';
import test from 'node:test';
import { calculateOscillometry } from '../services/oscillometryReferenceEngine';
import { calculateLmsZScore, calculateR5R20 } from '../utils/oscillometry/oscCalculations';
import { buildOscReport, interpretOscZScore } from '../utils/oscillometry/oscInterpretation';
import { axToKpa, resistanceReactanceToKpa } from '../utils/oscillometry/oscUnits';

test('converts resistance/reactance and AX units to canonical kPa units', () => {
  assert.equal(resistanceReactanceToKpa(10, 'hPa/L/s'), 1);
  assert.ok(Math.abs(resistanceReactanceToKpa(10.1972, 'cmH2O/L/s') - 1) < 0.00001);
  assert.equal(axToKpa(10, 'hPa/L'), 1);
});

test('calculates R5-R20 automatically', () => {
  assert.equal(calculateR5R20({ r5: 0.75, r20: 0.45 }), 0.3);
  assert.equal(calculateR5R20({ r5: 0.75, r20: null }), null);
});

test('does not produce z-score when coefficients are unavailable', async () => {
  const result = await calculateOscillometry({
    ageYears: 8,
    device: 'Resmon PRO FULL',
    heightCm: 130,
    measured: { R8: 0.5 },
    quality: {},
    referenceSetId: 'valach_2024_resmon_6_17',
    sex: 'female',
  });

  assert.equal(result.items[0].zScore, null);
  assert.equal(result.items[0].predicted, null);
  assert.ok(result.warnings.some((warning) => warning.includes('verified coefficient')));
});

test('returns age and height out-of-range warnings', async () => {
  const result = await calculateOscillometry({
    ageYears: 5,
    device: 'Resmon PRO FULL',
    heightCm: 90,
    measured: { R8: 0.5 },
    quality: {},
    referenceSetId: 'valach_2024_resmon_6_17',
    sex: 'male',
  });

  assert.ok(result.warnings.some((warning) => warning.includes('yaş')));
  assert.ok(result.warnings.some((warning) => warning.includes('boy')));
});

test('calculates LMS z-score', () => {
  const z = calculateLmsZScore({
    coefficient: {
      formulaType: 'LMS',
      parameter: 'R8',
      l: 0,
      m: 0.5,
      s: 0.1,
    },
    input: {
      ageYears: 8,
      heightCm: 130,
      sex: 'female',
    },
    measured: 0.55,
  });

  assert.ok(z !== null);
  assert.ok(Math.abs(z - Math.log(1.1) / 0.1) < 0.000001);
});

test('builds oscillometry report without reference coefficients', async () => {
  const result = await calculateOscillometry({
    ageYears: 8,
    device: 'Other / Unknown',
    heightCm: 130,
    measured: { R5: 0.8, R20: 0.4 },
    quality: {
      numberOfTrials: 2,
    },
    referenceSetId: 'raw_values_only',
    sex: 'female',
  });

  assert.equal(result.items.length, 3);
  assert.ok(result.reportTr.includes('z-skor üretilemedi'));
  assert.ok(result.warnings.some((warning) => warning.includes('trial sayısı')));
  assert.equal(interpretOscZScore('R5', 2), 'high');
  assert.ok(buildOscReport(result.items).en.includes('Raw values'));
});
