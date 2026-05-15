export const oscillometryQualityThresholds = {
  minTrials: 3,
  minAcquisitionDurationSeconds: 16,
  maxWithinSessionCvPercent: 15,
  minCoherence5Hz: null as number | null,
  minCoherence20Hz: null as number | null,
  sourceNote:
    'Eşikler kurum protokolüne ve cihaz yazılımına göre düzenlenmelidir; kesin klinik standart olarak kullanılmaz.',
};
