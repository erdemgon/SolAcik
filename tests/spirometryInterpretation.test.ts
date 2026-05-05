import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildSpirometryInterpretation,
  interpretParameter,
  LLN_Z,
  parameterUnit,
} from '../utils/spirometry/gliInterpretation';
import type { GliSpirometryResult } from '../utils/spirometry/gliTypes';

test('maps spirometry parameters to expected units', () => {
  assert.equal(parameterUnit('FEV1'), 'L');
  assert.equal(parameterUnit('FVC'), 'L');
  assert.equal(parameterUnit('FEV1_FVC'), 'ratio');
  assert.equal(parameterUnit('FEF25_75'), 'L/s');
});

test('interprets values below LLN using z-score threshold', () => {
  assert.equal(
    interpretParameter({
      parameter: 'FEV1',
      predicted: 1.4,
      lln: 1.1,
      measured: 1,
      zScore: LLN_Z - 0.1,
    }),
    'LLN altında',
  );

  assert.equal(
    interpretParameter({
      parameter: 'FEV1_FVC',
      predicted: 0.86,
      lln: 0.78,
      measured: 0.72,
      zScore: LLN_Z - 0.1,
    }),
    'LLN altında; obstrüksiyon lehine olabilir, klinik bağlamla yorumla',
  );
});

test('adds obstruction and MEF caution messages without diagnosing disease', () => {
  const result: GliSpirometryResult = {
    engine: 'local_coefficients',
    source: 'test',
    sourceVersion: 'test',
    warnings: [],
    results: [
      {
        parameter: 'FEV1_FVC',
        predicted: 0.86,
        lln: 0.78,
        measured: 0.72,
        zScore: -2,
        interpretation: 'LLN altında',
        unit: 'ratio',
      },
      {
        parameter: 'FVC',
        predicted: 1.6,
        lln: 1.3,
        measured: 1.55,
        zScore: -0.2,
        interpretation: 'Normal aralıkta',
        unit: 'L',
      },
      {
        parameter: 'FEF25_75',
        predicted: 1.7,
        lln: 1.1,
        measured: 1,
        zScore: -2,
        interpretation: 'LLN altında',
        unit: 'L/s',
      },
    ],
  };

  const messages = buildSpirometryInterpretation(result);
  assert.ok(messages.some((message) => message.includes('obstrüksiyon lehine olabilir')));
  assert.ok(messages.every((message) => !message.includes('astım tanısı')));
});
