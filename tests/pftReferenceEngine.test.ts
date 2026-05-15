import assert from 'node:assert/strict';
import test from 'node:test';
import { fetchPftReferenceFromBackend } from '../services/pftApiClient';
import { pftLocalEngine } from '../services/pftLocalEngine';
import { calculateRvTlcRatio, classifyPftZScore, createPftResultItem } from '../utils/pft/pftInterpretation';
import { buildPftReport } from '../utils/pft/pftReport';

test('calculates RV/TLC ratio only when RV and TLC are present', () => {
  assert.equal(calculateRvTlcRatio({ rvMeasured: 1.2, tlcMeasured: 4 }), 0.3);
  assert.equal(calculateRvTlcRatio({ rvMeasured: null, tlcMeasured: 4 }), null);
  assert.equal(calculateRvTlcRatio({ rvMeasured: 1.2, tlcMeasured: 0 }), null);
});

test('classifies z-scores by LLN and ULN thresholds', () => {
  assert.equal(classifyPftZScore(-1.7), 'low');
  assert.equal(classifyPftZScore(1.7), 'high');
  assert.equal(classifyPftZScore(0), 'normal');
  assert.equal(classifyPftZScore(null), 'not_interpretable');
});

test('handles missing measured values without crashing local engine', async () => {
  const result = await pftLocalEngine.calculate({
    ageYears: 8.5,
    heightCm: 130,
    measured: {
      TLC: 3,
      RV: null,
    },
    sex: 'female',
    testType: 'lungVolume',
  });

  assert.equal(result.engineStatus, 'unavailable');
  assert.equal(result.items.length, 1);
  assert.equal(result.items[0].parameter, 'TLC');
  assert.equal(result.items[0].predicted, null);
});

test('builds bilingual report sentences from abnormal values', () => {
  const items = [
    createPftResultItem({
      testType: 'tlco',
      parameter: 'TLCO',
      measured: 4.1,
      predicted: 6,
      lln: 4.8,
      uln: 8,
      zScore: -2.1,
      unit: 'mmol/min/kPa',
      source: 'test',
    }),
    createPftResultItem({
      testType: 'lungVolume',
      parameter: 'RV_TLC',
      measured: 0.48,
      predicted: 0.3,
      lln: 0.2,
      uln: 0.42,
      zScore: 2.2,
      unit: 'ratio',
      source: 'test',
    }),
  ];

  const report = buildPftReport(items);
  assert.ok(report.tr.includes('TLCO (DLCO) z-skoru -2.10'));
  assert.ok(report.tr.toLowerCase().includes('hava hapsi'));
  assert.ok(report.en.includes('TLCO (DLCO) z-score was -2.10'));
});

test('API engine disabled response does not crash', async () => {
  const result = await fetchPftReferenceFromBackend({
    ageYears: 9,
    heightCm: 135,
    measured: { LCI: 7.5 },
    sex: 'male',
    testType: 'mbw',
  });

  assert.equal(result.engineStatus, 'unavailable');
  assert.ok(result.warnings.some((warning) => warning.includes('GLI API')));
});
