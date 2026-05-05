import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  getTracheostomyTubeSuggestion,
  tracheostomyCareNotes,
  tracheostomyEmergencySteps,
  tracheostomySource,
} from '../data/technology/tracheostomyGuide';

type TabKey = 'emergency' | 'tube' | 'care' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'emergency', label: 'Acil' },
  { key: 'tube', label: 'Kanül Boyutu' },
  { key: 'care', label: 'Bakım / Set' },
  { key: 'source', label: 'Kaynak' },
];

export function TracheostomyScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('emergency');
  const [ageMonthsText, setAgeMonthsText] = useState('');
  const [weightKgText, setWeightKgText] = useState('');

  const ageMonths = parseNumber(ageMonthsText);
  const weightKg = parseNumber(weightKgText);
  const suggestion = useMemo(
    () => getTracheostomyTubeSuggestion(ageMonths, weightKg),
    [ageMonths, weightKg],
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Solunum teknolojileri</Text>
        <Text style={styles.title}>Trakeostomi: Acil Algoritma ve Kanül Boyutu Hatırlatıcı</Text>
        <Text style={styles.description}>
          Acil trakeostomi kontrol sırası, yedek kanül hazırlığı ve yaşa göre yaklaşık
          pediatrik kanül iç çapı aralığını gösterir.
        </Text>
      </View>

      <SourceVersionBadge text={tracheostomySource.badge} />
      <WarningBox title="Klinik sınır" text={tracheostomySource.warning} />

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

      {activeTab === 'emergency' ? (
        <>
          <View style={styles.alertCard}>
            <Text style={styles.alertTitle}>Trakeostomi acil kutusu</Text>
            <Text style={styles.alertText}>
              Aynı boy kanül ve bir küçük boy kanül her zaman hastanın yanında olmalıdır.
            </Text>
          </View>
          <ChecklistCard title="Acil kontrol sırası" items={tracheostomyEmergencySteps} />
        </>
      ) : null}

      {activeTab === 'tube' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Yaş ve kilo ile yaklaşık boyut</Text>
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={setAgeMonthsText}
              placeholder="Yaş, ay olarak"
              placeholderTextColor="#8a8a8a"
              style={styles.input}
              value={ageMonthsText}
            />
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={setWeightKgText}
              placeholder="Kilo, kg (özellikle yenidoğan için opsiyonel)"
              placeholderTextColor="#8a8a8a"
              style={styles.input}
              value={weightKgText}
            />
            <Text style={styles.helperText}>
              Örnek: 18 ay için 18; 6 yaş için 72 girin. Bu ekran reçete/ürün seçimi yapmaz.
            </Text>
          </View>

          {suggestion ? (
            <View style={styles.resultCard}>
              <Text style={styles.resultKicker}>{suggestion.ageLabel}</Text>
              <Text style={styles.resultTitle}>{suggestion.suggestedId}</Text>
              <View style={styles.metricBox}>
                <Text style={styles.metricLabel}>Acil yedek bir küçük boy</Text>
                <Text style={styles.metricValue}>{suggestion.backupSmaller}</Text>
              </View>
              <Text style={styles.resultText}>{suggestion.note}</Text>
            </View>
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Yaş girildiğinde sonuç burada gösterilir.</Text>
              <Text style={styles.emptyText}>
                Kanül ID aralığı eğitim amaçlıdır; üretici dış çapı ve uzunluğu ayrıca
                kontrol edilmelidir.
              </Text>
            </View>
          )}

          <WarningBox
            tone="amber"
            title="Boyut seçimi notu"
            text="Çocuğun mevcut kanülü, ventilasyon ihtiyacı, cuff gereksinimi, bronkoskopi bulgusu ve KBB/yoğun bakım önerisi her zaman yaş formülünden önceliklidir."
          />
        </>
      ) : null}

      {activeTab === 'care' ? (
        <>
          <ChecklistCard title="İzlemde kanül uygunluğu" items={tracheostomyCareNotes} />
          <ChecklistCard
            title="Ev/servis acil seti"
            items={[
              'Aynı boy yedek kanül',
              'Bir küçük boy yedek kanül',
              'Her iki kanül için obturator',
              'Aspirasyon cihazı ve uygun kateter',
              'Ambu, oksijen bağlantısı ve maske',
              'Su bazlı kayganlaştırıcı, bağ ve makas',
              'Kurumun trakeostomi acil algoritması',
            ]}
          />
        </>
      ) : null}

      {activeTab === 'source' ? (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Kaynak ve doğrulama</Text>
          {tracheostomySource.sources.map((source) => (
            <View key={source.url} style={styles.sourceBox}>
              <Text style={styles.sourceTitle}>{source.title}</Text>
              <Text style={styles.sourceUrl}>{source.url}</Text>
            </View>
          ))}
        </View>
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
    <Pressable onPress={onPress} style={[styles.chip, selected ? styles.chipSelected : undefined]}>
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

function parseNumber(value: string) {
  if (!value.trim()) return null;
  const parsed = Number(value.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : null;
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
  chip: {
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 42,
    paddingHorizontal: 12,
    paddingVertical: 10,
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
  input: {
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    color: '#211f1f',
    fontSize: 16,
    minHeight: 46,
    paddingHorizontal: 12,
  },
  helperText: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 19,
  },
  alertCard: {
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    padding: 15,
  },
  alertTitle: {
    color: '#8f1d2c',
    fontSize: 17,
    fontWeight: '900',
  },
  alertText: {
    color: '#211f1f',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 22,
    marginTop: 6,
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
    fontSize: 25,
    fontWeight: '900',
    lineHeight: 30,
  },
  resultText: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  metricBox: {
    backgroundColor: '#fff',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
  },
  metricLabel: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
  },
  metricValue: {
    color: '#211f1f',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 21,
    marginTop: 3,
  },
  emptyCard: {
    backgroundColor: '#fff',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    padding: 14,
  },
  emptyTitle: {
    color: '#211f1f',
    fontSize: 16,
    fontWeight: '900',
  },
  emptyText: {
    color: '#686868',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
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
