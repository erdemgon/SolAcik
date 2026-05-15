import {
  PftInterpretation,
  PftParameter,
  PftResultItem,
  PftTestType,
} from '../../src/modules/pft/referenceEngines/types';

export const PFT_LLN_Z = -1.645;
export const PFT_ULN_Z = 1.645;

export function classifyPftZScore(zScore: number | null | undefined): PftInterpretation {
  if (zScore === null || zScore === undefined || !Number.isFinite(zScore)) {
    return 'not_interpretable';
  }
  if (zScore < PFT_LLN_Z) return 'low';
  if (zScore > PFT_ULN_Z) return 'high';
  return 'normal';
}

export function calculateRvTlcRatio({
  rvMeasured,
  tlcMeasured,
}: {
  rvMeasured: number | null | undefined;
  tlcMeasured: number | null | undefined;
}) {
  if (!rvMeasured || !tlcMeasured || rvMeasured <= 0 || tlcMeasured <= 0) return null;
  return rvMeasured / tlcMeasured;
}

export function buildPftMessage({
  parameter,
  interpretation,
}: {
  parameter: PftParameter;
  interpretation: PftInterpretation;
}) {
  if (interpretation === 'not_interpretable') {
    return {
      messageTr: 'Referans/predicted veya z-skor hesaplanamadı; ölçüm cihaz çıktısı ve kaynakla doğrulanmalıdır.',
      messageEn:
        'Reference/predicted value or z-score could not be calculated; verify with device output and source reference.',
    };
  }

  if (parameter === 'TLC' && interpretation === 'low') {
    return {
      messageTr:
        'Restriktif patern ile uyumlu olabilir; klinik ve diğer bulgularla birlikte değerlendirilmelidir.',
      messageEn:
        'May suggest a restrictive pattern; interpret together with clinical context and other findings.',
    };
  }
  if (parameter === 'RV_TLC' && interpretation === 'high') {
    return {
      messageTr: 'Hava hapsi lehine olabilir.',
      messageEn: 'May support air trapping.',
    };
  }
  if (parameter === 'RV' && interpretation === 'high') {
    return {
      messageTr: 'Hava hapsi / hiperinflasyon lehine olabilir.',
      messageEn: 'May support air trapping / hyperinflation.',
    };
  }
  if (parameter === 'TLCO' && interpretation === 'low') {
    return {
      messageTr: 'Gaz transferinde azalma ile uyumlu olabilir.',
      messageEn: 'Consistent with reduced gas transfer.',
    };
  }
  if (parameter === 'KCO' && interpretation === 'low') {
    return {
      messageTr: 'Alveol-kapiller transfer azalması lehine olabilir.',
      messageEn: 'May suggest reduced alveolar-capillary transfer.',
    };
  }
  if (parameter === 'VA' && interpretation === 'low') {
    return {
      messageTr: 'Ventile alveoler hacim azalması ile uyumlu olabilir.',
      messageEn: 'May suggest reduced ventilated alveolar volume.',
    };
  }
  if (parameter === 'LCI' && interpretation === 'high') {
    return {
      messageTr: 'Ventilasyon inhomojenitesi lehine olabilir.',
      messageEn: 'May suggest ventilation inhomogeneity.',
    };
  }

  const statusTr =
    interpretation === 'low' ? 'düşük' : interpretation === 'high' ? 'yüksek' : 'normal aralıkta';
  const statusEn =
    interpretation === 'low' ? 'low' : interpretation === 'high' ? 'high' : 'within the normal range';
  return {
    messageTr: `${parameterLabel(parameter)} z-skoruna göre ${statusTr}.`,
    messageEn: `${parameterLabel(parameter)} was ${statusEn} by z-score.`,
  };
}

export function createPftResultItem({
  testType,
  parameter,
  measured,
  unit,
  source,
  predicted = null,
  lln = null,
  uln = null,
  zScore = null,
}: {
  testType: PftTestType;
  parameter: PftParameter;
  measured: number | null;
  unit: PftResultItem['unit'];
  source: string;
  predicted?: number | null;
  lln?: number | null;
  uln?: number | null;
  zScore?: number | null;
}): PftResultItem {
  const interpretation = classifyPftZScore(zScore);
  const percentPredicted =
    measured !== null && predicted !== null && predicted > 0 ? (measured / predicted) * 100 : null;
  const messages = buildPftMessage({ parameter, interpretation });

  return {
    testType,
    parameter,
    measured,
    predicted,
    zScore,
    lln,
    uln,
    percentPredicted,
    unit,
    interpretation,
    source,
    ...messages,
  };
}

export function parameterLabel(parameter: PftParameter) {
  const labels: Record<PftParameter, string> = {
    FEV1: 'FEV1',
    FVC: 'FVC',
    FEV1_FVC: 'FEV1/FVC',
    FEF25_75: 'FEF25–75 / MEF25–75',
    TLCO: 'TLCO (DLCO)',
    VA: 'VA',
    KCO: 'KCO',
    FRC: 'FRC',
    TLC: 'TLC',
    RV: 'RV',
    RV_TLC: 'RV/TLC',
    ERV: 'ERV',
    IC: 'IC',
    VC: 'VC',
    FRC_MBW: 'MBW-FRC',
    LCI: 'LCI',
  };
  return labels[parameter];
}
