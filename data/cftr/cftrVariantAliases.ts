export type CftrVariant = {
  canonicalName: string;
  aliases: string[];
  proteinProductionClass?: 'protein-producing' | 'non-protein-producing' | 'unknown';
  cftrClass?: 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'unknown';
  notes?: string;
};

export const cftrVariantAliases: CftrVariant[] = [
  {
    canonicalName: 'F508del',
    aliases: ['F508DEL', 'Phe508del', 'p.Phe508del', 'c.1521_1523delCTT', 'ΔF508', 'delF508'],
    proteinProductionClass: 'protein-producing',
    cftrClass: 'II',
    notes: 'En sık CFTR varyantı; modülatör uygunluğu bölge/etikete göre doğrulanmalıdır.',
  },
  {
    canonicalName: 'G551D',
    aliases: ['G551D', 'p.Gly551Asp'],
    proteinProductionClass: 'protein-producing',
    cftrClass: 'III',
  },
  {
    canonicalName: 'N1303K',
    aliases: ['N1303K', 'p.Asn1303Lys'],
    proteinProductionClass: 'protein-producing',
    cftrClass: 'II',
    notes: 'Yerel sınıflandırma ve ürün etiketi ile doğrulanmalıdır.',
  },
  {
    canonicalName: '3849+10kbC>T',
    aliases: ['3849+10kbC>T', '3849+10kbC->T', '3849+10kbC→T', 'c.3718-2477C>T'],
    proteinProductionClass: 'protein-producing',
    cftrClass: 'V',
  },
  {
    canonicalName: 'G542X',
    aliases: ['G542X', 'p.Gly542Ter'],
    proteinProductionClass: 'non-protein-producing',
    cftrClass: 'I',
    notes: 'Class I/nonsense varyant; non-Class I kuralları için uygun kabul edilmez.',
  },
  {
    canonicalName: 'W1282X',
    aliases: ['W1282X', 'p.Trp1282Ter'],
    proteinProductionClass: 'non-protein-producing',
    cftrClass: 'I',
  },
];
