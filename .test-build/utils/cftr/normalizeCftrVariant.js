"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCftrVariant = normalizeCftrVariant;
const cftrVariantAliases_1 = require("../../data/cftr/cftrVariantAliases");
function normalizeCftrVariant(input) {
    const original = input;
    const trimmed = input.trim();
    if (!trimmed)
        return null;
    const compact = normalizeText(trimmed);
    const found = cftrVariantAliases_1.cftrVariantAliases.find((variant) => {
        const names = [variant.canonicalName, ...variant.aliases];
        return names.some((name) => normalizeText(name) === compact);
    });
    if (found) {
        return {
            original,
            canonicalName: found.canonicalName,
            foundInLocalData: true,
            proteinProductionClass: found.proteinProductionClass ?? 'unknown',
            cftrClass: found.cftrClass ?? 'unknown',
            note: found.notes ?? 'Yerel varyant alias dosyasında bulundu.',
        };
    }
    return {
        original,
        canonicalName: trimmed,
        foundInLocalData: false,
        proteinProductionClass: 'unknown',
        cftrClass: 'unknown',
        note: 'Varyant yazımı doğrulanmalı.',
    };
}
function normalizeText(value) {
    return value
        .trim()
        .replace(/\s+/g, '')
        .replace(/→/g, '>')
        .replace(/->/g, '>')
        .replace(/^p\./i, '')
        .toUpperCase();
}
