import {
  CftrVariantUpdateSource,
  cftrVariantUpdateSources,
} from '../data/cftr/cftrVariantUpdateSources';
import {
  parseVertexResponsiveVariantsFromText,
  VertexVariantParseResult,
} from '../utils/cftr/vertexVariantParser';

export type CftrVariantUpdateCheck = {
  source: CftrVariantUpdateSource;
  sourceChanged: boolean;
  previousSourceHash?: string;
  currentSourceHash?: string;
  parsed?: VertexVariantParseResult;
  status:
    | 'unchanged'
    | 'changed_requires_editor_review'
    | 'source_unavailable'
    | 'parser_failed';
  notes: string[];
};

export type CftrVariantUpdateSnapshot = {
  generatedAtIso: string;
  checks: CftrVariantUpdateCheck[];
  applyAutomatically: false;
};

export const cftrVertexUpdaterRuntimeNote =
  'Bu servis Expo istemcisinde çalıştırılmamalıdır. Vercel/Node cron veya benzeri sunucu ortamında PDF indirip metin çıkarma, hash karşılaştırma ve editör onay kuyruğu için tasarlanmıştır.';

export function buildCftrVariantUpdateSnapshotFromExtractedText({
  extractedTextsBySourceId,
  previousHashesBySourceId = {},
  currentHashesBySourceId = {},
  generatedAtIso = new Date().toISOString(),
}: {
  extractedTextsBySourceId: Partial<Record<CftrVariantUpdateSource['id'], string>>;
  previousHashesBySourceId?: Partial<Record<CftrVariantUpdateSource['id'], string>>;
  currentHashesBySourceId?: Partial<Record<CftrVariantUpdateSource['id'], string>>;
  generatedAtIso?: string;
}): CftrVariantUpdateSnapshot {
  return {
    generatedAtIso,
    applyAutomatically: false,
    checks: cftrVariantUpdateSources.map((source) => {
      const previousSourceHash = previousHashesBySourceId[source.id];
      const currentSourceHash = currentHashesBySourceId[source.id];
      const sourceChanged =
        Boolean(previousSourceHash && currentSourceHash) && previousSourceHash !== currentSourceHash;
      const extractedText = extractedTextsBySourceId[source.id];

      if (!extractedText) {
        return {
          source,
          sourceChanged,
          previousSourceHash,
          currentSourceHash,
          status: 'source_unavailable',
          notes: [
            'PDF metni sağlanmadı; bu kaynak için varyant listesi güncellenemez.',
            'Otomatik uygulama güncellemesi kapalıdır.',
          ],
        };
      }

      const parsed = parseVertexResponsiveVariantsFromText({
        drugName: source.drugName,
        sourceUrl: source.url,
        sourceVersion: source.lastManualCheckDate,
        extractedText,
        expectedTableLabel: source.expectedTableLabel,
      });

      const status =
        parsed.variants.length === 0
          ? 'parser_failed'
          : sourceChanged
            ? 'changed_requires_editor_review'
            : 'unchanged';

      return {
        source,
        sourceChanged,
        previousSourceHash,
        currentSourceHash,
        parsed,
        status,
        notes: [
          'Çıkarılan liste editör onayı olmadan data/cftr/sampleResponsiveVariants.ts içine yazılmamalıdır.',
          'Kaynak PDF formatı değişirse parser çıktısı manuel doğrulanmalıdır.',
        ],
      };
    }),
  };
}
