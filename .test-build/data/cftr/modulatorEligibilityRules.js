"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modulatorEligibilityRules = exports.cftrCoreDisclaimer = exports.cftrSourceBadge = void 0;
const sampleResponsiveVariants_1 = require("./sampleResponsiveVariants");
exports.cftrSourceBadge = 'Kaynak sürümü: FDA/EMA 2026 — FDA pratik ön kontrol; yerel koşullar ayrıca doğrulanmalıdır.';
exports.cftrCoreDisclaimer = 'Bu ekran yalnızca eğitim ve ön uygunluk kontrolü amacı taşır. Klinik karar, reçete, ilaç temini veya geri ödeme kararı yerine geçmez. Resmi ürün bilgisi, ülke etiketi, CFTR varyant raporu, ilaç etkileşimleri, karaciğer fonksiyonları, hastanın klinik durumu ve uzman değerlendirmesi ile doğrulanmalıdır.';
exports.modulatorEligibilityRules = [
    {
        id: 'trikafta_fda_2026',
        drugName: 'TRIKAFTA',
        region: 'FDA',
        minAgeYears: 2,
        ruleType: 'at_least_one_responsive_variant',
        responsiveVariants: sampleResponsiveVariants_1.trikaftaFdaResponsiveVariantSeed,
        sourceVersion: 'FDA label / Vertex PI 2026',
        sourceNote: 'FDA label: age 2 years and older with at least one F508del mutation or another responsive CFTR mutation. Expanded label includes variants responsive based on clinical/in vitro data and variants resulting in CFTR protein production. Maintain full responsive variant list in data file.',
    },
    {
        id: 'alyftrek_fda_2026',
        drugName: 'ALYFTREK',
        region: 'FDA',
        minAgeYears: 6,
        ruleType: 'at_least_one_responsive_variant',
        responsiveVariants: sampleResponsiveVariants_1.alyftrekFdaResponsiveVariantSeed,
        sourceVersion: 'FDA label / Vertex PI 2026',
        sourceNote: 'FDA label: age 6 years and older with at least one F508del mutation or another responsive CFTR mutation. Expanded label includes variants responsive based on clinical/in vitro data and variants resulting in CFTR protein production. Maintain full responsive variant list in data file.',
    },
    {
        id: 'kaftrio_ema_2026',
        drugName: 'KAFTRIO',
        region: 'EMA',
        minAgeYears: 2,
        ruleType: 'at_least_one_non_class_I_variant',
        responsiveVariants: [],
        sourceVersion: 'EMA product information 2026',
        sourceNote: 'EMA label uses at least one non-Class I CFTR mutation. Non-Class I classification must be verified from trusted CFTR variant resources.',
    },
    {
        id: 'alyftrek_ema_2026',
        drugName: 'ALYFTREK',
        region: 'EMA',
        minAgeYears: 6,
        ruleType: 'at_least_one_non_class_I_variant',
        responsiveVariants: [],
        sourceVersion: 'EMA product information 2026',
        sourceNote: 'EMA label uses at least one non-Class I CFTR mutation. Non-Class I classification must be verified.',
    },
];
