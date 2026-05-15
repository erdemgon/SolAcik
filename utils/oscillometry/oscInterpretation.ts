import {
  OscInterpretation,
  OscParameter,
  OscResultItem,
} from '../../src/modules/oscillometry/referenceEngines/types';

const Z_LIMIT = 1.645;

const highAbnormalParameters: OscParameter[] = [
  'R5',
  'R10',
  'R15',
  'R20',
  'R5_R20',
  'AX',
  'Fres',
  'Z5',
  'R8',
  'Z8',
];

const lowAbnormalParameters: OscParameter[] = ['X5', 'X10', 'X15', 'X20', 'X8'];

export function interpretOscZScore(parameter: OscParameter, zScore: number | null): OscInterpretation {
  if (zScore === null || !Number.isFinite(zScore)) return 'not_interpretable';
  if (highAbnormalParameters.includes(parameter) && zScore > Z_LIMIT) return 'high';
  if (lowAbnormalParameters.includes(parameter) && zScore < -Z_LIMIT) return 'low';
  if (zScore < -Z_LIMIT) return 'low';
  if (zScore > Z_LIMIT) return 'high';
  return 'normal';
}

export function buildOscMessages(parameter: OscParameter, interpretation: OscInterpretation) {
  if (interpretation === 'not_interpretable') {
    return {
      messageTr: 'Doğrulanmış referans katsayısı olmadığı için z-skor üretilemedi; ham değer gösteriliyor.',
      messageEn:
        'No verified reference coefficients are available; z-score was not generated and raw value is shown.',
    };
  }
  if (parameter === 'R5' && interpretation === 'high') {
    return {
      messageTr: 'Total hava yolu direncinde artış lehine olabilir.',
      messageEn: 'May suggest increased total airway resistance.',
    };
  }
  if (parameter === 'R20' && interpretation === 'high') {
    return {
      messageTr: 'Daha santral/proksimal hava yolu direncinde artış lehine olabilir.',
      messageEn: 'May suggest increased central/proximal airway resistance.',
    };
  }
  if (parameter === 'R5_R20' && interpretation === 'high') {
    return {
      messageTr: 'Periferik/küçük hava yolu disfonksiyonu lehine olabilir.',
      messageEn: 'May suggest peripheral/small airway dysfunction.',
    };
  }
  if ((parameter === 'X5' || parameter === 'X8') && interpretation === 'low') {
    return {
      messageTr: 'Elastik yüklenme veya periferik hava yolu etkilenimi lehine olabilir.',
      messageEn: 'May suggest increased elastic load or peripheral airway involvement.',
    };
  }
  if (parameter === 'AX' && interpretation === 'high') {
    return {
      messageTr: 'Periferik hava yolu etkilenimini destekleyebilir.',
      messageEn: 'May support peripheral airway involvement.',
    };
  }
  if (parameter === 'Fres' && interpretation === 'high') {
    return {
      messageTr: 'Reaktans anormalliği ve periferik hava yolu etkilenimi lehine olabilir.',
      messageEn: 'May suggest abnormal reactance and peripheral airway involvement.',
    };
  }

  const statusTr =
    interpretation === 'high' ? 'yüksek' : interpretation === 'low' ? 'düşük' : 'normal aralıkta';
  const statusEn =
    interpretation === 'high' ? 'high' : interpretation === 'low' ? 'low' : 'within normal range';
  return {
    messageTr: `${parameterLabel(parameter)} z-skoruna göre ${statusTr}.`,
    messageEn: `${parameterLabel(parameter)} was ${statusEn} by z-score.`,
  };
}

export function parameterLabel(parameter: OscParameter) {
  return parameter === 'R5_R20' ? 'R5-R20' : parameter;
}

export function buildOscReport(items: OscResultItem[]) {
  const abnormal = items.filter((item) => item.interpretation === 'high' || item.interpretation === 'low');
  const targetItems = abnormal.length ? abnormal : items.filter((item) => item.measured !== null);

  if (targetItems.length === 0) {
    return {
      tr: 'Yorumlanabilir osilometri ölçümü girilmedi.',
      en: 'No interpretable oscillometry measurement was entered.',
    };
  }

  const hasReference = targetItems.some((item) => item.zScore !== null);
  if (!hasReference) {
    return {
      tr:
        'Seçilen cihaz/referans seti için doğrulanmış katsayı bulunmadığından z-skor üretilemedi. Ham değerler gösterilmektedir.',
      en:
        'No verified coefficients are available for the selected device/reference set, so z-scores were not generated. Raw values are displayed.',
    };
  }

  return {
    tr: `${targetItems.map((item) => item.messageTr).join(' ')} Bulgular cihaz, kalite kriterleri ve klinik bağlamla birlikte değerlendirilmelidir.`,
    en: `${targetItems.map((item) => item.messageEn).join(' ')} Findings should be interpreted together with device, quality criteria and clinical context.`,
  };
}
