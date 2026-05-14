import { normalizeCftrVariant } from './normalizeCftrVariant';

export type VertexVariantParseInput = {
  drugName: 'TRIKAFTA' | 'ALYFTREK';
  sourceUrl: string;
  sourceVersion: string;
  extractedText: string;
  expectedTableLabel: string;
};

export type VertexVariantParseResult = {
  drugName: 'TRIKAFTA' | 'ALYFTREK';
  sourceUrl: string;
  sourceVersion: string;
  variants: string[];
  warnings: string[];
  requiresEditorReview: boolean;
};

const SECTION_STOP_PATTERNS = [
  'References',
  'How Supplied',
  'Storage and Handling',
  'Patient Counseling Information',
  'Medication Guide',
  'Table ',
];

const VARIANT_PATTERN =
  /\b(?:F508DEL|F508del|[A-Z][0-9]{1,4}[A-Z](?:del|ins)?|[0-9]{3,4}\+[0-9]+kb[A-Z](?:>|->|→)[A-Z]|c\.[0-9A-Za-z_+\-.>]+|p\.[A-Za-z0-9]+(?:del|ins|Ter|fs)?)\b/g;

export function parseVertexResponsiveVariantsFromText({
  drugName,
  sourceUrl,
  sourceVersion,
  extractedText,
  expectedTableLabel,
}: VertexVariantParseInput): VertexVariantParseResult {
  const warnings: string[] = [];
  const normalizedText = extractedText.replace(/\s+/g, ' ').trim();
  const labelIndex = normalizedText.toLowerCase().indexOf(expectedTableLabel.toLowerCase());

  if (!normalizedText) {
    return {
      drugName,
      sourceUrl,
      sourceVersion,
      variants: [],
      warnings: ['PDF metni boş geldi; varyant listesi çıkarılamadı.'],
      requiresEditorReview: true,
    };
  }

  if (labelIndex < 0) {
    return {
      drugName,
      sourceUrl,
      sourceVersion,
      variants: [],
      warnings: [
        'Beklenen Vertex tablo başlığı bulunamadı; kaynak formatı değişmiş olabilir.',
      ],
      requiresEditorReview: true,
    };
  }

  const sectionText = normalizedText.slice(labelIndex + expectedTableLabel.length);
  const stopIndex = findFirstStopIndex(sectionText);
  const tableText = stopIndex >= 0 ? sectionText.slice(0, stopIndex) : sectionText;
  const matches = tableText.match(VARIANT_PATTERN) ?? [];
  const variants = dedupe(
    matches
      .map((variant) => normalizeCftrVariant(variant)?.canonicalName ?? normalizeVariantText(variant))
      .filter(Boolean),
  );

  if (variants.length === 0) {
    warnings.push('Tablo başlığı bulundu ancak varyant yakalanamadı; manuel kontrol gerekli.');
  }

  return {
    drugName,
    sourceUrl,
    sourceVersion,
    variants,
    warnings,
    requiresEditorReview: true,
  };
}

function findFirstStopIndex(text: string) {
  return SECTION_STOP_PATTERNS.map((pattern) => text.indexOf(pattern))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0] ?? -1;
}

function normalizeVariantText(value: string) {
  return value
    .trim()
    .replace(/F508DEL/i, 'F508del')
    .replace(/Phe508del/i, 'F508del')
    .replace(/c\.1521_1523delCTT/i, 'F508del')
    .replace(/->|→/g, '>');
}

function dedupe(values: string[]) {
  return Array.from(new Set(values));
}
