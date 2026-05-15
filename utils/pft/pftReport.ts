import { PftResultItem } from '../../src/modules/pft/referenceEngines/types';
import { parameterLabel } from './pftInterpretation';

export function buildPftReport(items: PftResultItem[]) {
  const abnormal = items.filter(
    (item) => item.interpretation === 'low' || item.interpretation === 'high',
  );
  const reportItems = abnormal.length ? abnormal : items;

  const trBody = reportItems.length
    ? reportItems.map(formatTurkishSentence).join(' ')
    : 'Yorumlanabilir ölçüm bulunmadı.';
  const enBody = reportItems.length
    ? reportItems.map(formatEnglishSentence).join(' ')
    : 'No interpretable measurement was available.';

  return {
    tr: `${trBody} Bulgular klinik, görüntüleme, cihaz çıktısı ve kalite kriterleri ile birlikte yorumlanmalıdır.`,
    en: `${enBody} Findings should be interpreted together with clinical context, imaging, device output, and quality criteria.`,
  };
}

function formatTurkishSentence(item: PftResultItem) {
  const label = parameterLabel(item.parameter);
  if (item.zScore === null) {
    return `${label} ölçümü ${formatMeasured(item)}; z-skor hesaplanamadı.`;
  }
  const status =
    item.interpretation === 'low'
      ? 'düşük'
      : item.interpretation === 'high'
        ? 'yüksek'
        : 'normal aralıkta';
  return `${label} z-skoru ${formatZ(item.zScore)} olup ${status} saptandı. ${item.messageTr}`;
}

function formatEnglishSentence(item: PftResultItem) {
  const label = parameterLabel(item.parameter);
  if (item.zScore === null) {
    return `${label} was ${formatMeasured(item)}; z-score could not be calculated.`;
  }
  return `${label} z-score was ${formatZ(item.zScore)}. ${item.messageEn}`;
}

function formatMeasured(item: PftResultItem) {
  if (item.measured === null) return '—';
  if (item.unit === 'ratio') return item.measured.toFixed(2);
  return `${item.measured.toFixed(2)} ${item.unit}`;
}

function formatZ(value: number) {
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}`;
}
