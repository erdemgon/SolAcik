import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  CLINICAL_NOTE_SAFETY_SENTENCE,
  CopyClinicalNoteButton,
} from '../components/common/CopyClinicalNoteButton';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  AsthmaAgeGroup2026,
  AsthmaCareMode,
  AsthmaStep2026,
  AsthmaStepNumber,
  asthmaAgeNotes2026,
  asthmaEditorCheckpoints2026,
  asthmaEmergencySections2026,
  gina2026AsthmaAgeHighlights,
  gina2026AsthmaKeyMessages,
  gina2026AsthmaSource,
  gina2026AsthmaSteps,
} from '../data/asthma/gina2026AsthmaModule';
import {
  TurkeyAsthmaInhaler,
  getAsthmaInhalersByRoles,
  turkeyAsthmaInhalers,
} from '../data/asthma/turkeyAsthmaInhalers';

const ageOptions: { label: string; value: AsthmaAgeGroup2026 }[] = [
  { label: '0-5 yaş', value: '0-5' },
  { label: '6-11 yaş', value: '6-11' },
  { label: '12 yaş ve üzeri', value: '12plus' },
];

const modeOptions: { label: string; value: AsthmaCareMode }[] = [
  { label: 'Acil / alevlenme', value: 'emergency' },
  { label: 'Stabil hasta / basamak', value: 'stable' },
];

const stepOptions: AsthmaStepNumber[] = [1, 2, 3, 4, 5];

const medicationFilters = [
  { label: 'Basamağa göre', value: 'step' },
  { label: 'Tüm ilaçlar', value: 'all' },
  { label: 'MART/SMART +', value: 'mart' },
] as const;

type MedicationFilter = (typeof medicationFilters)[number]['value'];

export function AsthmaManagementScreen() {
  const [ageGroup, setAgeGroup] = useState<AsthmaAgeGroup2026>('6-11');
  const [mode, setMode] = useState<AsthmaCareMode>('stable');
  const [selectedStep, setSelectedStep] = useState<AsthmaStepNumber>(1);
  const [medicationFilter, setMedicationFilter] = useState<MedicationFilter>('step');

  const selectedStepCards = useMemo(
    () =>
      gina2026AsthmaSteps.filter(
        (step) => step.ageGroup === ageGroup && step.step === selectedStep,
      ),
    [ageGroup, selectedStep],
  );

  const selectedStepCard = selectedStepCards[0];

  const medicationCards = useMemo(() => {
    if (medicationFilter === 'all') return turkeyAsthmaInhalers;
    if (medicationFilter === 'mart') {
      return turkeyAsthmaInhalers.filter(
        (med) => med.martSmart === '+' || med.martSmart === 'doğrula',
      );
    }
    return selectedStepCard ? getAsthmaInhalersByRoles(selectedStepCard.turkeyMedicationRoles) : [];
  }, [medicationFilter, selectedStepCard]);

  const clinicalNote = buildAsthmaClinicalNote({
    ageGroup,
    medicationCards,
    medicationFilter,
    mode,
    selectedStep,
    selectedStepCard,
  });

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.hero}>
        <Text style={styles.kicker}>Astım</Text>
        <Text style={styles.title}>{gina2026AsthmaSource.title}</Text>
        <Text style={styles.description}>
          Yaşı seç, acil ya da stabil hasta akışını aç, basamak kartını ve Türkiye preparat
          karşılıklarını aynı ekranda gör. Hasta kimliği toplanmaz; seçimler geçicidir.
        </Text>
      </View>

      <SourceVersionBadge compact text={gina2026AsthmaSource.badge} />
      <Text style={styles.updateNote}>GINA 2026 güncellemesine göre yeniden sadeleştirildi; editör kurul klinik doğrulaması bekler.</Text>
      <CopyClinicalNoteButton note={clinicalNote} />
      <WarningBox tone="amber" title="Telif ve klinik güvenlik" text={gina2026AsthmaSource.disclaimer} />

      <Panel title="GINA 2026 kısa klinik not">
        <BulletList items={gina2026AsthmaKeyMessages} />
      </Panel>

      <Panel title="1. Yaş grubu">
        <ChipRow>
          {ageOptions.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              selected={ageGroup === option.value}
              onPress={() => setAgeGroup(option.value)}
            />
          ))}
        </ChipRow>
        <BulletList items={asthmaAgeNotes2026[ageGroup]} />
      </Panel>

      <AgeHighlightPanel ageGroup={ageGroup} />

      <Panel title="2. Klinik akış">
        <ChipRow>
          {modeOptions.map((option) => (
            <Chip
              key={option.value}
              label={option.label}
              selected={mode === option.value}
              onPress={() => setMode(option.value)}
            />
          ))}
        </ChipRow>
      </Panel>

      {mode === 'emergency' ? (
        <EmergencyFlow ageGroup={ageGroup} />
      ) : (
        <StableStepFlow
          medicationCards={medicationCards}
          medicationFilter={medicationFilter}
          selectedStep={selectedStep}
          selectedStepCard={selectedStepCard}
          onMedicationFilter={setMedicationFilter}
          onStep={setSelectedStep}
        />
      )}

      <EditorReviewPanel />

      <Text style={styles.footer}>Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı</Text>
    </ScrollView>
  );
}

function buildAsthmaClinicalNote({
  ageGroup,
  medicationCards,
  medicationFilter,
  mode,
  selectedStep,
  selectedStepCard,
}: {
  ageGroup: AsthmaAgeGroup2026;
  medicationCards: TurkeyAsthmaInhaler[];
  medicationFilter: MedicationFilter;
  mode: AsthmaCareMode;
  selectedStep: AsthmaStepNumber;
  selectedStepCard?: AsthmaStep2026;
}) {
  const ageLabel = ageOptions.find((option) => option.value === ageGroup)?.label ?? ageGroup;
  const flowLabel = mode === 'emergency' ? 'Acil / alevlenme' : 'Stabil hasta / basamak';
  const drugNames = medicationCards
    .slice(0, 6)
    .map((med) => `${med.activeIngredientTr} (${med.brandExamplesTr.slice(0, 3).join(', ')})`)
    .join('; ');
  const stepText = selectedStepCard
    ? `Step ${selectedStep}: ${selectedStepCard.title}. Kontrol edici: ${selectedStepCard.controller}. Rahatlatıcı: ${selectedStepCard.reliever}.`
    : `Step ${selectedStep}.`;
  const medicationText = medicationFilter === 'step'
    ? `Basamağa göre görünen Türkiye preparatları: ${drugNames || 'kayıt yok'}.`
    : `İlaç filtresi: ${medicationFilter}. Görünen preparatlar: ${drugNames || 'kayıt yok'}.`;

  return `Astım yönetimi klinik notu: Yaş grubu ${ageLabel}. Akış: ${flowLabel}. ${mode === 'stable' ? stepText : 'Acil/alevlenme checklisti açıldı; akut dozlar kurum protokolüyle doğrulanmalıdır.'} ${medicationText} Kaynak: ${gina2026AsthmaSource.badge}. ${CLINICAL_NOTE_SAFETY_SENTENCE}`;
}

function StableStepFlow({
  selectedStep,
  selectedStepCard,
  medicationCards,
  medicationFilter,
  onStep,
  onMedicationFilter,
}: {
  selectedStep: AsthmaStepNumber;
  selectedStepCard?: AsthmaStep2026;
  medicationCards: TurkeyAsthmaInhaler[];
  medicationFilter: MedicationFilter;
  onStep: (step: AsthmaStepNumber) => void;
  onMedicationFilter: (filter: MedicationFilter) => void;
}) {
  return (
    <>
      <Panel title="3. Basamak seç">
        <ChipRow>
          {stepOptions.map((step) => (
            <Chip
              key={step}
              label={step === 5 ? 'Step 5 / uzman' : `Step ${step}`}
              selected={selectedStep === step}
              onPress={() => onStep(step)}
            />
          ))}
        </ChipRow>
        <Text style={styles.miniText}>
          Basamak metinleri GINA 2026’nın birebir çevirisi değil, klinikte hızlı okunacak
          Türkçe özetidir. Editör kurul doğrulaması için kaynak notu her kartta saklanır.
        </Text>
      </Panel>

      {selectedStepCard ? <AsthmaStepSummaryCard step={selectedStepCard} /> : null}

      <Panel title="4. Türkiye preparatları">
        <ChipRow>
          {medicationFilters.map((filter) => (
            <Chip
              key={filter.value}
              label={filter.label}
              selected={medicationFilter === filter.value}
              onPress={() => onMedicationFilter(filter.value)}
            />
          ))}
        </ChipRow>
        <Text style={styles.miniText}>
          Ticari isimler editör kurulunun KÜB/KT kontrolünden geçecek taslak listedir;
          piyasadaki ürünler değişebilir.
        </Text>
      </Panel>

      <View style={styles.cardList}>
        {medicationCards.map((med) => (
          <AsthmaMedicationCard key={med.id} med={med} />
        ))}
      </View>
    </>
  );
}

function EmergencyFlow({ ageGroup }: { ageGroup: AsthmaAgeGroup2026 }) {
  const sections = asthmaEmergencySections2026.filter(
    (section) => section.ageGroup === 'all' || section.ageGroup === ageGroup,
  );
  return (
    <View style={styles.cardList}>
      {sections.map((section) => (
        <Panel key={section.title} title={section.title}>
          <BulletList items={section.items} />
          {section.alert ? <WarningBox title="Kırmızı bayrak" text={section.alert} /> : null}
          <Text style={styles.sourceSmall}>{section.sourceVersion}</Text>
        </Panel>
      ))}
      <WarningBox
        tone="amber"
        title="Doz sınırı"
        text="Bu ekranda akut acil ilaç dozları ayrıntılandırılmaz. Doz, oksijen hedefi, sistemik steroid, ipratropium ve magnezyum kararları kurum acil protokolü ve güncel KÜB/KT ile doğrulanmalıdır."
      />
    </View>
  );
}

function AsthmaStepSummaryCard({ step }: { step: AsthmaStep2026 }) {
  return (
    <View style={styles.stepCard}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepBadge}>Step {step.step}</Text>
        <MartPill status={step.martStatus} />
      </View>
      <Text style={styles.cardTitle}>{step.title}</Text>
      <InfoLine label="Ne zaman?" value={step.whenToThink} />
      <InfoLine label="Kontrol edici" value={step.controller} />
      <InfoLine label="Rahatlatıcı" value={step.reliever} />
      <BulletList items={step.practicalNotes} />
      {step.specialistNote ? <WarningBox tone="amber" title="Uzman notu" text={step.specialistNote} /> : null}
      <Text style={styles.sourceSmall}>{step.sourceVersion}</Text>
    </View>
  );
}

function AsthmaMedicationCard({ med }: { med: TurkeyAsthmaInhaler }) {
  return (
    <View style={styles.medCard}>
      <View style={styles.stepHeader}>
        <Text style={styles.medTitle}>{med.activeIngredientTr}</Text>
        <SmartBadge value={med.martSmart} />
      </View>
      <Text style={styles.brandText}>{med.brandExamplesTr.join(' / ')}</Text>
      <InfoLine label="Form" value={med.formsAndStrengths.join(', ')} />
      <InfoLine label="Klinik rol" value={med.asthmaUseNote} />
      <InfoLine label="Yaş/KÜB" value={med.ageNote} />
      <Text style={styles.sourceSmall}>{med.sourceVersion}</Text>
    </View>
  );
}

function EditorReviewPanel() {
  return (
    <Panel title="Editör kurul kontrol haritası">
      {asthmaEditorCheckpoints2026.map((checkpoint) => (
        <View key={checkpoint.title} style={styles.reviewBlock}>
          <Text style={styles.reviewTitle}>{checkpoint.title}</Text>
          <BulletList items={checkpoint.items} />
        </View>
      ))}
    </Panel>
  );
}

function AgeHighlightPanel({ ageGroup }: { ageGroup: AsthmaAgeGroup2026 }) {
  const highlight = gina2026AsthmaAgeHighlights.find((item) => item.ageGroup === ageGroup);
  if (!highlight) return null;

  return (
    <Panel title={highlight.title}>
      <BulletList items={highlight.items} />
    </Panel>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      {children}
    </View>
  );
}

function ChipRow({ children }: { children: React.ReactNode }) {
  return <View style={styles.chipRow}>{children}</View>;
}

function Chip({ label, selected, onPress }: { label: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        selected ? styles.chipSelected : undefined,
        pressed ? styles.pressed : undefined,
      ]}
    >
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : undefined]}>{label}</Text>
    </Pressable>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoLine}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <View style={styles.bulletList}>
      {items.map((item) => (
        <Text key={item} style={styles.bullet}>• {item}</Text>
      ))}
    </View>
  );
}

function MartPill({ status }: { status: AsthmaStep2026['martStatus'] }) {
  const color = status === 'uygun' ? styles.greenPill : status === 'seçilmiş hastada' ? styles.amberPill : styles.grayPill;
  return <Text style={[styles.pill, color]}>MART: {status}</Text>;
}

function SmartBadge({ value }: { value: TurkeyAsthmaInhaler['martSmart'] }) {
  const label = value === '+' ? 'SMART/MART +' : value === 'doğrula' ? 'SMART doğrula' : 'SMART -';
  const color = value === '+' ? styles.greenPill : value === 'doğrula' ? styles.amberPill : styles.grayPill;
  return <Text style={[styles.pill, color]}>{label}</Text>;
}

const styles = StyleSheet.create({
  scrollContent: {
    gap: 14,
    padding: 18,
    paddingBottom: 34,
  },
  hero: {
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
  updateNote: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
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
  chipRow: {
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
    fontSize: 14,
    fontWeight: '800',
  },
  chipTextSelected: {
    color: '#fff',
  },
  pressed: {
    opacity: 0.72,
  },
  miniText: {
    color: '#686868',
    fontSize: 13,
    lineHeight: 19,
  },
  cardList: {
    gap: 12,
  },
  stepCard: {
    backgroundColor: '#fff',
    borderColor: '#efcbd2',
    borderRadius: 8,
    borderWidth: 1,
    gap: 11,
    padding: 15,
  },
  medCard: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 9,
    padding: 14,
  },
  stepHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'space-between',
  },
  stepBadge: {
    color: '#8f1d2c',
    fontSize: 14,
    fontWeight: '900',
  },
  cardTitle: {
    color: '#211f1f',
    fontSize: 20,
    fontWeight: '900',
    lineHeight: 25,
  },
  medTitle: {
    color: '#211f1f',
    flex: 1,
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 22,
    minWidth: 180,
  },
  brandText: {
    color: '#8f1d2c',
    fontSize: 15,
    fontWeight: '900',
    lineHeight: 21,
  },
  infoLine: {
    gap: 3,
  },
  infoLabel: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  infoValue: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  bulletList: {
    gap: 6,
  },
  bullet: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  pill: {
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  greenPill: {
    backgroundColor: '#e6f4ea',
    color: '#146c2e',
  },
  amberPill: {
    backgroundColor: '#fff7e6',
    color: '#8a5a00',
  },
  grayPill: {
    backgroundColor: '#ececee',
    color: '#55565a',
  },
  sourceSmall: {
    color: '#686868',
    fontSize: 12,
    lineHeight: 17,
  },
  reviewBlock: {
    backgroundColor: '#fff',
    borderRadius: 8,
    gap: 7,
    padding: 11,
  },
  reviewTitle: {
    color: '#8f1d2c',
    fontSize: 15,
    fontWeight: '900',
  },
  footer: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
  },
});
