import {
  GliParameter,
  GliSpirometryParameterResult,
  GliSpirometryResult,
} from './gliTypes';

export const LLN_Z = -1.645;
export const SPIROMETRY_SAFETY_WARNING =
  'Bu modül resmi spirometri cihazı yazılımı veya uzman yorumunun yerine geçmez. Test kalitesi, kabul edilebilirlik, tekrarlanabilirlik ve klinik bağlamla birlikte yorumlanmalıdır.';

export function parameterUnit(parameter: GliParameter): GliSpirometryParameterResult['unit'] {
  if (parameter === 'FEV1_FVC') return 'ratio';
  if (parameter === 'FEF25_75') return 'L/s';
  return 'L';
}

export function interpretParameter(result: {
  parameter: GliParameter;
  predicted: number | null;
  lln: number | null;
  measured?: number | null;
  zScore?: number | null;
}) {
  if (!result.predicted || !result.lln) return 'Hesaplanamadı / referans yok';
  if (result.measured === null || result.measured === undefined) return 'Normal değer hazır';
  if (result.zScore !== null && result.zScore !== undefined && result.zScore < LLN_Z) {
    if (result.parameter === 'FEV1_FVC') {
      return 'LLN altında; obstrüksiyon lehine olabilir, klinik bağlamla yorumla';
    }
    return 'LLN altında';
  }
  return 'Normal aralıkta';
}

export function buildSpirometryInterpretation(result: GliSpirometryResult) {
  const messages = [SPIROMETRY_SAFETY_WARNING];
  const fev1Fvc = result.results.find((item) => item.parameter === 'FEV1_FVC');
  const fvc = result.results.find((item) => item.parameter === 'FVC');
  const mef = result.results.find((item) => item.parameter === 'FEF25_75');
  const ratioNormal =
    fev1Fvc?.zScore === null ||
    fev1Fvc?.zScore === undefined ||
    fev1Fvc.zScore >= LLN_Z;

  if (fev1Fvc?.zScore !== null && fev1Fvc?.zScore !== undefined && fev1Fvc.zScore < LLN_Z) {
    messages.push(
      'FEV1/FVC z-skoru LLN altında: obstrüksiyon lehine olabilir; test kalitesi ve klinik bağlamla değerlendir.',
    );
  }

  if (fvc?.zScore !== null && fvc?.zScore !== undefined && fvc.zScore < LLN_Z && ratioNormal) {
    messages.push(
      'Düşük FVC: restriksiyon, hava hapsi veya suboptimal efor olabilir; statik akciğer volümleri ve test kalitesi ile değerlendir.',
    );
  }

  if (mef?.zScore !== null && mef?.zScore !== undefined && mef.zScore < LLN_Z && ratioNormal) {
    messages.push(
      'MEF25–75 değişkenliği yüksek bir parametredir; tek başına tanı koydurmaz.',
    );
  }

  return messages;
}
