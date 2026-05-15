import { oscillometryQualityThresholds } from '../../data/oscillometry/qualityThresholds';
import { OscQualityInput } from '../../src/modules/oscillometry/referenceEngines/types';

export function buildOscQualityWarnings(quality: OscQualityInput) {
  const warnings: string[] = [];
  const missing: string[] = [];

  if (quality.numberOfTrials === null || quality.numberOfTrials === undefined) missing.push('trial sayısı');
  if (
    quality.acquisitionDurationSeconds === null ||
    quality.acquisitionDurationSeconds === undefined
  ) {
    missing.push('kayıt süresi');
  }
  if (quality.withinSessionCvPercent === null || quality.withinSessionCvPercent === undefined) {
    missing.push('within-session CV');
  }

  if (missing.length > 0) {
    warnings.push(`Quality-control fields incomplete: ${missing.join(', ')} eksik.`);
  }
  if (
    quality.numberOfTrials !== null &&
    quality.numberOfTrials !== undefined &&
    quality.numberOfTrials < oscillometryQualityThresholds.minTrials
  ) {
    warnings.push('Interpret with caution: trial sayısı düşük görünüyor.');
  }
  if (
    quality.acquisitionDurationSeconds !== null &&
    quality.acquisitionDurationSeconds !== undefined &&
    quality.acquisitionDurationSeconds < oscillometryQualityThresholds.minAcquisitionDurationSeconds
  ) {
    warnings.push('Interpret with caution: kayıt süresi kısa görünüyor.');
  }
  if (
    quality.withinSessionCvPercent !== null &&
    quality.withinSessionCvPercent !== undefined &&
    quality.withinSessionCvPercent > oscillometryQualityThresholds.maxWithinSessionCvPercent
  ) {
    warnings.push('Interpret with caution: within-session CV yüksek görünüyor.');
  }

  return warnings;
}
