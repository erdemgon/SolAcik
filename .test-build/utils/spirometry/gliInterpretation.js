"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPIROMETRY_SAFETY_WARNING = exports.LLN_Z = void 0;
exports.parameterUnit = parameterUnit;
exports.interpretParameter = interpretParameter;
exports.buildSpirometryInterpretation = buildSpirometryInterpretation;
exports.LLN_Z = -1.645;
exports.SPIROMETRY_SAFETY_WARNING = 'Bu modül resmi spirometri cihazı yazılımı veya uzman yorumunun yerine geçmez. Test kalitesi, kabul edilebilirlik, tekrarlanabilirlik ve klinik bağlamla birlikte yorumlanmalıdır.';
function parameterUnit(parameter) {
    if (parameter === 'FEV1_FVC')
        return 'ratio';
    if (parameter === 'FEF25_75')
        return 'L/s';
    return 'L';
}
function interpretParameter(result) {
    if (!result.predicted || !result.lln)
        return 'Hesaplanamadı / referans yok';
    if (result.measured === null || result.measured === undefined)
        return 'Normal değer hazır';
    if (result.zScore !== null && result.zScore !== undefined && result.zScore < exports.LLN_Z) {
        if (result.parameter === 'FEV1_FVC') {
            return 'LLN altında; obstrüksiyon lehine olabilir, klinik bağlamla yorumla';
        }
        return 'LLN altında';
    }
    return 'Normal aralıkta';
}
function buildSpirometryInterpretation(result) {
    const messages = [exports.SPIROMETRY_SAFETY_WARNING];
    const fev1Fvc = result.results.find((item) => item.parameter === 'FEV1_FVC');
    const fvc = result.results.find((item) => item.parameter === 'FVC');
    const mef = result.results.find((item) => item.parameter === 'FEF25_75');
    const ratioNormal = fev1Fvc?.zScore === null ||
        fev1Fvc?.zScore === undefined ||
        fev1Fvc.zScore >= exports.LLN_Z;
    if (fev1Fvc?.zScore !== null && fev1Fvc?.zScore !== undefined && fev1Fvc.zScore < exports.LLN_Z) {
        messages.push('FEV1/FVC z-skoru LLN altında: obstrüksiyon lehine olabilir; test kalitesi ve klinik bağlamla değerlendir.');
    }
    if (fvc?.zScore !== null && fvc?.zScore !== undefined && fvc.zScore < exports.LLN_Z && ratioNormal) {
        messages.push('Düşük FVC: restriksiyon, hava hapsi veya suboptimal efor olabilir; statik akciğer volümleri ve test kalitesi ile değerlendir.');
    }
    if (mef?.zScore !== null && mef?.zScore !== undefined && mef.zScore < exports.LLN_Z && ratioNormal) {
        messages.push('MEF25–75 değişkenliği yüksek bir parametredir; tek başına tanı koydurmaz.');
    }
    return messages;
}
