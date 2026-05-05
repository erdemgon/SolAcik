"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkModulatorEligibility = checkModulatorEligibility;
const modulatorEligibilityRules_1 = require("../../data/cftr/modulatorEligibilityRules");
const normalizeCftrVariant_1 = require("./normalizeCftrVariant");
function checkModulatorEligibility({ ageYears, variant1, variant2, selectedRegion, }) {
    const normalizedVariants = [variant1, variant2]
        .map(normalizeCftrVariant_1.normalizeCftrVariant)
        .filter((variant) => variant !== null);
    const rules = modulatorEligibilityRules_1.modulatorEligibilityRules.filter((rule) => selectedRegion === 'All' || rule.region === selectedRegion);
    return rules.map((rule) => evaluateRule({
        rule,
        ageYears,
        normalizedVariants,
    }));
}
function evaluateRule({ rule, ageYears, normalizedVariants, }) {
    const warnings = [];
    const ageEligible = ageYears !== null && ageYears >= rule.minAgeYears;
    if (ageYears === null) {
        warnings.push('Yaş girilmeden yaş koşulu değerlendirilemez.');
    }
    else if (!ageEligible) {
        warnings.push('Yaş koşulu sağlanmıyor gibi görünüyor; resmi ürün bilgisi ve uzman değerlendirmesi ile doğrulanmalıdır.');
    }
    if (normalizedVariants.length === 0) {
        warnings.push('CFTR varyantı girilmeden uygunluk değerlendirilemez.');
    }
    if (normalizedVariants.some((variant) => !variant.foundInLocalData)) {
        warnings.push('Bu varyant lokal veritabanında sınıflandırılamadı. CFTR2, ClinVar/CFTR-France, resmi ürün bilgisi veya uzman genetik değerlendirme ile doğrulanmalıdır.');
    }
    const variantEligible = getVariantEligibility(rule, normalizedVariants);
    const status = getStatus(ageYears !== null, ageEligible, variantEligible, normalizedVariants.length);
    const explanation = buildExplanation(rule, ageYears !== null, ageEligible, variantEligible);
    return {
        rule,
        drugName: rule.drugName,
        ageKnown: ageYears !== null,
        ageEligible,
        variantEligible,
        status,
        explanation,
        warnings,
        normalizedVariants,
    };
}
function getVariantEligibility(rule, variants) {
    if (variants.length === 0)
        return 'unknown';
    if (rule.ruleType === 'at_least_one_f508del') {
        return variants.some((variant) => variant.canonicalName === 'F508del');
    }
    if (rule.ruleType === 'at_least_one_responsive_variant') {
        if (variants.some((variant) => rule.responsiveVariants.includes(variant.canonicalName))) {
            return true;
        }
        if (variants.some((variant) => variant.proteinProductionClass === 'protein-producing' &&
            variant.foundInLocalData)) {
            return 'unknown';
        }
        return variants.some((variant) => !variant.foundInLocalData) ? 'unknown' : false;
    }
    if (rule.ruleType === 'at_least_one_protein_producing_variant') {
        if (variants.some((variant) => variant.proteinProductionClass === 'protein-producing')) {
            return true;
        }
        return variants.some((variant) => variant.proteinProductionClass === 'unknown')
            ? 'unknown'
            : false;
    }
    if (rule.ruleType === 'at_least_one_non_class_I_variant') {
        if (variants.some((variant) => variant.cftrClass !== 'I' && variant.cftrClass !== 'unknown')) {
            return true;
        }
        return variants.some((variant) => variant.cftrClass === 'unknown') ? 'unknown' : false;
    }
    return 'unknown';
}
function getStatus(ageKnown, ageEligible, variantEligible, variantCount) {
    if (!ageKnown)
        return 'Doğrulanmalı';
    if (variantCount === 0 || variantEligible === 'unknown')
        return 'Doğrulanmalı';
    if (ageEligible && variantEligible === true)
        return 'Uygun olabilir';
    return 'Uygun görünmüyor';
}
function buildExplanation(rule, ageKnown, ageEligible, variantEligible) {
    const ageText = !ageKnown
        ? `Yaş girilmedi; yaş koşulu değerlendirilemedi: ≥${rule.minAgeYears} yıl.`
        : ageEligible
            ? `Yaş koşulu sağlanıyor: ≥${rule.minAgeYears} yıl.`
            : `Yaş koşulu sağlanmıyor olabilir: ≥${rule.minAgeYears} yıl gerekir.`;
    if (variantEligible === true) {
        return `${ageText} Varyant koşulu yerel data setine göre karşılanıyor olabilir.`;
    }
    if (variantEligible === false) {
        return `${ageText} Girilen varyantlar bu yerel data setinde uygun varyant koşulunu karşılamıyor görünüyor.`;
    }
    return `${ageText} Varyant koşulu lokal veriyle kesin sınıflandırılamadı; resmi kaynakla doğrulanmalıdır.`;
}
