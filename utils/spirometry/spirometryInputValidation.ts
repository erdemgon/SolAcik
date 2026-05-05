export type SpirometryInputValidation = {
  blocking: string[];
  amber: string[];
};

export function parseSpirometryNumber(value: string) {
  if (!value.trim()) return null;
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
}

export function normalizeFev1FvcRatioInput(value: string) {
  const parsed = parseSpirometryNumber(value);
  if (parsed === null) return null;
  return parsed > 1.5 ? parsed / 100 : parsed;
}

export function validateSpirometryInputs(
  ageMonths: number | null,
  heightCm: number | null,
): SpirometryInputValidation {
  const blocking: string[] = [];
  const amber: string[] = [];

  if (ageMonths === null) blocking.push('Yaş ay olarak girilmelidir.');
  else if (ageMonths < 36) {
    blocking.push(
      'GLI spirometri referansları 3 yaş altı için kullanılmamalıdır. Bu yaş grubunda rutin spirometri referansı yerine yaşa uygun alternatif testler ve uzman yorumu gerekir.',
    );
  } else if (ageMonths > 1140) {
    blocking.push('GLI-2012 spirometri aralığı 3–95 yaş içindir. Yaş aralığı dışında hesaplama yapma.');
  }

  if (heightCm === null) blocking.push('GLI hesaplaması için boy gereklidir.');
  else if (heightCm < 40 || heightCm > 230) {
    blocking.push('Boy 40–230 cm dışında. Veri girişini kontrol edin; hesaplama yapılmaz.');
  } else if (ageMonths !== null) {
    const ageYears = ageMonths / 12;
    if ((ageYears < 6 && heightCm > 135) || (ageYears > 12 && heightCm < 115)) {
      amber.push('Boy değeri yaşa göre olağandışı görünüyor; veri girişini kontrol edin.');
    }
  }

  return { blocking, amber };
}
