import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  antibioticScenarios,
  capSupportiveCare,
  classifyPneumoniaSeverity,
  diagnosticChecklist,
  followUpItems,
  getTrackWarning,
  immunosuppressionSignals,
  pneumoniaSource,
  severitySignals,
  type ImmunosuppressionKey,
  type PneumoniaTrack,
  type SeveritySignalKey,
} from '../data/pneumonia/pediatricPneumoniaGuide';

type TabKey = 'triage' | 'diagnosis' | 'antibiotics' | 'immune' | 'followup' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'triage', label: 'Triyaj' },
  { key: 'diagnosis', label: 'Tanı' },
  { key: 'antibiotics', label: 'Antibiyotik' },
  { key: 'immune', label: 'İmmün Baskı' },
  { key: 'followup', label: 'İzlem' },
  { key: 'source', label: 'Kaynak' },
];

const trackOptions: { key: PneumoniaTrack; label: string }[] = [
  { key: 'cap', label: 'Toplumda gelişen' },
  { key: 'immunocompromised', label: 'Bağışıklığı baskılanmış' },
];

export function PediatricPneumoniaScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('triage');
  const [track, setTrack] = useState<PneumoniaTrack>('cap');
  const [selectedSeverity, setSelectedSeverity] = useState<SeveritySignalKey[]>([]);
  const [selectedImmune, setSelectedImmune] = useState<ImmunosuppressionKey[]>([]);

  const severity = useMemo(
    () => classifyPneumoniaSeverity(selectedSeverity),
    [selectedSeverity],
  );

  const visibleScenarios = antibioticScenarios.filter((item) => item.track === track);
  const trackWarning = getTrackWarning(track, selectedImmune.length);

  function toggleSeverity(key: SeveritySignalKey) {
    setSelectedSeverity((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  function toggleImmune(key: ImmunosuppressionKey) {
    setSelectedImmune((current) =>
      current.includes(key) ? current.filter((item) => item !== key) : [...current, key],
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Pnömoni</Text>
        <Text style={styles.title}>Çocukluk Çağında Pnömoni Yaklaşımı</Text>
        <Text style={styles.description}>
          Toplumda gelişen pnömoni ve bağışıklığı baskılanmış çocukta pnömoni için
          triyaj, tanısal kontrol ve ampirik antibiyotik hatırlatıcı.
        </Text>
      </View>

      <SourceVersionBadge text={pneumoniaSource.badge} />
      <WarningBox tone="amber" title="Antibiyotik sınırı" text={pneumoniaSource.warning} />

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

      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Klinik senaryo</Text>
        <View style={styles.chipWrap}>
          {trackOptions.map((option) => (
            <Chip
              key={option.key}
              label={option.label}
              selected={track === option.key}
              onPress={() => setTrack(option.key)}
            />
          ))}
        </View>
        <Text style={styles.helperText}>{trackWarning}</Text>
      </View>

      {activeTab === 'triage' ? (
        <>
          <View style={[styles.resultCard, styles[`${severity.tone}Result`]]}>
            <Text style={styles.resultKicker}>Ön triyaj</Text>
            <Text style={styles.resultTitle}>{severity.title}</Text>
            <Text style={styles.resultText}>{severity.action}</Text>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Ağırlık / yatış uyarıları</Text>
            {severitySignals.map((signal) => (
              <Toggle
                key={signal.key}
                label={signal.label}
                note={signal.note}
                selected={selectedSeverity.includes(signal.key)}
                onPress={() => toggleSeverity(signal.key)}
              />
            ))}
          </View>
        </>
      ) : null}

      {activeTab === 'diagnosis' ? (
        <>
          <ChecklistCard title="Tanısal kontrol listesi" items={diagnosticChecklist} />
          <ChecklistCard title="Destek tedavisi / yapılacaklar" items={capSupportiveCare} />
          <WarningBox
            tone="amber"
            title="Ayırıcı tanı"
            text="Bronşiolit, astım alevlenmesi, yabancı cisim aspirasyonu, TB, kardiyak hastalık ve parapnömonik efüzyon özellikle tedaviye yanıtsız veya atipik olguda yeniden düşünülmelidir."
          />
        </>
      ) : null}

      {activeTab === 'antibiotics' ? (
        <>
          {visibleScenarios.map((scenario) => (
            <AntibioticCard key={scenario.id} scenario={scenario} />
          ))}
        </>
      ) : null}

      {activeTab === 'immune' ? (
        <>
          <WarningBox
            title="İmmün baskılanmış çocuk"
            text="Ateş olmayabilir, grafi başlangıçta silik olabilir ve klinik hızlı kötüleşebilir. Erken toraks BT, geniş mikrobiyoloji, BAL ve geniş spektrum/etkene yönelik tedavi kararı uzman ekip ile verilmelidir."
          />
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>İmmün baskı tipi</Text>
            {immunosuppressionSignals.map((signal) => (
              <Toggle
                key={signal.key}
                label={signal.label}
                note={signal.note}
                selected={selectedImmune.includes(signal.key)}
                onPress={() => toggleImmune(signal.key)}
              />
            ))}
          </View>
          <ChecklistCard
            title="İmmün baskıda ilk sorular"
            items={[
              'İmmün baskının tipi ve başlangıç zamanı nedir?',
              'Nötrofil sayısı ve beklenen nötropeni süresi nedir?',
              'KİT/solid organ transplant sonrası kaçıncı gün/ay?',
              'PJP, antiviral veya antifungal profilaksi kullanıyor mu?',
              'Son hastane yatışı, kateter, kolonizasyon veya dirençli bakteri öyküsü var mı?',
              'HRCT paterni: lobar konsolidasyon, nodül/halo, buzlu cam, kavitasyon veya yaygın infiltrasyon?',
              'Kan kültürü, solunum örneği, viral PCR, fungal belirteç ve BAL gereksinimi değerlendirildi mi?',
            ]}
          />
        </>
      ) : null}

      {activeTab === 'followup' ? (
        <>
          <ChecklistCard title="Yanıt ve kontrol" items={followUpItems} />
          <WarningBox
            title="Komplikasyon bağlantısı"
            text="Efüzyon, ampiyem, nekrotizan pnömoni veya apse şüphesinde Parapnömonik Efüzyon modülündeki USG, plevra sıvısı ve drenaj karar ağacı kullanılabilir."
          />
        </>
      ) : null}

      {activeTab === 'source' ? (
        <>
          <WarningBox title="Klinik karar sınırı" text={pneumoniaSource.warning} />
          <ChecklistCard
            title="Kaynak notu"
            items={[
              'Türk Toraks Derneği Çocuklarda Toplumda Gelişen Pnömoni Tanı, Tedavi ve Uzlaşı Raporu 2023 temel yaklaşım olarak kullanılmıştır.',
              'Bağışıklığı baskılanmış çocuklarda pnömoni için TTD uzlaşı yaklaşımı; etken spektrumunun immün defekt ve zamanlamaya göre değiştiğini vurgular.',
              'Bu ekran rehber tablolarını birebir kopyalamaz; klinik akışı ve ampirik seçenekleri yapılandırılmış hatırlatıcı olarak sunar.',
              'Doz, süre ve ilaç seçimi ayrı doğrulama gerektirir; bu modül reçete çıktısı üretmez.',
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

function AntibioticCard({ scenario }: { scenario: (typeof antibioticScenarios)[number] }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{scenario.title}</Text>
      <Text style={styles.cardLabel}>Ne zaman?</Text>
      <Text style={styles.cardText}>{scenario.when}</Text>
      <Text style={styles.cardLabel}>Olası etkenler</Text>
      <Text style={styles.cardText}>{scenario.likelyPathogens}</Text>
      <ListBlock title="İlk seçenek çerçevesi" items={scenario.firstLine} />
      <ListBlock title="Alternatif / ekleme" items={scenario.alternatives} />
      <ListBlock title="Eskalasyon" items={scenario.escalation} />
      <ListBlock title="Not" items={scenario.notes} />
    </View>
  );
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.listBlock}>
      <Text style={styles.cardLabel}>{title}</Text>
      <BulletList items={items} />
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

const styles = StyleSheet.create({
  scrollContent: {
    gap: 14,
    paddingBottom: 32,
  },
  intro: {
    gap: 8,
  },
  kicker: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0,
    textTransform: 'uppercase',
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
    backgroundColor: '#f5f5f6',
    borderColor: '#e1e1e4',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  chipSelected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  chipText: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '800',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
  panel: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e8e8eb',
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 14,
  },
  panelTitle: {
    color: '#211f1f',
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 23,
  },
  helperText: {
    color: '#343131',
    fontSize: 14,
    lineHeight: 20,
  },
  resultCard: {
    borderRadius: 8,
    borderWidth: 1,
    gap: 6,
    padding: 14,
  },
  redResult: {
    backgroundColor: '#f9e9ec',
    borderColor: '#efcbd2',
  },
  amberResult: {
    backgroundColor: '#fff7e6',
    borderColor: '#f0c36a',
  },
  grayResult: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e1e1e4',
  },
  resultKicker: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  resultTitle: {
    color: '#211f1f',
    fontSize: 19,
    fontWeight: '900',
  },
  resultText: {
    color: '#343131',
    fontSize: 15,
    lineHeight: 22,
  },
  toggle: {
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    borderColor: '#e1e1e4',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 10,
    padding: 12,
  },
  toggleSelected: {
    backgroundColor: '#fff8f9',
    borderColor: '#8f1d2c',
  },
  checkbox: {
    alignItems: 'center',
    borderColor: '#c8c8ce',
    borderRadius: 6,
    borderWidth: 1,
    height: 22,
    justifyContent: 'center',
    marginTop: 1,
    width: 22,
  },
  checkboxSelected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  checkmark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  toggleTextWrap: {
    flex: 1,
    gap: 4,
  },
  toggleLabel: {
    color: '#211f1f',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 20,
  },
  toggleNote: {
    color: '#686868',
    fontSize: 13,
    lineHeight: 18,
  },
  cardLabel: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  cardText: {
    color: '#343131',
    fontSize: 14,
    lineHeight: 20,
  },
  listBlock: {
    gap: 7,
  },
  bulletList: {
    gap: 8,
  },
  bulletRow: {
    flexDirection: 'row',
    gap: 8,
  },
  bullet: {
    color: '#8f1d2c',
    fontSize: 16,
    fontWeight: '900',
    width: 12,
  },
  bulletText: {
    color: '#343131',
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    color: '#8a8a8a',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
    textAlign: 'center',
  },
});
