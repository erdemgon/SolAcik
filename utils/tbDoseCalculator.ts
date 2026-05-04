export function calculateDoseMg(weightKg: number, mgPerKg: number, maxMg: number) {
  const calculated = weightKg * mgPerKg;
  const capped = Math.min(calculated, maxMg);

  return {
    calculatedMg: Math.round(calculated),
    cappedMg: Math.round(capped),
    isCapped: calculated > maxMg,
  };
}

export function calculateDoseRangeMg(
  weightKg: number,
  minMgPerKg: number,
  targetMgPerKg: number,
  maxMgPerKg: number,
  maxDailyMg: number,
) {
  const min = weightKg * minMgPerKg;
  const target = weightKg * targetMgPerKg;
  const high = weightKg * maxMgPerKg;

  return {
    minMg: Math.round(Math.min(min, maxDailyMg)),
    targetMg: Math.round(Math.min(target, maxDailyMg)),
    highMg: Math.round(Math.min(high, maxDailyMg)),
    maxDailyMg,
    isCapped: target > maxDailyMg || high > maxDailyMg,
  };
}

export function calculateWeeklyRifapentine(weightKg: number) {
  if (weightKg < 10) {
    return {
      doseMg: null,
      note: '10 kg altı için otomatik doz gösterme; rehber/uzman kontrolü gerekli.',
    };
  }
  if (weightKg <= 14.0) return { doseMg: 300, note: '10–14.0 kg' };
  if (weightKg <= 25.0) return { doseMg: 450, note: '14.1–25.0 kg' };
  if (weightKg <= 32.0) return { doseMg: 600, note: '25.1–32.0 kg' };
  if (weightKg <= 50.0) return { doseMg: 750, note: '32.1–50.0 kg' };
  return { doseMg: 900, note: '>50 kg' };
}

export function parsePositiveNumber(value: string) {
  const normalized = value.replace(',', '.').trim();
  if (!normalized) return null;

  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}
