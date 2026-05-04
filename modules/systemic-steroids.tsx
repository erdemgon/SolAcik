import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  calculateSteroidEquivalentDose,
  calculateWeightBasedSteroidDose,
  respiratorySteroidDoseCards,
  systemicSteroidSafetyNotes,
  systemicSteroidSource,
  systemicSteroids,
  type RespiratorySteroidDoseCard,
  type SystemicSteroidKey,
} from '../data/drugs/systemicSteroids';

type TabKey = 'equivalent' | 'doses' | 'table' | 'warnings';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'equivalent', label: 'Eşdeğer' },
  { key: 'doses', label: 'Kg Doz' },
  { key: 'table', label: 'Tablo' },
  { key: 'warnings', label: 'Uyarı' },
];

export function SystemicSteroidsScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('equivalent');
  const [sourceKey, setSourceKey] = useState<SystemicSteroidKey>('prednisolone');
  const [targetKey, setTargetKey] = useState<SystemicSteroidKey>('methylprednisolone');
  const [sourceDose, setSourceDose] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [selectedDoseCardId, setSelectedDoseCardId] = useState(respiratorySteroidDoseCards[0].id);

  const parsedSourceDose = parseNumber(sourceDose);
  const parsedWeight = parseNumber(weightKg);
  const equivalent = useMemo(
    () =>
      parsedSourceDose === null
        ? null
        : calculateSteroidEquivalentDose({
            sourceDoseMg: parsedSourceDose,
            sourceKey,
            targetKey,
          }),
    [parsedSourceDose, sourceKey, targetKey],
  );
  const selectedDoseCard =
    respiratorySteroidDoseCards.find((card) => card.id === selectedDoseCardId) ??
    respiratorySteroidDoseCards[0];
  const doseResult = useMemo(
    () =>
      parsedWeight === null
        ? null
        : calculateWeightBasedSteroidDose({
            card: selectedDoseCard,
            weightKg: parsedWeight,
          }),
    [parsedWeight, selectedDoseCard],
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>İlaç dozları</Text>
        <Text style={styles.title}>Sistemik Steroidler: Eşdeğer ve Kısa Kür Doz Hatırlatıcı</Text>
        <Text style={styles.description}>
          Glukokortikoid eşdeğerlerini ve sık pediatrik solunum kısa kür dozlarını
          yapılandırılmış gösterir. Hasta kimliği toplanmaz; kilo geçici hesap içindir.
        </Text>
      </View>

      <SourceVersionBadge text={systemicSteroidSource.badge} />
      <WarningBox title="Klinik sınır" text={systemicSteroidSource.warning} />

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

      {activeTab === 'equivalent' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Steroid eşdeğer hesapla</Text>
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={setSourceDose}
              placeholder="Kaynak doz, mg"
              placeholderTextColor="#8a8a8a"
              style={styles.input}
              value={sourceDose}
            />
            <Text style={styles.label}>Kaynak steroid</Text>
            <SteroidChips selected={sourceKey} onSelect={setSourceKey} />
            <Text style={styles.label}>Hedef steroid</Text>
            <SteroidChips selected={targetKey} onSelect={setTargetKey} />
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultKicker}>Sonuç</Text>
            {equivalent ? (
              <>
                <Text style={styles.resultTitle}>
                  {parsedSourceDose?.toFixed(1)} mg {equivalent.source.turkishName} ≈{' '}
                  {formatDose(equivalent.targetDoseMg)} mg {equivalent.target.turkishName}
                </Text>
                <Text style={styles.resultText}>
                  Bu karşılaştırma antiinflamatuvar glukokortikoid eşdeğeridir;
                  etki süresi ve mineralokortikoid etkiler aynı değildir.
                </Text>
              </>
            ) : (
              <Text style={styles.resultText}>
                Kaynak dozu girince hedef steroid eşdeğeri burada gösterilir.
              </Text>
            )}
          </View>
        </>
      ) : null}

      {activeTab === 'doses' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Kg’ye göre kısa kür dozu</Text>
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={setWeightKg}
              placeholder="Kilo, kg"
              placeholderTextColor="#8a8a8a"
              style={styles.input}
              value={weightKg}
            />
            <View style={styles.chipWrap}>
              {respiratorySteroidDoseCards.map((card) => (
                <Chip
                  key={card.id}
                  label={card.title}
                  selected={selectedDoseCardId === card.id}
                  onPress={() => setSelectedDoseCardId(card.id)}
                />
              ))}
            </View>
          </View>

          <DoseCard card={selectedDoseCard} result={doseResult} />
        </>
      ) : null}

      {activeTab === 'table' ? (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Eşdeğer tablo</Text>
          {systemicSteroids.map((steroid) => (
            <SteroidRow key={steroid.key} steroid={steroid} />
          ))}
        </View>
      ) : null}

      {activeTab === 'warnings' ? (
        <>
          <ChecklistCard title="Güvenlik notları" items={systemicSteroidSafetyNotes} />
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Kaynaklar</Text>
            {systemicSteroidSource.sourceLinks.map((source) => (
              <View key={source.url} style={styles.sourceBox}>
                <Text style={styles.sourceTitle}>{source.title}</Text>
                <Text style={styles.sourceUrl}>{source.url}</Text>
              </View>
            ))}
          </View>
        </>
      ) : null}

      <Text style={styles.footer}>
        Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
      </Text>
    </ScrollView>
  );
}

function DoseCard({
  card,
  result,
}: {
  card: RespiratorySteroidDoseCard;
  result: ReturnType<typeof calculateWeightBasedSteroidDose>;
}) {
  const drugNames = card.drugKeys
    .map((key) => systemicSteroids.find((steroid) => steroid.key === key)?.turkishName)
    .filter(Boolean)
    .join(' / ');

  return (
    <View style={styles.resultCard}>
      <Text style={styles.resultKicker}>{drugNames}</Text>
      <Text style={styles.resultTitle}>{card.title}</Text>
      <Text style={styles.resultText}>{card.doseText}</Text>
      <Text style={styles.compactLine}>Üst sınır: {card.maxText}</Text>
      <Text style={styles.compactLine}>Süre: {card.durationText}</Text>
      {result ? (
        <View style={styles.doseBox}>
          <Text style={styles.doseBoxLabel}>Hesaplanan aralık</Text>
          <Text style={styles.doseBoxValue}>
            {result.minMg}–{result.maxMg} {result.unit}
          </Text>
          <Text style={styles.doseBoxText}>
            Maksimum sınır {result.maxDailyMg} mg; pratik yuvarlama ürün formuna göre yapılır.
            {result.isCapped ? ' Üst değer maksimum dozla sınırlandı.' : ''}
          </Text>
        </View>
      ) : (
        <Text style={styles.compactLine}>Kilo girildiğinde hesaplanan aralık gösterilir.</Text>
      )}
      <BulletList items={card.notes} />
    </View>
  );
}

function SteroidRow({ steroid }: { steroid: (typeof systemicSteroids)[number] }) {
  return (
    <View style={styles.steroidRow}>
      <Text style={styles.steroidName}>
        {steroid.turkishName} <Text style={styles.latinName}>({steroid.name})</Text>
      </Text>
      <Text style={styles.steroidMeta}>
        Eşdeğer: {steroid.equivalentDoseMg} mg • {steroid.duration} etkili •{' '}
        {steroid.biologicHalfLife}
      </Text>
      <Text style={styles.productLabel}>Türkiye müstahzar / form örnekleri</Text>
      <View style={styles.productList}>
        {steroid.turkeyProducts.map((product) => (
          <Text key={product} style={styles.productText}>
            • {product}
          </Text>
        ))}
      </View>
      <Text style={styles.steroidNote}>
        Mineralokortikoid: {steroid.mineralocorticoid}. {steroid.note}
      </Text>
    </View>
  );
}

function SteroidChips({
  selected,
  onSelect,
}: {
  selected: SystemicSteroidKey;
  onSelect: (value: SystemicSteroidKey) => void;
}) {
  return (
    <View style={styles.chipWrap}>
      {systemicSteroids.map((steroid) => (
        <Chip
          key={steroid.key}
          label={steroid.turkishName}
          selected={selected === steroid.key}
          onPress={() => onSelect(steroid.key)}
        />
      ))}
    </View>
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

function BulletList({ items }: { items: string[] }) {
  return (
    <View style={styles.bulletList}>
      {items.map((item) => (
        <View key={item} style={styles.bulletRow}>
          <View style={styles.bulletDot} />
          <Text style={styles.bulletText}>{item}</Text>
        </View>
      ))}
    </View>
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
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip, selected ? styles.chipSelected : undefined]}
    >
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

function parseNumber(value: string) {
  if (!value.trim()) return null;
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

function formatDose(value: number) {
  if (value >= 10) return Math.round(value).toString();
  return value.toFixed(2).replace(/0$/, '').replace(/\.0$/, '');
}

const styles = StyleSheet.create({
  scrollContent: {
    backgroundColor: '#fff',
    gap: 14,
    padding: 18,
    paddingBottom: 34,
  },
  intro: {
    gap: 7,
  },
  kicker: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '900',
  },
  title: {
    color: '#211f1f',
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 31,
  },
  description: {
    color: '#686868',
    fontSize: 15,
    lineHeight: 22,
  },
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  panel: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  panelTitle: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  label: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '900',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    color: '#211f1f',
    fontSize: 16,
    minHeight: 46,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 40,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  chipSelected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  chipText: {
    color: '#211f1f',
    fontSize: 13,
    fontWeight: '900',
  },
  chipTextSelected: {
    color: '#fff',
  },
  resultCard: {
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 15,
  },
  resultKicker: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  resultTitle: {
    color: '#211f1f',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 25,
  },
  resultText: {
    color: '#211f1f',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 22,
  },
  compactLine: {
    color: '#3f3f46',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
  },
  doseBox: {
    backgroundColor: '#fff',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    gap: 4,
    padding: 12,
  },
  doseBoxLabel: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
  },
  doseBoxValue: {
    color: '#211f1f',
    fontSize: 22,
    fontWeight: '900',
  },
  doseBoxText: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },
  bulletList: {
    gap: 8,
  },
  bulletRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 9,
  },
  bulletDot: {
    backgroundColor: '#8f1d2c',
    borderRadius: 4,
    height: 8,
    marginTop: 7,
    width: 8,
  },
  bulletText: {
    color: '#211f1f',
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  steroidRow: {
    backgroundColor: '#fff',
    borderColor: '#e1e1e4',
    borderRadius: 8,
    borderWidth: 1,
    gap: 5,
    padding: 11,
  },
  steroidName: {
    color: '#211f1f',
    fontSize: 16,
    fontWeight: '900',
  },
  latinName: {
    color: '#5f6f4f',
    fontSize: 13,
    fontWeight: '800',
  },
  steroidMeta: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '900',
    lineHeight: 18,
  },
  productLabel: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 2,
  },
  productList: {
    gap: 3,
  },
  productText: {
    color: '#211f1f',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 18,
  },
  steroidNote: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  sourceBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    gap: 4,
    padding: 10,
  },
  sourceTitle: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 19,
  },
  sourceUrl: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },
  footer: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '700',
    paddingTop: 2,
    textAlign: 'center',
  },
});
