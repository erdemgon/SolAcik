"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const strict_1 = __importDefault(require("node:assert/strict"));
const node_test_1 = __importDefault(require("node:test"));
const checkModulatorEligibility_1 = require("../utils/cftr/checkModulatorEligibility");
const normalizeCftrVariant_1 = require("../utils/cftr/normalizeCftrVariant");
(0, node_test_1.default)('normalizes common F508del aliases', () => {
    strict_1.default.equal((0, normalizeCftrVariant_1.normalizeCftrVariant)('F508DEL')?.canonicalName, 'F508del');
    strict_1.default.equal((0, normalizeCftrVariant_1.normalizeCftrVariant)('p.Phe508del')?.canonicalName, 'F508del');
    strict_1.default.equal((0, normalizeCftrVariant_1.normalizeCftrVariant)('c.1521_1523delCTT')?.canonicalName, 'F508del');
});
(0, node_test_1.default)('marks FDA Trikafta as potentially eligible when age and F508del condition are met', () => {
    const results = (0, checkModulatorEligibility_1.checkModulatorEligibility)({
        ageYears: 8,
        variant1: 'F508del',
        variant2: 'N1303K',
        selectedRegion: 'FDA',
    });
    const trikafta = results.find((result) => result.rule.id === 'trikafta_fda_2026');
    strict_1.default.ok(trikafta);
    strict_1.default.equal(trikafta.status, 'Uygun olabilir');
    strict_1.default.equal(trikafta.ageEligible, true);
    strict_1.default.equal(trikafta.variantEligible, true);
});
(0, node_test_1.default)('does not mark Alyftrek eligible below FDA age threshold even with F508del', () => {
    const results = (0, checkModulatorEligibility_1.checkModulatorEligibility)({
        ageYears: 4,
        variant1: 'F508del',
        variant2: '',
        selectedRegion: 'FDA',
    });
    const alyftrek = results.find((result) => result.rule.id === 'alyftrek_fda_2026');
    strict_1.default.ok(alyftrek);
    strict_1.default.equal(alyftrek.status, 'Uygun görünmüyor');
    strict_1.default.equal(alyftrek.ageEligible, false);
    strict_1.default.equal(alyftrek.variantEligible, true);
});
(0, node_test_1.default)('requires verification for unknown variant spelling', () => {
    const results = (0, checkModulatorEligibility_1.checkModulatorEligibility)({
        ageYears: 8,
        variant1: 'not-a-real-local-variant',
        variant2: '',
        selectedRegion: 'FDA',
    });
    strict_1.default.ok(results.every((result) => result.status === 'Doğrulanmalı'));
    strict_1.default.ok(results.some((result) => result.warnings.some((warning) => warning.includes('sınıflandırılamadı'))));
});
