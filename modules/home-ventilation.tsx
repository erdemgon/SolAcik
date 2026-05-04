import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  homeVentEquipmentChecklist,
  homeVentAgeParameterRanges,
  homeVentBloodGasAdjustmentCards,
  homeVentDailyCareChecklist,
  homeVentFollowUpChecklist,
  homeVentParameterPrinciples,
  homeVentProblems,
  homeVentReadinessSections,
  homeVentRedFlags,
  homeVentilationSource,
  homeVentSourceNotes,
  supportTypeCards,
  type HomeVentAgeBandKey,
  type HomeVentProblemKey,
  type HomeVentSupportType,
} from '../data/technology/homeVentilationGuide';

type TabKey = 'overview' | 'settings' | 'readiness' | 'followup' | 'alarms' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'overview', label: 'Başlangıç' },
  { key: 'settings', label: 'Ayar / Gaz' },
  { key: 'readiness', label: 'Taburculuk' },
  { key: 'followup', label: 'İzlem' },
  { key: 'alarms', label: 'Alarm' },
  { key: 'source', label: 'Kaynak' },
];

export function HomeVentilationScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('overview');
  const [supportType, setSupportType] = useState<HomeVentSupportType>('niv');
  const [ageBand, setAgeBand] = useState<HomeVentAgeBandKey>('school');
  const [selectedProblems, setSelectedProblems] = useState<HomeVentProblemKey[]>([]);

  const selectedSupport =
    supportTypeCards.find((item) => item.key === supportType) ?? supportTypeCards[1];
  const activeProblems = useMemo(
    () => homeVentProblems.filter((problem) => selectedProblems.includes(problem.key)),
    [selectedProblems],
  );
  const selectedAgeBand =
    homeVentAgeParameterRanges.find((item) => item.key === ageBand) ??
    homeVentAgeParameterRanges[2];
  const hasUrgentProblem = activeProblems.some((problem) => problem.urgent);

  function toggleProblem(key: HomeVentProblemKey) {
    setSelectedProblems((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Solunum teknolojileri</Text>
        <Text style={styles.title}>Ev Ventilatörü İzlem ve Güvenlik Rehberi</Text>
        <Text style={styles.description}>
          CPAP, NIV ve trakeostomiyle invaziv ev ventilasyonu için taburculuk
          hazırlığı, ekipman, izlem ve alarm sorun giderme checklist’i.
        </Text>
      </View>

      <SourceVersionBadge text={homeVentilationSource.badge} />
      <WarningBox title="Klinik sınır" text={homeVentilationSource.warning} />

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

      {activeTab === 'overview' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Destek tipini seç</Text>
            <View style={styles.chipWrap}>
              {supportTypeCards.map((item) => (
                <Chip
                  key={item.key}
                  label={item.title}
                  selected={supportType === item.key}
                  onPress={() => setSupportType(item.key)}
                />
              ))}
            </View>
          </View>

          <View style={styles.resultCard}>
            <Text style={styles.resultKicker}>Seçili destek</Text>
            <Text style={styles.resultTitle}>{selectedSupport.title}</Text>
            <Text style={styles.resultText}>{selectedSupport.shortUse}</Text>
            <BulletList items={selectedSupport.whatToCheck} />
          </View>

          <DecisionFlow
            title="Bu modülde ne kadar bilgi alalım?"
            items={[
              'Endikasyonu ve cihaz ayarını reçeteleme ekranı yapmayalım.',
              'Evde güvenli bakım için taburculuk, ekipman, eğitim ve acil planı öne çıkaralım.',
              'İzlemde semptom, cihaz verisi, kaçak, CO2/SpO2 ve bakım yükünü yapılandırılmış soralım.',
              'Alarm ekranı aile eğitimi ve klinisyen triage için olsun; acil durumda kurum protokolüne yönlendirsin.',
            ]}
          />
        </>
      ) : null}

      {activeTab === 'settings' ? (
        <>
          <WarningBox
            tone="amber"
            title="Ayar notu"
            text="Bu bölüm yaşa göre pratik başlangıç/izlem aralıklarını gösterir; ventilatör reçetesi veya otomatik ayar önerisi değildir. Değişiklikler kan gazı, gece CO2/SpO2, klinik durum ve uzman ekip kararı ile yapılmalıdır."
          />

          <ChecklistCard title="Ayar prensipleri" items={homeVentParameterPrinciples} />

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Yaş bandı</Text>
            <View style={styles.chipWrap}>
              {homeVentAgeParameterRanges.map((item) => (
                <Chip
                  key={item.key}
                  label={item.label}
                  selected={ageBand === item.key}
                  onPress={() => setAgeBand(item.key)}
                />
              ))}
            </View>
          </View>

          <ParameterRangeCard range={selectedAgeBand} />
          <ChecklistCard title="Günlük ev bakım kontrolü" items={homeVentDailyCareChecklist} />

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Kan gazına göre düşünme</Text>
            {homeVentBloodGasAdjustmentCards.map((card) => (
              <BloodGasCard key={card.title} card={card} />
            ))}
          </View>
        </>
      ) : null}

      {activeTab === 'readiness' ? (
        <>
          {homeVentReadinessSections.map((section) => (
            <ChecklistCard key={section.title} title={section.title} items={section.items} />
          ))}
          <ChecklistCard title="Ev ekipman listesi" items={homeVentEquipmentChecklist} />
        </>
      ) : null}

      {activeTab === 'followup' ? (
        <>
          <ChecklistCard title="Kontrolde sorulacaklar" items={homeVentFollowUpChecklist} />
          <WarningBox
            tone="amber"
            title="İzlem ilkesi"
            text="Cihaz kullanım raporu tek başına yeterli değildir; semptomlar, gece oksijenasyon/ventilasyon, büyüme, sekresyon, maske/kanül komplikasyonları ve aile bakım yükü birlikte değerlendirilmelidir."
          />
        </>
      ) : null}

      {activeTab === 'alarms' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Sorun / alarm seç</Text>
            <Text style={styles.panelHint}>
              Birden fazla sorun seçilebilir. Seçim hasta verisi olarak saklanmaz.
            </Text>
            {homeVentProblems.map((problem) => (
              <Toggle
                key={problem.key}
                label={problem.label}
                selected={selectedProblems.includes(problem.key)}
                onPress={() => toggleProblem(problem.key)}
              />
            ))}
          </View>

          {hasUrgentProblem ? (
            <WarningBox
              title="Acil değerlendirme eşiği"
              text="Seçilen bulgulardan biri ciddi olabilir. Çocuk kötü görünüyorsa, ventilasyon sürdürülemiyorsa, SpO2 düzelmiyorsa veya trakeostomi/cihaz güvenliği sağlanamıyorsa acil yardım ve kurum protokolü gerekir."
            />
          ) : null}

          {activeProblems.length > 0 ? (
            activeProblems.map((problem) => (
              <ProblemCard key={problem.key} problem={problem} />
            ))
          ) : (
            <WarningBox
              tone="amber"
              title="Seçim bekleniyor"
              text="Bir alarm veya klinik sorun seçildiğinde aynı ekranda kontrol adımları görüntülenir."
            />
          )}

          <ChecklistCard title="Kırmızı bayraklar" items={homeVentRedFlags} />
        </>
      ) : null}

      {activeTab === 'source' ? (
        <>
          <ChecklistCard title="Kaynak notları" items={homeVentSourceNotes} />
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Kaynaklar</Text>
            {homeVentilationSource.sources.map((source) => (
              <View key={source.url} style={styles.sourceRow}>
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

function ChecklistCard({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      <BulletList items={items} />
    </View>
  );
}

function ProblemCard({ problem }: { problem: (typeof homeVentProblems)[number] }) {
  return (
    <View style={[styles.problemCard, problem.urgent ? styles.problemUrgent : undefined]}>
      <Text style={styles.problemLabel}>{problem.urgent ? 'Acil olabilir' : 'Kontrol et'}</Text>
      <Text style={styles.problemTitle}>{problem.label}</Text>
      <Text style={styles.problemText}>{problem.immediateAction}</Text>
      <BulletList items={problem.checkSteps} />
    </View>
  );
}

function ParameterRangeCard({
  range,
}: {
  range: (typeof homeVentAgeParameterRanges)[number];
}) {
  return (
    <View style={styles.resultCard}>
      <Text style={styles.resultKicker}>Yaşa göre pratik aralık</Text>
      <Text style={styles.resultTitle}>{range.label}</Text>
      <View style={styles.parameterGrid}>
        <ParameterMetric label="Rate" value={range.rate} />
        <ParameterMetric label="Ti" value={range.ti} />
        <ParameterMetric label="I:E" value={range.ie} />
        <ParameterMetric label="PEEP" value={range.peep} />
      </View>
      <Text style={styles.resultText}>{range.pressureNote}</Text>
      <Text style={styles.compactNote}>{range.targetNote}</Text>
    </View>
  );
}

function ParameterMetric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.parameterMetric}>
      <Text style={styles.parameterLabel}>{label}</Text>
      <Text style={styles.parameterValue}>{value}</Text>
    </View>
  );
}

function BloodGasCard({
  card,
}: {
  card: (typeof homeVentBloodGasAdjustmentCards)[number];
}) {
  return (
    <View style={styles.bloodGasCard}>
      <Text style={styles.bloodGasTitle}>{card.title}</Text>
      <Text style={styles.bloodGasText}>{card.interpretation}</Text>
      <BulletList items={card.checks} />
    </View>
  );
}

function DecisionFlow({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      {items.map((item, index) => (
        <View key={item} style={styles.flowRow}>
          <View style={styles.flowNumber}>
            <Text style={styles.flowNumberText}>{index + 1}</Text>
          </View>
          <Text style={styles.flowText}>{item}</Text>
        </View>
      ))}
    </View>
  );
}

function Toggle({
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
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      onPress={onPress}
      style={[styles.toggle, selected ? styles.toggleSelected : undefined]}
    >
      <View style={[styles.box, selected ? styles.boxSelected : undefined]}>
        {selected ? <Text style={styles.check}>✓</Text> : null}
      </View>
      <Text style={[styles.toggleText, selected ? styles.toggleTextSelected : undefined]}>
        {label}
      </Text>
    </Pressable>
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
  panelHint: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
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
  bulletList: {
    gap: 9,
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
  flowRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
  },
  flowNumber: {
    alignItems: 'center',
    backgroundColor: '#8f1d2c',
    borderRadius: 8,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  flowNumberText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
  },
  flowText: {
    color: '#211f1f',
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  toggle: {
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderColor: '#e1e1e4',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    padding: 11,
  },
  toggleSelected: {
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
  },
  box: {
    alignItems: 'center',
    borderColor: '#8f1d2c',
    borderRadius: 5,
    borderWidth: 2,
    height: 22,
    justifyContent: 'center',
    marginTop: 1,
    width: 22,
  },
  boxSelected: {
    backgroundColor: '#8f1d2c',
  },
  check: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 17,
  },
  toggleText: {
    color: '#211f1f',
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  toggleTextSelected: {
    color: '#8f1d2c',
  },
  problemCard: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 14,
  },
  problemUrgent: {
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
  },
  problemLabel: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 999,
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  problemTitle: {
    color: '#211f1f',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
  },
  problemText: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  parameterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  parameterMetric: {
    backgroundColor: '#fff',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    flexGrow: 1,
    minWidth: 118,
    padding: 10,
  },
  parameterLabel: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
  },
  parameterValue: {
    color: '#211f1f',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 21,
    marginTop: 3,
  },
  compactNote: {
    color: '#3f3f46',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
  },
  bloodGasCard: {
    backgroundColor: '#fff',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 9,
    padding: 12,
  },
  bloodGasTitle: {
    color: '#211f1f',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 21,
  },
  bloodGasText: {
    color: '#3f3f46',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
  },
  sourceRow: {
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
