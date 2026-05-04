import { GliPredictionResult } from './gliLms';

export const LLN_Z = -1.645;

export function getParameterStatus(result: GliPredictionResult) {
  if (!result.predicted || !result.lln) return 'Hesaplanamadı / referans yok';
  if (result.zScore === null || result.zScore === undefined) return 'Normal değer hazır';
  if (result.zScore < LLN_Z) return 'LLN altında';
  return 'Normal aralıkta';
}

export function buildInterpretation(results: GliPredictionResult[]) {
  const messages = [
    'Yorum öncesi kabul edilebilirlik, tekrarlanabilirlik ve efor kalitesi kontrol edilmelidir.',
  ];

  const fev1Fvc = results.find((result) => result.parameter === 'FEV1_FVC');
  const fvc = results.find((result) => result.parameter === 'FVC');
  const mef = results.find((result) => result.parameter === 'FEF25_75');

  if (fev1Fvc?.zScore !== null && fev1Fvc?.zScore !== undefined && fev1Fvc.zScore < LLN_Z) {
    messages.push(
      'FEV1/FVC z-skoru LLN altında: obstrüksiyon lehine olabilir; test kalitesi ve klinik bağlamla değerlendir.',
    );
  }

  const ratioNormal =
    fev1Fvc?.zScore === null ||
    fev1Fvc?.zScore === undefined ||
    fev1Fvc.zScore >= LLN_Z;
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
