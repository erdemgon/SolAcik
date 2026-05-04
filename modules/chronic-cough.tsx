import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { WarningBox } from '../components/common/WarningBox';
import {
  chronicCoughSource,
  chronicCoughTree,
  specificCoughPointers,
} from '../data/cough/chronicCoughDecisionTree';

type TabKey = 'tree' | 'wet' | 'dry' | 'pointers' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'tree', label: 'Karar Ağacı' },
  { key: 'wet', label: 'Islak Öksürük' },
  { key: 'dry', label: 'Kuru Öksürük' },
  { key: 'pointers', label: 'Spesifik İpuçları' },
  { key: 'source', label: 'Kaynak' },
];

export function ChronicCoughScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('tree');
  const [nodeId, setNodeId] = useState('start');
  const node = useMemo(
    () => chronicCoughTree.find((item) => item.id === nodeId) ?? chronicCoughTree[0],
    [nodeId],
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Öksürük</Text>
        <Text style={styles.title}>Çocukta Kronik Öksürüğe Yaklaşım</Text>
        <Text style={styles.description}>
          Hocanın kronik öksürük sunumundan eğitim amaçlı karar ağacı. Hasta
          verisi kaydetmez; seçimler yalnızca ekranda geçici tutulur.
        </Text>
      </View>

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

      {activeTab === 'tree' ? (
        <>
          <View style={styles.pathCard}>
            <Text style={styles.pathLabel}>Aktif basamak</Text>
            <Text style={styles.nodeTitle}>{node.title}</Text>
            {node.body.map((item) => (
              <Text key={item} style={styles.paragraph}>• {item}</Text>
            ))}
            {node.warning ? (
              <WarningBox title="Dikkat" text={node.warning} />
            ) : null}
          </View>

          <View style={styles.optionList}>
            {node.options.map((option) => (
              <Pressable
                accessibilityRole="button"
                key={option.label}
                onPress={() => option.nextId && setNodeId(option.nextId)}
                style={({ pressed }) => [
                  styles.optionButton,
                  option.result ? styles.resultOption : undefined,
                  pressed ? styles.pressed : undefined,
                ]}
              >
                <Text style={styles.optionText}>{option.label}</Text>
                {option.result ? <Text style={styles.resultText}>{option.result}</Text> : null}
              </Pressable>
            ))}
          </View>

          {nodeId !== 'start' ? (
            <Pressable
              accessibilityRole="button"
              onPress={() => setNodeId('start')}
              style={styles.resetButton}
            >
              <Text style={styles.resetText}>Başa dön</Text>
            </Pressable>
          ) : null}
        </>
      ) : null}

      {activeTab === 'wet' ? (
        <InfoBlock
          title="Islak / produktif öksürük kolu"
          items={[
            '4 haftadan uzun ıslak öksürük PBB için tipik bir giriş noktasıdır.',
            'Balgam kültürü alınabiliyorsa alınır; uygun antibiyotik tedavisi ve 2–4 hafta kontrol planlanır.',
            'Düzelme varsa muhtemel PBB olarak izlenir; 3–4 ay içinde tekrar açısından değerlendirilir.',
            'Persistans veya tekrar varsa bronşektazi, TB, KF, PCD, immün yetmezlik, aspirasyon ve havayolu anomalileri araştırılır.',
          ]}
        />
      ) : null}

      {activeTab === 'dry' ? (
        <InfoBlock
          title="Kuru nonspesifik öksürük kolu"
          items={[
            'Kuru öksürük ve spesifik bulgu yoksa 2–4 hafta izlem ve yeniden değerlendirme yapılabilir.',
            'İrritanlar, alerji ve eşlik eden enfeksiyonlar kontrol edilir.',
            'Persistan kuru öksürükte seçilmiş olguda 4–8 haftalık İKS denemesi düşünülebilir.',
            'Islak öksürüğe dönüş, yeni spesifik bulgu veya tedaviye yanıtsızlık varsa algoritmada yeniden değerlendirme/uzman yönlendirmesi gerekir.',
          ]}
        />
      ) : null}

      {activeTab === 'pointers' ? (
        <InfoBlock title="Spesifik öksürük ipuçları" items={specificCoughPointers} />
      ) : null}

      {activeTab === 'source' ? (
        <>
          <InfoBlock
            title={chronicCoughSource.title}
            items={[chronicCoughSource.basis, chronicCoughSource.note]}
          />
          <WarningBox
            tone="amber"
            title="Kullanım sınırı"
            text="Bu ekran karar ağacı ve eğitim amaçlıdır. Klinik karar; öykü, fizik muayene, test kalitesi, yerel protokol, güncel kılavuzlar ve uzman değerlendirmesi ile verilmelidir."
          />
        </>
      ) : null}

      <Text style={styles.footer}>
        Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
      </Text>
    </ScrollView>
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
      style={[styles.chip, selected ? styles.chipSelected : undefined]}
    >
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

function InfoBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.pathCard}>
      <Text style={styles.nodeTitle}>{title}</Text>
      {items.map((item) => (
        <Text key={item} style={styles.paragraph}>• {item}</Text>
      ))}
    </View>
  );
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
  pathCard: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 15,
  },
  pathLabel: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
  },
  nodeTitle: {
    color: '#211f1f',
    fontSize: 19,
    fontWeight: '900',
    lineHeight: 24,
  },
  paragraph: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  optionList: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderColor: '#e1e1e4',
    borderRadius: 8,
    borderWidth: 1,
    gap: 7,
    padding: 14,
  },
  resultOption: {
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
  },
  optionText: {
    color: '#8f1d2c',
    fontSize: 15,
    fontWeight: '900',
  },
  resultText: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  pressed: {
    opacity: 0.72,
  },
  resetButton: {
    alignItems: 'center',
    backgroundColor: '#8f1d2c',
    borderRadius: 8,
    minHeight: 44,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  resetText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
  },
  footer: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
});
