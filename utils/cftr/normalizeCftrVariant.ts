import { cftrVariantAliases } from '../../data/cftr/cftrVariantAliases';

export type NormalizedCftrVariant = {
  original: string;
  canonicalName: string;
  foundInLocalData: boolean;
  proteinProductionClass: 'protein-producing' | 'non-protein-producing' | 'unknown';
  cftrClass: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'unknown';
  note: string;
};

export function normalizeCftrVariant(input: string): NormalizedCftrVariant | null {
  const original = input;
  const trimmed = input.trim();
  if (!trimmed) return null;

  const compact = normalizeText(trimmed);
  const found = cftrVariantAliases.find((variant) => {
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

function normalizeText(value: string) {
  return value
    .trim()
    .replace(/\s+/g, '')
    .replace(/→/g, '>')
    .replace(/->/g, '>')
    .replace(/^p\./i, '')
    .toUpperCase();
}
