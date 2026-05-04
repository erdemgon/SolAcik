import type { InhaledMedication } from '../data/inhaledMedications';

export function isMedicationSuitableForAge(
  med: InhaledMedication,
  ageMonths: number,
) {
  const aboveMin = ageMonths >= med.ageMinMonths;
  const belowMax = med.ageMaxMonths === null || ageMonths <= med.ageMaxMonths;
  return aboveMin && belowMax;
}

export function filterMedications({
  meds,
  ageMonths,
  deviceFilter,
  categoryFilter,
  martOnly,
}: {
  meds: InhaledMedication[];
  ageMonths: number | null;
  deviceFilter: string;
  categoryFilter: string;
  martOnly: boolean;
}) {
  return meds.filter((med) => {
    const ageOk = ageMonths === null || isMedicationSuitableForAge(med, ageMonths);
    const deviceOk =
      deviceFilter === 'Tümü' ||
      med.deviceTypes.includes(deviceFilter) ||
      med.clinicalRole === deviceFilter;
    const categoryOk = categoryFilter === 'Tümü' || med.category === categoryFilter;
    const martOk =
      !martOnly ||
      med.martStatus === 'MART uygun' ||
      med.martStatus === 'MART potansiyeli var / doğrula';

    return ageOk && deviceOk && categoryOk && martOk;
  });
}
