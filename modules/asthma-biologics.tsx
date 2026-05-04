import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  AsthmaBiologic,
  asthmaBiologicCoreWarning,
  asthmaBiologicSourceBadge,
  asthmaBiologics,
  biologicDecisionSteps,
  biologicReadinessChecklist,
} from '../data/asthma/asthmaBiologics';

type TabKey = 'selector' | 'tree' | 'dose' | 'monitoring' | 'source';
type PhenotypeFilter = 'all' | 'allergic' | 'eosinophilic' | 'type2' | 'ocs' | 'unclear';
type BiomarkerInput = {
  totalIge: string;
  eosinophil: string;
  feno: string;
  allergicSensitization: boolean;
  ocsDependent: boolean;
  frequentExacerbation: boolean;
  atopicComorbidity: boolean;
};

const tabs: { key: TabKey; label: string }[] = [
  { key: 'selector', label: 'İlaç Seçici' },
  { key: 'tree', label: 'Karar Ağacı' },
  { key: 'dose', label: 'İlaç & Doz' },
  { key: 'monitoring', label: 'İzlem' },
  { key: 'source', label: 'Uyarılar & Kaynak' },
];

const phenotypeOptions: { label: string; value: PhenotypeFilter }[] = [
  { label: 'Tümü', value: 'all' },
  { label: 'Alerjik', value: 'allergic' },
  { label: 'Eozinofilik', value: 'eosinophilic' },
  { label: 'Tip 2 / FeNO', value: 'type2' },
  { label: 'OCS bağımlı', value: 'ocs' },
  { label: 'Fenotip belirsiz', value: 'unclear' },
];

export function AsthmaBiologicsScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('selector');
  const [ageYears, setAgeYears] = useState('');
  const [weightKg, setWeightKg] = useState('');
  const [biomarkers, setBiomarkers] = useState<BiomarkerInput>({
    totalIge: '',
    eosinophil: '',
    feno: '',
    allergicSensitization: false,
    ocsDependent: false,
    frequentExacerbation: false,
    atopicComorbidity: false,
  });
  const [phenotype, setPhenotype] = useState<PhenotypeFilter>('all');
  const [selectedId, setSelectedId] = useState(asthmaBiologics[0].id);

  const parsedAge = parseNumber(ageYears);
  const parsedWeight = parseNumber(weightKg);
  const biomarkerValues = useMemo(
    () => ({
      totalIge: parseNumber(biomarkers.totalIge),
      eosinophil: parseNumber(biomarkers.eosinophil),
      feno: parseNumber(biomarkers.feno),
    }),
    [biomarkers],
  );
  const selectedDrug =
    asthmaBiologics.find((drug) => drug.id === selectedId) ?? asthmaBiologics[0];
  const visibleDrugs = useMemo(
    () =>
      asthmaBiologics
        .map((drug) => ({
          drug,
          score: getBiologicFitScore(drug, biomarkers, biomarkerValues),
        }))
        .filter(({ drug }) => {
          const ageOk = parsedAge === null || parsedAge >= drug.minimumAgeYears;
          const phenotypeOk = phenotype === 'all' || drugMatchesPhenotype(drug, phenotype);
          return ageOk && phenotypeOk;
        })
        .sort((a, b) => b.score - a.score)
        .map(({ drug }) => drug),
    [biomarkerValues, biomarkers, parsedAge, phenotype],
  );

  function updateBiomarker(key: keyof BiomarkerInput, value: string | boolean) {
    setBiomarkers((current) => ({ ...current, [key]: value }));
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Ağır astım</Text>
        <Text style={styles.title}>Astım Biyolojik Tedaviler: İlaç Seçici ve Doz Asistanı</Text>
        <Text style={styles.description}>
          Pediatrik ağır astımda biyolojik tedavi seçeneklerini fenotip, yaş ve
          kilo açısından yapılandırılmış biçimde gösterir. Hasta kimliği toplanmaz.
        </Text>
      </View>

      <SourceVersionBadge text={asthmaBiologicSourceBadge} />
      <WarningBox tone="amber" title="Kullanım sınırı" text={asthmaBiologicCoreWarning} />

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

      {activeTab === 'selector' ? (
        <>
          <InputPanel
            ageYears={ageYears}
            weightKg={weightKg}
            biomarkers={biomarkers}
            onAgeYears={setAgeYears}
            onWeightKg={setWeightKg}
            onBiomarkerChange={updateBiomarker}
          />
          <BiomarkerSummary biomarkers={biomarkers} values={biomarkerValues} />
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Fenotip filtresi</Text>
            <View style={styles.chipWrap}>
              {phenotypeOptions.map((option) => (
                <Chip
                  key={option.value}
                  label={option.label}
                  selected={phenotype === option.value}
                  onPress={() => setPhenotype(option.value)}
                />
              ))}
            </View>
          </View>
          {visibleDrugs.length ? (
            visibleDrugs.map((drug) => (
              <BiologicCard
                key={drug.id}
                drug={drug}
                ageYears={parsedAge}
                weightKg={parsedWeight}
                biomarkers={biomarkers}
                biomarkerValues={biomarkerValues}
                selected={drug.id === selectedId}
                onSelect={() => {
                  setSelectedId(drug.id);
                  setActiveTab('dose');
                }}
              />
            ))
          ) : (
            <WarningBox
              tone="amber"
              title="Uygun kayıt bulunamadı"
              text="Yaş veya fenotip filtresini genişletin; klinik kullanım için KÜB/KT ve ağır astım merkezi değerlendirmesi gerekir."
            />
          )}
        </>
      ) : null}

      {activeTab === 'tree' ? (
        <>
          <InfoCard title="Biyolojik tedavi karar ağacı" items={biologicDecisionSteps.map((step) => `${step.title}: ${step.text}`)} />
          <InfoCard title="Başlamadan önce checklist" items={biologicReadinessChecklist} />
        </>
      ) : null}

      {activeTab === 'dose' ? (
        <>
          <InputPanel
            ageYears={ageYears}
            weightKg={weightKg}
            biomarkers={biomarkers}
            onAgeYears={setAgeYears}
            onWeightKg={setWeightKg}
            onBiomarkerChange={updateBiomarker}
          />
          <DrugSelector selectedId={selectedId} onSelect={setSelectedId} />
          <BiologicCard
            drug={selectedDrug}
            ageYears={parsedAge}
            weightKg={parsedWeight}
            biomarkers={biomarkers}
            biomarkerValues={biomarkerValues}
            selected
          />
        </>
      ) : null}

      {activeTab === 'monitoring' ? (
        <>
          <InfoCard title="Tedavi yanıtı izlemi" items={[
            '4–6 ay içinde alevlenme sıklığı, OCS gereksinimi, semptom kontrolü, okul/aktivite etkisi ve solunum fonksiyonu ile yanıt değerlendir.',
            'Kısmi yanıtta fenotip, uyum, teknik, komorbidite ve alternatif biyolojik seçenekler yeniden gözden geçirilir.',
            'Yanıtsızlıkta ağır astım merkezi ile tedavi sonlandırma/değişim kararı verilir.',
          ]} />
          <InfoCard title="Güvenlik izlemi" items={[
            'Anafilaksi/hipersensitivite ve enjeksiyon yeri reaksiyonları',
            'Paraziter enfeksiyon riski ve canlı aşılar',
            'Steroid azaltımı gerekiyorsa kademeli plan',
            'Dupilumabda eozinofilik durumlar/konjonktivit; IL-5 yolunda eozinofil yanıtı; tezepelumabda hipersensitivite ve genel yan etkiler',
          ]} />
        </>
      ) : null}

      {activeTab === 'source' ? (
        <>
          <WarningBox title="Zorunlu doğrulama" text={asthmaBiologicCoreWarning} />
          <InfoCard title="Kaynak yaklaşımı" items={[
            'Omalizumab, mepolizumab, benralizumab, dupilumab ve tezepelumab için FDA/ürün bilgisi doz özetleri temel alınmıştır.',
            'Türkiye ruhsat yaşı, KÜB/KT, SGK/SUT ve erişim koşulları değişebilir; her hasta için resmi yerel kaynak kontrol edilmelidir.',
            'Bu modül akut bronkospazm, status asthmaticus veya otonom reçete/doz kararı için kullanılmaz.',
          ]} />
        </>
      ) : null}

      <Text style={styles.footer}>
        Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
      </Text>
    </ScrollView>
  );
}

function InputPanel({
  ageYears,
  weightKg,
  biomarkers,
  onAgeYears,
  onWeightKg,
  onBiomarkerChange,
}: {
  ageYears: string;
  weightKg: string;
  biomarkers: BiomarkerInput;
  onAgeYears: (value: string) => void;
  onWeightKg: (value: string) => void;
  onBiomarkerChange: (key: keyof BiomarkerInput, value: string | boolean) => void;
}) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Geçici fenotip bilgileri</Text>
      <View style={styles.inputRow}>
        <Field label="Yaş (yıl)" value={ageYears} onChangeText={onAgeYears} />
        <Field label="Kilo (kg)" value={weightKg} onChangeText={onWeightKg} />
      </View>
      <View style={styles.inputGrid}>
        <Field
          label="Total IgE (IU/mL)"
          value={biomarkers.totalIge}
          onChangeText={(value) => onBiomarkerChange('totalIge', value)}
        />
        <Field
          label="Eozinofil (/µL)"
          value={biomarkers.eosinophil}
          onChangeText={(value) => onBiomarkerChange('eosinophil', value)}
        />
        <Field
          label="FeNO (ppb)"
          value={biomarkers.feno}
          onChangeText={(value) => onBiomarkerChange('feno', value)}
        />
      </View>
      <View style={styles.toggleGrid}>
        <Toggle
          label="Alerjik duyarlanma var"
          selected={biomarkers.allergicSensitization}
          onPress={() =>
            onBiomarkerChange('allergicSensitization', !biomarkers.allergicSensitization)
          }
        />
        <Toggle
          label="OCS bağımlı"
          selected={biomarkers.ocsDependent}
          onPress={() => onBiomarkerChange('ocsDependent', !biomarkers.ocsDependent)}
        />
        <Toggle
          label="Sık alevlenme"
          selected={biomarkers.frequentExacerbation}
          onPress={() =>
            onBiomarkerChange('frequentExacerbation', !biomarkers.frequentExacerbation)
          }
        />
        <Toggle
          label="Atopik komorbidite"
          selected={biomarkers.atopicComorbidity}
          onPress={() =>
            onBiomarkerChange('atopicComorbidity', !biomarkers.atopicComorbidity)
          }
        />
      </View>
      <Text style={styles.smallNote}>
        Hasta kimliği girilmez; değerler yalnızca ekranda geçici ilaç seçici için kullanılır.
      </Text>
    </View>
  );
}

function Field({
  label,
  value,
  onChangeText,
}: {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        keyboardType="decimal-pad"
        onChangeText={onChangeText}
        placeholder="0"
        placeholderTextColor="#999"
        style={styles.input}
        value={value}
      />
    </View>
  );
}

function DrugSelector({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: AsthmaBiologic['id']) => void;
}) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>İlaç seç</Text>
      <View style={styles.chipWrap}>
        {asthmaBiologics.map((drug) => (
          <Chip
            key={drug.id}
            label={drug.genericName}
            selected={selectedId === drug.id}
            onPress={() => onSelect(drug.id)}
          />
        ))}
      </View>
    </View>
  );
}

function BiologicCard({
  drug,
  ageYears,
  weightKg,
  biomarkers,
  biomarkerValues,
  selected,
  onSelect,
}: {
  drug: AsthmaBiologic;
  ageYears: number | null;
  weightKg: number | null;
  biomarkers: BiomarkerInput;
  biomarkerValues: {
    totalIge: number | null;
    eosinophil: number | null;
    feno: number | null;
  };
  selected?: boolean;
  onSelect?: () => void;
}) {
  const doseText = getDoseText(drug, ageYears, weightKg);
  const ageEligible = ageYears === null || ageYears >= drug.minimumAgeYears;
  const fit = getBiologicFit(drug, biomarkers, biomarkerValues);

  return (
    <Pressable
      accessibilityRole="button"
      disabled={!onSelect}
      onPress={onSelect}
      style={[styles.drugCard, selected ? styles.drugCardSelected : undefined]}
    >
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleWrap}>
          <Text style={styles.drugName}>{drug.genericName}</Text>
          <Text style={styles.brandText}>{drug.brandNames.join(', ')} • {drug.target}</Text>
        </View>
        <View style={styles.badgeStack}>
          <Text style={[styles.badge, ageEligible ? styles.badgeGreen : styles.badgeRed]}>
            {ageEligible ? `${drug.minimumAgeYears}+ yaş` : 'Yaş uygun değil'}
          </Text>
          <Text style={[styles.badge, fit.tone === 'green' ? styles.badgeGreen : fit.tone === 'amber' ? styles.badgeAmber : styles.badgeGray]}>
            {fit.label}
          </Text>
        </View>
      </View>

      <Text style={styles.sectionLabel}>Seçici yorumu</Text>
      {fit.reasons.map((reason) => (
        <Text key={reason} style={styles.bullet}>• {reason}</Text>
      ))}

      <Text style={styles.sectionLabel}>Fenotip / kullanım ipuçları</Text>
      <Text style={styles.paragraph}>{drug.phenotype.join(' • ')}</Text>

      <Text style={styles.sectionLabel}>Doz özeti</Text>
      <Text style={styles.doseText}>{doseText}</Text>
      <Text style={styles.smallNote}>{drug.pediatricDoseSummary}</Text>

      <Text style={styles.sectionLabel}>Uygunluk ipuçları</Text>
      {drug.eligibilityClues.map((item) => (
        <Text key={item} style={styles.bullet}>• {item}</Text>
      ))}

      <Text style={styles.sectionLabel}>Dikkat</Text>
      {drug.cautions.map((item) => (
        <Text key={item} style={styles.bullet}>• {item}</Text>
      ))}

      <Text style={styles.sourceNote}>{drug.sourceNote}</Text>
    </Pressable>
  );
}

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>{title}</Text>
      {items.map((item) => (
        <Text key={item} style={styles.bullet}>• {item}</Text>
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
      onPress={onPress}
      style={[styles.chip, selected ? styles.chipSelected : undefined]}
    >
      <Text style={[styles.chipText, selected ? styles.chipTextSelected : undefined]}>
        {label}
      </Text>
    </Pressable>
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
      <Text style={[styles.toggleText, selected ? styles.toggleTextSelected : undefined]}>
        {label}
      </Text>
    </Pressable>
  );
}

function BiomarkerSummary({
  biomarkers,
  values,
}: {
  biomarkers: BiomarkerInput;
  values: { totalIge: number | null; eosinophil: number | null; feno: number | null };
}) {
  const items = [
    values.totalIge !== null
      ? `Total IgE: ${values.totalIge} IU/mL`
      : 'Total IgE girilmedi',
    values.eosinophil !== null
      ? `Eozinofil: ${values.eosinophil}/µL`
      : 'Eozinofil girilmedi',
    values.feno !== null ? `FeNO: ${values.feno} ppb` : 'FeNO girilmedi',
    biomarkers.allergicSensitization ? 'Alerjik duyarlanma var' : 'Alerjik duyarlanma işaretlenmedi',
    biomarkers.ocsDependent ? 'OCS bağımlı' : 'OCS bağımlılığı işaretlenmedi',
  ];

  return <InfoCard title="Fenotip özeti" items={items} />;
}

function getDoseText(drug: AsthmaBiologic, ageYears: number | null, weightKg: number | null) {
  if (ageYears === null) return drug.pediatricDoseSummary;
  const rule = drug.doseRules.find((item) => {
    const ageOk =
      ageYears >= item.ageMinYears &&
      (item.ageMaxYears === undefined || ageYears <= item.ageMaxYears);
    const weightOk =
      (item.weightMinKg === undefined || (weightKg !== null && weightKg >= item.weightMinKg)) &&
      (item.weightMaxKg === undefined || (weightKg !== null && weightKg <= item.weightMaxKg));
    const noWeightNeeded = item.weightMinKg === undefined && item.weightMaxKg === undefined;
    return ageOk && (noWeightNeeded || weightOk);
  });

  if (rule) return rule.doseText;
  if (ageYears < drug.minimumAgeYears) {
    return `${drug.minimumAgeYears} yaş altı için otomatik doz gösterme; KÜB/KT ve uzman değerlendirmesi gerekir.`;
  }
  return 'Kilo bandı veya özel durum nedeniyle otomatik doz gösterilemedi; resmi KÜB/KT ve uzman değerlendirmesi ile doğrula.';
}

function drugMatchesPhenotype(drug: AsthmaBiologic, phenotype: PhenotypeFilter) {
  const text = `${drug.phenotype.join(' ')} ${drug.eligibilityClues.join(' ')}`.toLocaleLowerCase('tr-TR');
  if (phenotype === 'allergic') return text.includes('alerjik') || text.includes('ige');
  if (phenotype === 'eosinophilic') return text.includes('eoz');
  if (phenotype === 'type2') return text.includes('tip 2') || text.includes('feno') || text.includes('il-4');
  if (phenotype === 'ocs') return text.includes('ocs') || text.includes('steroid');
  if (phenotype === 'unclear') return text.includes('fenotip') || text.includes('tslp');
  return true;
}

function getBiologicFitScore(
  drug: AsthmaBiologic,
  biomarkers: BiomarkerInput,
  values: { totalIge: number | null; eosinophil: number | null; feno: number | null },
) {
  return getBiologicFit(drug, biomarkers, values).score;
}

function getBiologicFit(
  drug: AsthmaBiologic,
  biomarkers: BiomarkerInput,
  values: { totalIge: number | null; eosinophil: number | null; feno: number | null },
) {
  const reasons: string[] = [];
  let score = 0;

  if (biomarkers.frequentExacerbation) {
    score += 1;
    reasons.push('Sık alevlenme biyolojik tedavi değerlendirmesini destekler.');
  }

  if (drug.id === 'omalizumab') {
    if (biomarkers.allergicSensitization) {
      score += 4;
      reasons.push('Alerjik duyarlanma omalizumab için temel uygunluk ipucudur.');
    } else {
      reasons.push('Omalizumab için perennial aeroalerjen duyarlılığı doğrulanmalıdır.');
    }
    if (values.totalIge !== null) {
      score += 2;
      reasons.push('Total IgE girildi; doz için resmi IgE+kilo tablosu gerekir.');
    } else {
      reasons.push('Total IgE girilmeden omalizumab doz tablosu değerlendirilemez.');
    }
  }

  if (drug.id === 'mepolizumab' || drug.id === 'benralizumab') {
    if (values.eosinophil !== null && values.eosinophil >= 150) {
      score += values.eosinophil >= 300 ? 5 : 3;
      reasons.push('Kan eozinofili IL-5/IL-5R yolunu destekler.');
    } else {
      reasons.push('IL-5/IL-5R ajanları için eozinofilik fenotip belgelenmelidir.');
    }
  }

  if (drug.id === 'dupilumab') {
    if (values.eosinophil !== null && values.eosinophil >= 150) {
      score += 2;
      reasons.push('Eozinofili Tip 2 inflamasyon lehine destek sağlar.');
    }
    if (values.feno !== null && values.feno >= 25) {
      score += 3;
      reasons.push('FeNO yüksekliği dupilumab/Tip 2 inflamasyon seçimini destekleyebilir.');
    }
    if (biomarkers.ocsDependent) {
      score += 3;
      reasons.push('OCS bağımlı astım dupilumab için önemli bir değerlendirme ipucudur.');
    }
    if (biomarkers.atopicComorbidity) {
      score += 2;
      reasons.push('Atopik dermatit/CRSwNP gibi komorbidite dupilumab seçimini destekleyebilir.');
    }
    if (!reasons.some((reason) => reason.includes('dupilumab') || reason.includes('Tip 2'))) {
      reasons.push('Dupilumab için Tip 2 inflamasyon, OCS bağımlılığı veya atopik komorbidite aranır.');
    }
  }

  if (drug.id === 'tezepelumab') {
    score += 1;
    if (
      values.eosinophil === null &&
      values.feno === null &&
      !biomarkers.allergicSensitization
    ) {
      score += 3;
      reasons.push('Fenotip/biyobelirteç net değilse tezepelumab seçenek olarak değerlendirilebilir.');
    } else {
      reasons.push('Tezepelumab ağır astımda fenotip kısıtı olmadan düşünülebilir; yerel koşullar doğrulanmalıdır.');
    }
  }

  if (!reasons.length) {
    reasons.push('Fenotip bilgileri girildikçe seçici yorumu güçlenir.');
  }

  return {
    score,
    label: score >= 5 ? 'Güçlü aday' : score >= 2 ? 'Değerlendir' : 'Veri gerekli',
    tone: score >= 5 ? 'green' : score >= 2 ? 'amber' : 'gray',
    reasons,
  };
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
    gap: 10,
    padding: 14,
  },
  panelTitle: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 10,
  },
  inputGrid: {
    gap: 10,
  },
  field: {
    flex: 1,
    gap: 6,
  },
  fieldLabel: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '800',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#dddddf',
    borderRadius: 8,
    borderWidth: 1,
    color: '#211f1f',
    fontSize: 16,
    minHeight: 44,
    paddingHorizontal: 12,
  },
  smallNote: {
    color: '#686868',
    fontSize: 13,
    lineHeight: 18,
  },
  toggleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  toggle: {
    backgroundColor: '#fff',
    borderColor: '#d9d9dd',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 40,
    paddingHorizontal: 11,
    paddingVertical: 9,
  },
  toggleSelected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  toggleText: {
    color: '#211f1f',
    fontSize: 13,
    fontWeight: '800',
  },
  toggleTextSelected: {
    color: '#fff',
  },
  drugCard: {
    backgroundColor: '#f5f5f6',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 9,
    padding: 14,
  },
  drugCardSelected: {
    borderColor: '#8f1d2c',
    borderWidth: 2,
  },
  cardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  cardTitleWrap: {
    flex: 1,
  },
  badgeStack: {
    alignItems: 'flex-end',
    gap: 6,
  },
  drugName: {
    color: '#211f1f',
    fontSize: 20,
    fontWeight: '900',
  },
  brandText: {
    color: '#686868',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
    marginTop: 2,
  },
  badge: {
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '900',
    paddingHorizontal: 9,
    paddingVertical: 5,
  },
  badgeGreen: {
    backgroundColor: '#e8f3ea',
    color: '#3e6e45',
  },
  badgeRed: {
    backgroundColor: '#f9e9ec',
    color: '#8f1d2c',
  },
  badgeAmber: {
    backgroundColor: '#fff7e6',
    color: '#8a5a00',
  },
  badgeGray: {
    backgroundColor: '#ececef',
    color: '#686868',
  },
  sectionLabel: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '900',
    marginTop: 3,
  },
  paragraph: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  doseText: {
    color: '#211f1f',
    fontSize: 16,
    fontWeight: '900',
    lineHeight: 22,
  },
  bullet: {
    color: '#211f1f',
    fontSize: 14,
    lineHeight: 20,
  },
  sourceNote: {
    color: '#8f1d2c',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
  },
  footer: {
    color: '#686868',
    fontSize: 12,
    fontWeight: '700',
    textAlign: 'center',
  },
});
