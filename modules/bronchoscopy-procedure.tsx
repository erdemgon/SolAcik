import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import {
  CLINICAL_NOTE_SAFETY_SENTENCE,
  CopyClinicalNoteButton,
} from '../components/common/CopyClinicalNoteButton';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  anesthesiaChecklist,
  balOrderSets,
  balPatternCards,
  balTechniqueChecklist,
  bronchoscopyIndications,
  bronchoscopyRiskSignals,
  bronchoscopySource,
  classifyBronchoscopyRisk,
  postProcedureChecklist,
  preProcedureChecklist,
  type BalPatternKey,
  type BronchoscopyRiskKey,
} from '../data/bronchoscopy/bronchoscopyGuide';
import {
  balDifferentialRows,
  balLymphocyteSubsetRows,
  balReferenceSource,
} from '../data/bronchoscopy/balReferenceValues';

type TabKey = 'prep' | 'anesthesia' | 'report' | 'bal' | 'normal' | 'patterns' | 'post' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'prep', label: 'Hazırlık' },
  { key: 'anesthesia', label: 'Anestezi' },
  { key: 'report', label: 'Rapor Taslağı' },
  { key: 'bal', label: 'BAL' },
  { key: 'normal', label: 'BAL Normal' },
  { key: 'patterns', label: 'Patern' },
  { key: 'post', label: 'İşlem Sonrası' },
  { key: 'source', label: 'Kaynak' },
];

const indicationOptions = [
  'Kronik ıslak öksürük / bronşektazi',
  'Tekrarlayan lokalize pnömoni',
  'Atelektazi',
  'Yabancı cisim şüphesi',
  'Stridor / havayolu anomalisi',
  'Trakeostomi değerlendirmesi',
  'İmmün baskıda örnekleme',
  'Hemoptizi',
];

const routeOptions = ['Nazal', 'Oral', 'LMA üzerinden', 'ETT üzerinden', 'Trakeostomi kanülü üzerinden'];
const anesthesiaOptions = ['Genel anestezi', 'Derin sedasyon', 'Sedasyon + topikal anestezi', 'Yoğun bakım koşullarında'];
const findingOptions = ['Normal', 'Sekresyon', 'Ödem/eritem', 'Malazi', 'Darlık/stenoz', 'Dış bası', 'Granülasyon', 'Kanama', 'Mukus tıkacı', 'Yabancı cisim'];
const balAppearanceOptions = ['Yapılmadı', 'Berrak', 'Mukoid', 'Bulanık', 'Pürülan', 'Hemorajik'];
const impressionOptions = [
  'Normal bronkoskopik görünüm',
  'Trakeo/bronkomalazi lehine bulgular',
  'Endobronşiyal inflamasyon',
  'Mukus tıkacı / sekresyon yükü',
  'Anatomik darlık veya dış bası',
  'Trakeostomi ilişkili granülasyon',
  'Aspirasyon/enfeksiyon açısından değerlendirme gerekir',
];

const airwayRegions = [
  'Nazofarenks / üst havayolu',
  'Larenks',
  'Subglottik alan',
  'Trakea',
  'Karina',
  'Sağ ana bronş ve lob bronşları',
  'Sol ana bronş ve lob bronşları',
];

export function BronchoscopyProcedureScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('prep');
  const [riskSignals, setRiskSignals] = useState<BronchoscopyRiskKey[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<BalPatternKey>('neutrophilic');
  const [reportIndication, setReportIndication] = useState(indicationOptions[0]);
  const [reportRoute, setReportRoute] = useState(routeOptions[0]);
  const [reportAnesthesia, setReportAnesthesia] = useState(anesthesiaOptions[0]);
  const [regionFindings, setRegionFindings] = useState<Record<string, string>>(() =>
    Object.fromEntries(airwayRegions.map((region) => [region, 'Normal'])),
  );
  const [balSite, setBalSite] = useState('Sağ orta lob / lingula veya klinik hedef segment');
  const [balVolume, setBalVolume] = useState('');
  const [balReturned, setBalReturned] = useState('');
  const [balAppearance, setBalAppearance] = useState(balAppearanceOptions[0]);
  const [reportImpression, setReportImpression] = useState(impressionOptions[0]);
  const [freeNote, setFreeNote] = useState('');

  const risk = useMemo(() => classifyBronchoscopyRisk(riskSignals), [riskSignals]);
  const pattern =
    balPatternCards.find((item) => item.key === selectedPattern) ?? balPatternCards[0];
  const clinicalNote = buildBronchoscopyClinicalNote({
    pattern,
    risk,
    riskSignals,
  });
  const reportText = buildBronchoscopyReportText({
    anesthesia: reportAnesthesia,
    balAppearance,
    balReturned,
    balSite,
    balVolume,
    freeNote,
    impression: reportImpression,
    indication: reportIndication,
    regionFindings,
    route: reportRoute,
  });

  function toggleRisk(key: BronchoscopyRiskKey) {
    setRiskSignals((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  function updateRegionFinding(region: string, finding: string) {
    setRegionFindings((current) => ({ ...current, [region]: finding }));
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Girişimsel İşlemler</Text>
        <Text style={styles.title}>Bronkoskopi ve BAL Modülü</Text>
        <Text style={styles.description}>
          Pediatrik bronkoskopi hazırlığı, anestezi güvenliği, BAL örnekleme,
          laboratuvar istemleri, normal hücre değerleri ve patern yorumları.
        </Text>
      </View>

      <SourceVersionBadge text={bronchoscopySource.badge} />
      <CopyClinicalNoteButton note={clinicalNote} />

      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <Chip
            key={tab.key}
            label={tab.label}
            selected={activeTab === tab.key}
            onPress={() => setActiveTab(tab.key)}
          />
        ))}
      </View>

      {activeTab === 'prep' ? (
        <>
          <View style={[styles.resultCard, styles[`${risk.tone}Result`]]}>
            <Text style={styles.resultKicker}>İşlem riski</Text>
            <Text style={styles.resultTitle}>{risk.title}</Text>
            <Text style={styles.resultText}>{risk.action}</Text>
          </View>
          <ChecklistCard title="Endikasyon örnekleri" items={bronchoscopyIndications} />
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Risk uyarıları</Text>
            {bronchoscopyRiskSignals.map((signal) => (
              <Toggle
                key={signal.key}
                label={signal.label}
                note={signal.note}
                selected={riskSignals.includes(signal.key)}
                onPress={() => toggleRisk(signal.key)}
              />
            ))}
          </View>
          <ChecklistCard title="İşlem öncesi hazırlık" items={preProcedureChecklist} />
        </>
      ) : null}

      {activeTab === 'anesthesia' ? (
        <>
          <ChecklistCard title="Anestezi / sedasyon checklist’i" items={anesthesiaChecklist} />
          <WarningBox
            title="Havayolu planı"
            text="Bronkoskop çapı, ETT/LMA iç çapı ve ventilasyon gereksinimi işlem öncesi netleşmelidir. Bronkoskop–ETT–LMA uyumluluk modülü bu plan için ayrıca kullanılabilir."
          />
        </>
      ) : null}

      {activeTab === 'report' ? (
        <BronchoscopyReportBuilder
          anesthesia={reportAnesthesia}
          balAppearance={balAppearance}
          balReturned={balReturned}
          balSite={balSite}
          balVolume={balVolume}
          freeNote={freeNote}
          impression={reportImpression}
          indication={reportIndication}
          regionFindings={regionFindings}
          reportText={reportText}
          route={reportRoute}
          onAnesthesia={setReportAnesthesia}
          onBalAppearance={setBalAppearance}
          onBalReturned={setBalReturned}
          onBalSite={setBalSite}
          onBalVolume={setBalVolume}
          onFreeNote={setFreeNote}
          onImpression={setReportImpression}
          onIndication={setReportIndication}
          onRegionFinding={updateRegionFinding}
          onRoute={setReportRoute}
        />
      ) : null}

      {activeTab === 'bal' ? (
        <>
          <ChecklistCard title="BAL teknik checklist’i" items={balTechniqueChecklist} />
          {balOrderSets.map((set) => (
            <ChecklistCard key={set.title} title={set.title} items={set.items} />
          ))}
        </>
      ) : null}

      {activeTab === 'normal' ? (
        <>
          <WarningBox tone="amber" title="Normal değer uyarısı" text={balReferenceSource.warning} />
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>BAL diferansiyel hücre değerleri</Text>
            {balDifferentialRows.map((row) => (
              <View key={row.study} style={styles.valueCard}>
                <Text style={styles.valueTitle}>{row.study}</Text>
                <Text style={styles.valueText}>n: {row.n}; yaş: {row.ageRange}; sedasyon: {row.sedation}</Text>
                <Text style={styles.valueText}>Makrofaj: {row.macrophagePercent}</Text>
                <Text style={styles.valueText}>Lenfosit: {row.lymphocytePercent}</Text>
                <Text style={styles.valueText}>Nötrofil: {row.neutrophilPercent}</Text>
                <Text style={styles.valueText}>Eozinofil: {row.eosinophilPercent}</Text>
                {row.totalCells10e4PerMl ? (
                  <Text style={styles.valueText}>Total hücre x10^4/mL: {row.totalCells10e4PerMl}</Text>
                ) : null}
              </View>
            ))}
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>BAL lenfosit alt popülasyonları</Text>
            {balLymphocyteSubsetRows.map((row) => (
              <View key={row.study} style={styles.valueCard}>
                <Text style={styles.valueTitle}>{row.study}</Text>
                <Text style={styles.valueText}>n: {row.n}; yaş: {row.ageRange}</Text>
                <Text style={styles.valueText}>CD3: {row.cd3}</Text>
                <Text style={styles.valueText}>CD4: {row.cd4}</Text>
                <Text style={styles.valueText}>CD8: {row.cd8}</Text>
                <Text style={styles.valueText}>CD4/CD8: {row.cd4Cd8}</Text>
                <Text style={styles.valueText}>CD19: {row.cd19}</Text>
                <Text style={styles.valueText}>CD25: {row.cd25}</Text>
                <Text style={styles.valueText}>CD3/HLA-DR: {row.cd3HlaDr}</Text>
                <Text style={styles.valueText}>CD56: {row.cd56}</Text>
              </View>
            ))}
          </View>
        </>
      ) : null}

      {activeTab === 'patterns' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>BAL patern seç</Text>
            <View style={styles.chipWrap}>
              {balPatternCards.map((item) => (
                <Chip
                  key={item.key}
                  label={item.title}
                  selected={selectedPattern === item.key}
                  onPress={() => setSelectedPattern(item.key)}
                />
              ))}
            </View>
          </View>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>{pattern.title}</Text>
            <Text style={styles.cardLabel}>Düşündürebilir</Text>
            <BulletList items={pattern.clues} />
            <WarningBox tone="amber" title="Yorum sınırı" text={pattern.caution} />
          </View>
        </>
      ) : null}

      {activeTab === 'post' ? (
        <ChecklistCard title="İşlem sonrası izlem" items={postProcedureChecklist} />
      ) : null}

      {activeTab === 'source' ? (
        <>
          <WarningBox title="Klinik sınır" text={bronchoscopySource.warning} />
          <ChecklistCard
            title="Kaynak notu"
            items={[
              balReferenceSource.source,
              'BAL hücre değerleri sağlıklı çocuk çalışmalarından alınmış özet referanslardır; laboratuvar ve teknik değişkenlik büyüktür.',
              'BAL sonucu tek başına tanı koydurmaz; klinik, HRCT, mikrobiyoloji ve patoloji ile birlikte yorumlanır.',
              'Bu modül işlem talimatı veya anestezi emri üretmez; kurum protokolü önceliklidir.',
            ]}
          />
        </>
      ) : null}

      <Text style={styles.footer}>
        Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
      </Text>
    </ScrollView>
  );
}

function ChecklistCard({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      <BulletList items={items} />
    </View>
  );
}

function BronchoscopyReportBuilder({
  anesthesia,
  balAppearance,
  balReturned,
  balSite,
  balVolume,
  freeNote,
  impression,
  indication,
  regionFindings,
  reportText,
  route,
  onAnesthesia,
  onBalAppearance,
  onBalReturned,
  onBalSite,
  onBalVolume,
  onFreeNote,
  onImpression,
  onIndication,
  onRegionFinding,
  onRoute,
}: {
  anesthesia: string;
  balAppearance: string;
  balReturned: string;
  balSite: string;
  balVolume: string;
  freeNote: string;
  impression: string;
  indication: string;
  regionFindings: Record<string, string>;
  reportText: string;
  route: string;
  onAnesthesia: (value: string) => void;
  onBalAppearance: (value: string) => void;
  onBalReturned: (value: string) => void;
  onBalSite: (value: string) => void;
  onBalVolume: (value: string) => void;
  onFreeNote: (value: string) => void;
  onImpression: (value: string) => void;
  onIndication: (value: string) => void;
  onRegionFinding: (region: string, finding: string) => void;
  onRoute: (value: string) => void;
}) {
  return (
    <>
      <WarningBox
        tone="amber"
        title="Rapor taslağı"
        text="Bu ekran resmi işlem raporunu otomatik tamamlamaz; işlemci hekim bronkoskopi bulgularını, görselleri ve kurum rapor formatını kontrol ederek düzenlemelidir. Hasta kimliği girilmemelidir."
      />

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>İşlem bilgisi</Text>
        <OptionGroup title="Endikasyon" options={indicationOptions} selected={indication} onSelect={onIndication} />
        <OptionGroup title="Giriş yolu" options={routeOptions} selected={route} onSelect={onRoute} />
        <OptionGroup title="Anestezi/sedasyon" options={anesthesiaOptions} selected={anesthesia} onSelect={onAnesthesia} />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Anatomik bulgular</Text>
        {airwayRegions.map((region) => (
          <View key={region} style={styles.regionBlock}>
            <Text style={styles.cardLabel}>{region}</Text>
            <View style={styles.chipWrap}>
              {findingOptions.map((finding) => (
                <Chip
                  key={`${region}-${finding}`}
                  label={finding}
                  selected={regionFindings[region] === finding}
                  onPress={() => onRegionFinding(region, finding)}
                />
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>BAL / örnekleme</Text>
        <Text style={styles.inputLabel}>BAL lokalizasyonu</Text>
        <TextInput style={styles.input} value={balSite} onChangeText={onBalSite} />
        <View style={styles.inputRow}>
          <View style={styles.inputHalf}>
            <Text style={styles.inputLabel}>Verilen hacim</Text>
            <TextInput
              keyboardType="decimal-pad"
              placeholder="örn. 20 mL"
              placeholderTextColor="#8a8a8a"
              style={styles.input}
              value={balVolume}
              onChangeText={onBalVolume}
            />
          </View>
          <View style={styles.inputHalf}>
            <Text style={styles.inputLabel}>Geri alınan hacim</Text>
            <TextInput
              keyboardType="decimal-pad"
              placeholder="örn. 8 mL"
              placeholderTextColor="#8a8a8a"
              style={styles.input}
              value={balReturned}
              onChangeText={onBalReturned}
            />
          </View>
        </View>
        <OptionGroup title="BAL görünümü" options={balAppearanceOptions} selected={balAppearance} onSelect={onBalAppearance} />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>İzlenim ve serbest not</Text>
        <OptionGroup title="Ön izlenim" options={impressionOptions} selected={impression} onSelect={onImpression} />
        <Text style={styles.inputLabel}>Ek not, kimlik bilgisi yazma</Text>
        <TextInput
          multiline
          numberOfLines={4}
          style={[styles.input, styles.multilineInput]}
          value={freeNote}
          onChangeText={onFreeNote}
        />
      </View>

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Oluşturulan rapor metni</Text>
        <Text style={styles.reportPreview}>{reportText}</Text>
        <CopyClinicalNoteButton label="Rapor taslağını kopyala" note={reportText} />
      </View>
    </>
  );
}

function OptionGroup({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <View style={styles.optionGroup}>
      <Text style={styles.cardLabel}>{title}</Text>
      <View style={styles.chipWrap}>
        {options.map((option) => (
          <Chip key={option} label={option} selected={selected === option} onPress={() => onSelect(option)} />
        ))}
      </View>
    </View>
  );
}

function Toggle({
  label,
  note,
  selected,
  onPress,
}: {
  label: string;
  note: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[styles.toggle, selected && styles.toggleSelected]}
    >
      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected ? <Text style={styles.checkmark}>✓</Text> : null}
      </View>
      <View style={styles.toggleTextWrap}>
        <Text style={styles.toggleLabel}>{label}</Text>
        <Text style={styles.toggleNote}>{note}</Text>
      </View>
    </Pressable>
  );
}

function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}
    >
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
    </Pressable>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View style={styles.bulletList}>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function buildBronchoscopyClinicalNote({
  pattern,
  risk,
  riskSignals,
}: {
  pattern: (typeof balPatternCards)[number];
  risk: ReturnType<typeof classifyBronchoscopyRisk>;
  riskSignals: BronchoscopyRiskKey[];
}) {
  const selectedSignals = bronchoscopyRiskSignals
    .filter((signal) => riskSignals.includes(signal.key))
    .map((signal) => signal.label);

  return [
    'Bronkoskopi/BAL klinik notu:',
    `İşlem riski: ${risk.title}; önerilen aksiyon: ${risk.action}.`,
    selectedSignals.length
      ? `İşaretli risk uyarıları: ${selectedSignals.join(', ')}.`
      : 'İşaretli risk uyarısı yok.',
    `Seçili BAL patern kartı: ${pattern.title}.`,
    `Patern notu: ${pattern.caution}`,
    CLINICAL_NOTE_SAFETY_SENTENCE,
  ].join(' ');
}

function buildBronchoscopyReportText({
  anesthesia,
  balAppearance,
  balReturned,
  balSite,
  balVolume,
  freeNote,
  impression,
  indication,
  regionFindings,
  route,
}: {
  anesthesia: string;
  balAppearance: string;
  balReturned: string;
  balSite: string;
  balVolume: string;
  freeNote: string;
  impression: string;
  indication: string;
  regionFindings: Record<string, string>;
  route: string;
}) {
  const findings = airwayRegions
    .map((region) => `${region}: ${regionFindings[region] ?? 'değerlendirildi'}`)
    .join('; ');
  const balText =
    balAppearance === 'Yapılmadı'
      ? 'BAL yapılmadı.'
      : `BAL ${balSite} lokalizasyonundan yapıldı. Verilen hacim: ${balVolume || 'belirtilmedi'}; geri alınan hacim: ${balReturned || 'belirtilmedi'}; görünüm: ${balAppearance}. Örnekler kurum protokolüne göre mikrobiyoloji, hücre sayımı/diferansiyel ve gerekli ek testlere gönderilmek üzere ayrıldı.`;
  const extra = freeNote.trim() ? ` Ek not: ${freeNote.trim()}.` : '';

  return [
    'Pediatrik fleksibl bronkoskopi rapor taslağı.',
    `Endikasyon: ${indication}.`,
    `Teknik: İşlem ${anesthesia} altında, ${route} yapıldı.`,
    `Bronkoskopik bulgular: ${findings}.`,
    balText,
    `Ön izlenim: ${impression}.`,
    extra,
    'Bu metin eğitim/checklist amaçlı rapor taslağıdır; işlemci hekim tarafından bronkoskopi görüntüleri, kurum rapor formatı ve klinik bağlamla doğrulanmadan resmi rapor olarak kullanılmamalıdır.',
  ].join(' ');
}

const styles = StyleSheet.create({
  scrollContent: { gap: 14, paddingBottom: 32 },
  intro: { gap: 8 },
  kicker: { color: '#8f1d2c', fontSize: 13, fontWeight: '900', letterSpacing: 0, textTransform: 'uppercase' },
  title: { color: '#211f1f', fontSize: 25, fontWeight: '900', lineHeight: 31 },
  description: { color: '#686868', fontSize: 15, lineHeight: 22 },
  tabs: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chipWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { backgroundColor: '#f5f5f6', borderColor: '#e1e1e4', borderRadius: 999, borderWidth: 1, paddingHorizontal: 12, paddingVertical: 9 },
  chipSelected: { backgroundColor: '#8f1d2c', borderColor: '#8f1d2c' },
  chipText: { color: '#211f1f', fontSize: 14, fontWeight: '800' },
  chipTextSelected: { color: '#ffffff' },
  panel: { backgroundColor: '#f5f5f6', borderColor: '#e8e8eb', borderRadius: 8, borderWidth: 1, gap: 12, padding: 14 },
  panelTitle: { color: '#211f1f', fontSize: 18, fontWeight: '900', lineHeight: 23 },
  resultCard: { borderRadius: 8, borderWidth: 1, gap: 6, padding: 14 },
  redResult: { backgroundColor: '#f9e9ec', borderColor: '#efcbd2' },
  amberResult: { backgroundColor: '#fff7e6', borderColor: '#f0c36a' },
  grayResult: { backgroundColor: '#f5f5f6', borderColor: '#e1e1e4' },
  resultKicker: { color: '#8f1d2c', fontSize: 12, fontWeight: '900', textTransform: 'uppercase' },
  resultTitle: { color: '#211f1f', fontSize: 19, fontWeight: '900' },
  resultText: { color: '#343131', fontSize: 15, lineHeight: 22 },
  toggle: { alignItems: 'flex-start', backgroundColor: '#ffffff', borderColor: '#e1e1e4', borderRadius: 8, borderWidth: 1, flexDirection: 'row', gap: 10, padding: 12 },
  toggleSelected: { backgroundColor: '#fff8f9', borderColor: '#8f1d2c' },
  checkbox: { alignItems: 'center', borderColor: '#c8c8ce', borderRadius: 6, borderWidth: 1, height: 22, justifyContent: 'center', marginTop: 1, width: 22 },
  checkboxSelected: { backgroundColor: '#8f1d2c', borderColor: '#8f1d2c' },
  checkmark: { color: '#ffffff', fontSize: 14, fontWeight: '900' },
  toggleTextWrap: { flex: 1, gap: 4 },
  toggleLabel: { color: '#211f1f', fontSize: 15, fontWeight: '900', lineHeight: 20 },
  toggleNote: { color: '#686868', fontSize: 13, lineHeight: 18 },
  cardLabel: { color: '#8f1d2c', fontSize: 12, fontWeight: '900', textTransform: 'uppercase' },
  optionGroup: { gap: 8 },
  regionBlock: { backgroundColor: '#ffffff', borderColor: '#e1e1e4', borderRadius: 8, borderWidth: 1, gap: 9, padding: 11 },
  inputLabel: { color: '#686868', fontSize: 12, fontWeight: '900', textTransform: 'uppercase' },
  input: { backgroundColor: '#ffffff', borderColor: '#d9d9dd', borderRadius: 8, borderWidth: 1, color: '#211f1f', fontSize: 15, minHeight: 44, paddingHorizontal: 11, paddingVertical: 9 },
  inputRow: { flexDirection: 'row', gap: 10 },
  inputHalf: { flex: 1, gap: 6 },
  multilineInput: { minHeight: 86, textAlignVertical: 'top' },
  reportPreview: { backgroundColor: '#ffffff', borderColor: '#e1e1e4', borderRadius: 8, borderWidth: 1, color: '#343131', fontSize: 14, lineHeight: 21, padding: 12 },
  bulletList: { gap: 8 },
  bulletRow: { flexDirection: 'row', gap: 8 },
  bullet: { color: '#8f1d2c', fontSize: 16, fontWeight: '900', width: 12 },
  bulletText: { color: '#343131', flex: 1, fontSize: 14, lineHeight: 20 },
  valueCard: { backgroundColor: '#ffffff', borderColor: '#e1e1e4', borderRadius: 8, borderWidth: 1, gap: 5, padding: 12 },
  valueTitle: { color: '#8f1d2c', fontSize: 15, fontWeight: '900' },
  valueText: { color: '#343131', fontSize: 13, lineHeight: 18 },
  footer: { color: '#8a8a8a', fontSize: 12, fontWeight: '700', lineHeight: 18, textAlign: 'center' },
});
