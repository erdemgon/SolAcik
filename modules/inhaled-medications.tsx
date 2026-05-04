import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { WarningBox } from '../components/common/WarningBox';
import { AgeOption, AgeSelector } from '../components/inhaled/AgeSelector';
import { DeviceFilterChips } from '../components/inhaled/DeviceFilterChips';
import { DeviceSelectionGuide } from '../components/inhaled/DeviceSelectionGuide';
import { FullMedicationTable } from '../components/inhaled/FullMedicationTable';
import { IcsDoseCategoryCard } from '../components/inhaled/IcsDoseCategoryCard';
import { MartQuickNote } from '../components/inhaled/MartQuickNote';
import { MedicationCard } from '../components/inhaled/MedicationCard';
import { ginaAsthmaVersion } from '../data/guidelines/ginaAsthmaVersion';
import { icsDoseCategories, IcsDoseAgeGroup } from '../data/icsDoseCategories';
import { inhaledMedications } from '../data/inhaledMedications';
import { filterMedications } from '../utils/inhaledMedicationFilters';

const ACCENT = '#8f1d2c';
const TEXT = '#211f1f';
const MUTED = '#686868';
const CARD = '#f5f5f6';
const BORDER = '#e7e7e9';

const ageOptions: AgeOption[] = [
  { label: '0–5 ay', ageMonths: 3 },
  { label: '6–11 ay', ageMonths: 8 },
  { label: '1–3 yaş', ageMonths: 24 },
  { label: '4–5 yaş', ageMonths: 54 },
  { label: '6–11 yaş', ageMonths: 96 },
  { label: '12 yaş ve üzeri', ageMonths: 144 },
  { label: 'Tümü', ageMonths: null },
];

const deviceFilters = [
  'Tümü',
  'ÖDİ / aerosol',
  'Spacer + maske',
  'Spacer + ağızlık',
  'Nebül',
  'Turbuhaler',
  'Diskus',
  'Kapsül inhaler',
  'Ellipta / DPI',
  'MART uygun',
  'Kontrol edici',
  'Rahatlatıcı',
  'Atak / akut',
];

const categoryFilters = [
  'Tümü',
  'İKS',
  'İKS/LABA',
  'Nebül bronkodilatör',
  'Nebül İKS',
  'SABA',
  'SAMA',
  'Diğer',
];

const bottomWarnings = [
  'Bu modül reçete yazmaz; eğitim, hızlı hatırlatma ve ilaç seçeneklerini yapılandırılmış gösterme amacı taşır.',
  'İnhale ilaç seçimi; tanı doğruluğu, astım kontrol düzeyi, alevlenme riski, yaş, inhaler tekniği, cihaz erişimi, yan etki riski, eşlik eden hastalıklar ve güncel KÜB/KT ile birlikte değerlendirilmelidir.',
  'Sık SABA kullanımı veya rahatlatıcı ihtiyacında artış astım kontrol bozukluğu ve alevlenme riski göstergesidir.',
  'İKS içeren pMDI formlarında spacer kullanımı ve ağız çalkalama/yüz yıkama hatırlatılmalıdır.',
  'Yüksek doz İKS uzun süre kullanılıyorsa büyüme, adrenal baskılanma, oral kandidiyazis, ses kısıklığı ve sistemik yan etkiler açısından izlem gerekir.',
  'DPI/Turbuhaler/Diskus cihazları yeterli inspiratuvar akım ve doğru teknik gerektirir.',
  'Türkiye piyasasındaki ürün adları, eşdeğerler, ruhsat yaşları ve geri ödeme koşulları değişebilir. Veri dosyası düzenli güncellenmelidir.',
];

export function InhaledMedicationsScreen() {
  const [selectedAge, setSelectedAge] = useState(ageOptions[0]);
  const [deviceFilter, setDeviceFilter] = useState('Tümü');
  const [categoryFilter, setCategoryFilter] = useState('Tümü');
  const [showTable, setShowTable] = useState(false);
  const [showMart, setShowMart] = useState(false);
  const [showIcs, setShowIcs] = useState(false);
  const [showDeviceGuide, setShowDeviceGuide] = useState(false);
  const [icsAgeGroup, setIcsAgeGroup] = useState<IcsDoseAgeGroup>('6–11 yaş');
  const [icsMolecule, setIcsMolecule] = useState('Tümü');

  const martOnly = deviceFilter === 'MART uygun';
  const filteredMeds = useMemo(() => {
    const normalizedCategory =
      categoryFilter === 'Nebül bronkodilatör' ? 'Tümü' : categoryFilter;
    const meds =
      categoryFilter === 'Nebül bronkodilatör'
        ? inhaledMedications.filter((med) =>
            ['SABA', 'SAMA', 'SABA/SAMA'].includes(med.category),
          )
        : inhaledMedications;

    return filterMedications({
      meds,
      ageMonths: selectedAge.ageMonths,
      deviceFilter,
      categoryFilter: normalizedCategory,
      martOnly,
    });
  }, [categoryFilter, deviceFilter, martOnly, selectedAge.ageMonths]);

  const icsMolecules = useMemo(() => {
    const rows = icsDoseCategories.filter((row) => row.ageGroup === icsAgeGroup);
    return ['Tümü', ...rows.map((row) => row.molecule)];
  }, [icsAgeGroup]);

  const visibleIcsRows = useMemo(() => {
    return icsDoseCategories.filter((row) => {
      const ageOk = row.ageGroup === icsAgeGroup;
      const moleculeOk = icsMolecule === 'Tümü' || row.molecule === icsMolecule;
      return ageOk && moleculeOk;
    });
  }, [icsAgeGroup, icsMolecule]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>İnhale tedavi</Text>
        <Text style={styles.title}>
          İnhale İlaçlar: Yaşa Göre İnhaler, Nebül ve Kuru Toz Seçici
        </Text>
        <Text style={styles.description}>
          Türkiye’de kullanılan inhale astım/hava yolu ilaçlarını yaş, cihaz ve
          klinik role göre yapılandırılmış biçimde gösterir. Hasta kimliği toplanmaz.
        </Text>
      </View>

      <View style={styles.versionBadge}>
        <Text style={styles.versionText}>{ginaAsthmaVersion.sourceBadge}</Text>
      </View>

      <WarningBox
        tone="amber"
        title="GINA güncelleme uyarısı"
        text={ginaAsthmaVersion.pendingUpdateWarning}
      />

      <AgeSelector
        options={ageOptions}
        selectedLabel={selectedAge.label}
        onSelect={setSelectedAge}
      />

      <AgeWarning selectedAgeLabel={selectedAge.label} />

      <DeviceFilterChips
        title="Cihaz / form / rol filtresi"
        options={deviceFilters}
        selected={deviceFilter}
        onSelect={setDeviceFilter}
      />

      <DeviceFilterChips
        title="İlaç kategorisi"
        options={categoryFilters}
        selected={categoryFilter}
        onSelect={setCategoryFilter}
      />

      <View style={styles.actionRow}>
        <ActionButton
          label={showTable ? 'Tam tabloyu gizle' : 'Tam tablo'}
          onPress={() => setShowTable((value) => !value)}
        />
        <ActionButton
          label={showMart ? 'MART notunu gizle' : 'MART hızlı notu'}
          onPress={() => setShowMart((value) => !value)}
        />
        <ActionButton
          label={showIcs ? 'İKS dozunu gizle' : 'İKS doz kategorisi'}
          onPress={() => setShowIcs((value) => !value)}
        />
        <ActionButton
          label={showDeviceGuide ? 'Cihaz rehberini gizle' : 'Cihaz seçimi'}
          onPress={() => setShowDeviceGuide((value) => !value)}
        />
      </View>

      {showMart ? <MartQuickNote /> : null}
      {showDeviceGuide ? <DeviceSelectionGuide /> : null}
      {showIcs ? (
        <IcsDoseTool
          ageGroup={icsAgeGroup}
          molecule={icsMolecule}
          molecules={icsMolecules}
          rows={visibleIcsRows}
          onAgeGroup={setIcsAgeGroup}
          onMolecule={setIcsMolecule}
        />
      ) : null}
      {showTable ? <FullMedicationTable meds={inhaledMedications} /> : null}

      <View style={styles.resultHeader}>
        <Text style={styles.resultTitle}>Kısa ilaç listesi</Text>
        <Text style={styles.resultCount}>{filteredMeds.length} kayıt</Text>
      </View>

      {martOnly && selectedAge.ageMonths !== null && selectedAge.ageMonths < 72 ? (
        <WarningBox
          title="MART yaş uyarısı"
          text="MART bu yaş grubunda rutin öneri değildir; uzman değerlendirmesi gerekir."
        />
      ) : null}

      {filteredMeds.length > 0 ? (
        <View style={styles.cardList}>
          {filteredMeds.map((med) => (
            <MedicationCard
              key={med.id}
              med={med}
              selectedAgeLabel={selectedAge.label}
            />
          ))}
        </View>
      ) : (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            Bu yaş ve cihaz filtresine uygun kayıt bulunamadı. Yaş aralığını veya
            cihaz filtresini genişletin; klinik kullanım için güncel KÜB/KT kontrol
            edin.
          </Text>
        </View>
      )}

      <View style={styles.warningList}>
        {bottomWarnings.map((warning) => (
          <WarningBox key={warning} tone="amber" title="Güvenlik notu" text={warning} />
        ))}
      </View>

      <Text style={styles.footer}>
        Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
      </Text>
    </ScrollView>
  );
}

function AgeWarning({ selectedAgeLabel }: { selectedAgeLabel: string }) {
  if (selectedAgeLabel === '0–5 ay') {
    return (
      <WarningBox
        title="0–5 ay uyarısı"
        text="Bu yaş grubunda astım tanısı, bronkodilatör/İKS kullanımı ve atak yönetimi mutlaka uzman değerlendirmesi gerektirir. Standart otomatik doz önerisi verme."
      />
    );
  }

  if (selectedAgeLabel === '6–11 ay') {
    return (
      <WarningBox
        tone="amber"
        title="6–11 ay uyarısı"
        text="Bu yaş grubunda nebulize seçenekler ve bronkodilatör kullanımı klinik bağlam, KÜB/KT ve uzman değerlendirmesiyle doğrulanmalıdır."
      />
    );
  }

  if (selectedAgeLabel === '1–3 yaş') {
    return (
      <WarningBox
        tone="amber"
        title="Cihaz notu"
        text="Bu yaşta pMDI + spacer + maske ve uygun nebül seçenekleri öne çıkar; Diskus/Turbuhaler genellikle teknik beceri nedeniyle rutin gösterilmez."
      />
    );
  }

  return null;
}

function IcsDoseTool({
  ageGroup,
  molecule,
  molecules,
  rows,
  onAgeGroup,
  onMolecule,
}: {
  ageGroup: IcsDoseAgeGroup;
  molecule: string;
  molecules: string[];
  rows: typeof icsDoseCategories;
  onAgeGroup: (value: IcsDoseAgeGroup) => void;
  onMolecule: (value: string) => void;
}) {
  return (
    <View style={styles.toolCard}>
      <Text style={styles.toolTitle}>İKS doz kategorisi</Text>
      <Text style={styles.toolText}>
        GINA 2025 temelli — 2026 güncellemesi bekleniyor. Bu kartlar reçete talimatı
        değildir.
      </Text>
      <View style={styles.chipRow}>
        {(['6–11 yaş', '≥12 yaş'] as IcsDoseAgeGroup[]).map((option) => (
          <SmallChip
            key={option}
            label={option}
            selected={ageGroup === option}
            onPress={() => {
              onAgeGroup(option);
              onMolecule('Tümü');
            }}
          />
        ))}
      </View>
      <View style={styles.chipRow}>
        {molecules.map((option) => (
          <SmallChip
            key={option}
            label={option}
            selected={molecule === option}
            onPress={() => onMolecule(option)}
          />
        ))}
      </View>
      <View style={styles.cardList}>
        {rows.map((row) => (
          <IcsDoseCategoryCard key={row.id} row={row} />
        ))}
      </View>
    </View>
  );
}

function ActionButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.actionButton, pressed ? styles.pressed : undefined]}
    >
      <Text style={styles.actionText}>{label}</Text>
    </Pressable>
  );
}

function SmallChip({
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
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.smallChip,
        selected ? styles.smallChipSelected : undefined,
        pressed ? styles.pressed : undefined,
      ]}
    >
      <Text style={[styles.smallChipText, selected ? styles.smallChipTextSelected : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    gap: 14,
    padding: 18,
    paddingBottom: 34,
  },
  intro: {
    gap: 7,
  },
  kicker: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: '900',
  },
  title: {
    color: TEXT,
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 31,
  },
  description: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 22,
  },
  versionBadge: {
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  versionText: {
    color: ACCENT,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actionButton: {
    backgroundColor: ACCENT,
    borderRadius: 8,
    minHeight: 42,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  actionText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.72,
  },
  resultHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resultTitle: {
    color: TEXT,
    fontSize: 18,
    fontWeight: '900',
  },
  resultCount: {
    color: MUTED,
    fontSize: 13,
    fontWeight: '800',
  },
  cardList: {
    gap: 12,
  },
  empty: {
    backgroundColor: CARD,
    borderColor: BORDER,
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  emptyText: {
    color: MUTED,
    fontSize: 15,
    lineHeight: 22,
  },
  warningList: {
    gap: 10,
  },
  footer: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
  toolCard: {
    backgroundColor: CARD,
    borderColor: BORDER,
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  toolTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: '900',
  },
  toolText: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  smallChip: {
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 40,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  smallChipSelected: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },
  smallChipText: {
    color: TEXT,
    fontSize: 13,
    fontWeight: '800',
  },
  smallChipTextSelected: {
    color: '#fff',
  },
});
