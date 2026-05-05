import assert from 'node:assert/strict';
import test from 'node:test';
import { checkModulatorEligibility } from '../utils/cftr/checkModulatorEligibility';
import { normalizeCftrVariant } from '../utils/cftr/normalizeCftrVariant';

test('normalizes common F508del aliases', () => {
  assert.equal(normalizeCftrVariant('F508DEL')?.canonicalName, 'F508del');
  assert.equal(normalizeCftrVariant('p.Phe508del')?.canonicalName, 'F508del');
  assert.equal(normalizeCftrVariant('c.1521_1523delCTT')?.canonicalName, 'F508del');
});

test('marks FDA Trikafta as potentially eligible when age and F508del condition are met', () => {
  const results = checkModulatorEligibility({
    ageYears: 8,
    variant1: 'F508del',
    variant2: 'N1303K',
    selectedRegion: 'FDA',
  });

  const trikafta = results.find((result) => result.rule.id === 'trikafta_fda_2026');
  assert.ok(trikafta);
  assert.equal(trikafta.status, 'Uygun olabilir');
  assert.equal(trikafta.ageEligible, true);
  assert.equal(trikafta.variantEligible, true);
});

test('does not mark Alyftrek eligible below FDA age threshold even with F508del', () => {
  const results = checkModulatorEligibility({
    ageYears: 4,
    variant1: 'F508del',
    variant2: '',
    selectedRegion: 'FDA',
  });

  const alyftrek = results.find((result) => result.rule.id === 'alyftrek_fda_2026');
  assert.ok(alyftrek);
  assert.equal(alyftrek.status, 'Uygun görünmüyor');
  assert.equal(alyftrek.ageEligible, false);
  assert.equal(alyftrek.variantEligible, true);
});

test('requires verification for unknown variant spelling', () => {
  const results = checkModulatorEligibility({
    ageYears: 8,
    variant1: 'not-a-real-local-variant',
    variant2: '',
    selectedRegion: 'FDA',
  });

  assert.ok(results.every((result) => result.status === 'Doğrulanmalı'));
  assert.ok(results.some((result) => result.warnings.some((warning) => warning.includes('sınıflandırılamadı'))));
});
