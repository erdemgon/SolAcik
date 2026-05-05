import { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  calculatePalivizumabDose,
  getInfluenzaRecommendation,
  getPneumococcalQuickNote,
  getRsvRecommendation,
  influenzaCards,
  pneumococcalCards,
  respiratoryImmunizationSource,
  riskProfiles,
  rsvCards,
  type RespiratoryImmunizationInput,
  type RiskProfile,
  type RsvSeasonContext,
} from '../data/prevention/respiratoryImmunizationGuide';
import { Pressable } from 'react-native';

type TabKey = 'hesap' | 'pnomokok' | 'rsv' | 'grip' | 'kaynak';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'hesap', label: 'Hızlı Hesap' },
  { key: 'pnomokok', label: 'Pnömokok' },
  { key: 'rsv', label: 'RSV mAb' },
  { key: 'grip', label: 'Grip' },
  { key: 'kaynak', label: 'Kaynak' },
];

const rsvSeasonOptions: { key: RsvSeasonContext; label: string }[] = [
  { key: 'first_season', label: 'İlk RSV sezonu' },
  { key: 'second_season', label: 'İkinci RSV sezonu' },
  { key: 'out_of_scope', label: 'Sezon dışı / belirsiz' },
];

export function RespiratoryImmunizationScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('hesap');
  const [ageMonthsText, setAgeMonthsText] = useState('');
  const [weightText, setWeightText] = useState('');
  const [riskProfile, setRiskProfile] = useState<RiskProfile>('none');
  const [receivedTwoPriorFluDoses, setReceivedTwoPriorFluDoses] = useState(false);
  const [rsvSeasonContext, setRsvSeasonContext] = useState<RsvSeasonContext>('first_season');

  const input: RespiratoryImmunizationInput = useMemo(
    () => ({
      ageMonths: parseNumber(ageMonthsText),
      weightKg: parseNumber(weightText),
      riskProfile,
      receivedTwoPriorFluDoses,
      rsvSeasonContext,
    }),
    [ageMonthsText, receivedTwoPriorFluDoses, riskProfile, rsvSeasonContext, weightText],
  );

  const palivizumab = calculatePalivizumabDose(input.weightKg);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Koruyucu solunum sağlığı</Text>
        <Text style={styles.title}>Aşılar ve Monoklonal Antikorlar</Text>
        <Text style={styles.description}>
          Pnömokok, influenza ve RSV monoklonal antikorları için yaş, risk ve kilo
          temelli hızlı hatırlatıcı. Girişler kalıcı saklanmaz.
        </Text>
      </View>

      <SourceVersionBadge text={respiratoryImmunizationSource.badge} />
      <WarningBox text={respiratoryImmunizationSource.warning} />

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

      {activeTab === 'hesap' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Girdi</Text>
            <View style={styles.inputGrid}>
              <InputBox
                label="Yaş, ay"
                onChangeText={setAgeMonthsText}
                placeholder="örn. 7"
                value={ageMonthsText}
              />
              <InputBox
                label="Kilo, kg"
                onChangeText={setWeightText}
                placeholder="opsiyonel"
                value={weightText}
              />
            </View>
            <Text style={styles.subTitle}>Risk grubu</Text>
            <View style={styles.chipWrap}>
              {riskProfiles.map((profile) => (
                <Chip
                  key={profile.key}
                  label={profile.label}
                  selected={riskProfile === profile.key}
                  onPress={() => setRiskProfile(profile.key)}
                />
              ))}
            </View>
            <Text style={styles.helperText}>
              {riskProfiles.find((item) => item.key === riskProfile)?.note}
            </Text>
          </View>

          <View style={styles.panel}>
            <Text style={styles.panelTitle}>RSV sezon bağlamı</Text>
            <View style={styles.chipWrap}>
              {rsvSeasonOptions.map((option) => (
                <Chip
                  key={option.key}
                  label={option.label}
                  selected={rsvSeasonContext === option.key}
                  onPress={() => setRsvSeasonContext(option.key)}
                />
              ))}
            </View>
          </View>

          <Pressable
            accessibilityRole="checkbox"
            accessibilityState={{ checked: receivedTwoPriorFluDoses }}
            onPress={() => setReceivedTwoPriorFluDoses((value) => !value)}
            style={styles.checkRow}
          >
            <View style={[styles.checkbox, receivedTwoPriorFluDoses && styles.checkboxChecked]}>
              {receivedTwoPriorFluDoses ? <Text style={styles.checkMark}>✓</Text> : null}
            </View>
            <Text style={styles.checkText}>
              Daha önce toplam en az 2 influenza aşı dozu aldı
            </Text>
          </Pressable>

          <QuickResultCard title="Pnömokok hızlı notu" text={getPneumococcalQuickNote(input)} />
          <QuickResultCard title="RSV monoklonal antikor" text={getRsvRecommendation(input)} />
          <QuickResultCard title="Grip aşısı" text={getInfluenzaRecommendation(input)} />

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Palivizumab doz hatırlatıcı</Text>
            {palivizumab ? (
              <>
                <Text style={styles.bigDose}>{palivizumab.doseMg} mg IM</Text>
                <Text style={styles.cardText}>
                  15 mg/kg aylık doz; 100 mg/mL form varsayımıyla yaklaşık {palivizumab.volumeMl} mL.
                </Text>
                {palivizumab.splitDose ? (
                  <Text style={styles.warningText}>
                    Hacim yüksek görünüyor; enjeksiyon bölgesi ve ürün talimatı ile doğrula.
                  </Text>
                ) : null}
              </>
            ) : (
              <Text style={styles.cardText}>Kilo girildiğinde 15 mg/kg dozu hesaplanır.</Text>
            )}
          </View>
        </>
      ) : null}

      {activeTab === 'pnomokok' ? (
        <>
          {pneumococcalCards.map((card) => (
            <InfoCard
              key={card.title}
              title={card.title}
              rows={[
                ['Rol', card.role],
                ['Doz', card.dose],
                ['Şema', card.schedule],
                ['Aralık', card.interval],
                ['Türkiye notu', card.turkeyNote],
              ]}
            />
          ))}
        </>
      ) : null}

      {activeTab === 'rsv' ? (
        <>
          {rsvCards.map((card) => (
            <InfoCard
              key={card.title}
              title={`${card.title} (${card.brands})`}
              rows={[
                ['Rol', card.role],
                ['Doz', card.dose],
                ['Zamanlama', card.interval],
                ['Not', card.note],
              ]}
            />
          ))}
        </>
      ) : null}

      {activeTab === 'grip' ? (
        <>
          {influenzaCards.map((card) => (
            <InfoCard
              key={card.title}
              title={card.title}
              rows={[
                ['Doz', card.dose],
                ['Şema', card.schedule],
                ['Not', card.note],
              ]}
            />
          ))}
        </>
      ) : null}

      {activeTab === 'kaynak' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Kaynaklar</Text>
            {respiratoryImmunizationSource.sourceLinks.map((source) => (
              <View key={source.url} style={styles.sourceBox}>
                <Text style={styles.sourceTitle}>{source.title}</Text>
                <Text style={styles.sourceUrl}>{source.url}</Text>
              </View>
            ))}
          </View>
          <WarningBox
            tone="amber"
            title="Güncelleme gerektirir"
            text="RSV sezonu, grip sezonu, ürün ruhsatları, PCV20/PPSV23 erişimi ve geri ödeme koşulları yıllara göre değişebilir. Bu veri dosyası düzenli güncellenmelidir."
          />
        </>
      ) : null}

      <Text style={styles.footer}>
        Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
      </Text>
    </ScrollView>
  );
}

function QuickResultCard({ title, text }: { title: string; text: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{text}</Text>
    </View>
  );
}

function InfoCard({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{title}</Text>
      {rows.map(([label, value]) => (
        <View key={label} style={styles.infoRow}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValue}>{value}</Text>
        </View>
      ))}
    </View>
  );
}

function InputBox({
  label,
  value,
  placeholder,
  onChangeText,
}: {
  label: string;
  value: string;
  placeholder: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.inputWrap}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        keyboardType="decimal-pad"
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8a8a8a"
        style={styles.input}
        value={value}
      />
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
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{label}</Text>
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
    paddingBottom: 32,
    gap: 14,
  },
  intro: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: '#efe3e5',
  },
  kicker: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
  },
  title: {
    color: '#211f1f',
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 30,
  },
  description: {
    color: '#5d5658',
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  panel: {
    backgroundColor: '#f7f7f8',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e7e2e3',
    gap: 10,
  },
  panelTitle: {
    color: '#211f1f',
    fontSize: 18,
    fontWeight: '900',
  },
  subTitle: {
    color: '#302b2c',
    fontSize: 14,
    fontWeight: '900',
  },
  inputGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  inputWrap: {
    minWidth: 132,
    flexGrow: 1,
    flexBasis: '45%',
    gap: 6,
  },
  inputLabel: {
    color: '#4b4446',
    fontSize: 13,
    fontWeight: '800',
  },
  input: {
    minHeight: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dfd7d8',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    color: '#211f1f',
    fontSize: 15,
  },
  helperText: {
    color: '#6b6264',
    fontSize: 13,
    lineHeight: 19,
  },
  chipWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    minHeight: 42,
    justifyContent: 'center',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#e3d6d8',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  chipText: {
    color: '#4b4446',
    fontSize: 14,
    fontWeight: '800',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
  checkRow: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ece4e5',
    flexDirection: 'row',
    gap: 10,
    padding: 14,
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#cdbfc2',
    backgroundColor: '#ffffff',
  },
  checkboxChecked: {
    backgroundColor: '#8f1d2c',
    borderColor: '#8f1d2c',
  },
  checkMark: {
    color: '#ffffff',
    fontWeight: '900',
  },
  checkText: {
    color: '#302b2c',
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ece4e5',
    padding: 16,
    gap: 9,
  },
  cardTitle: {
    color: '#211f1f',
    fontSize: 18,
    fontWeight: '900',
  },
  cardText: {
    color: '#4d4648',
    fontSize: 14,
    lineHeight: 21,
  },
  bigDose: {
    color: '#8f1d2c',
    fontSize: 25,
    fontWeight: '900',
  },
  warningText: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
  },
  infoRow: {
    gap: 3,
  },
  infoLabel: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '900',
  },
  infoValue: {
    color: '#4d4648',
    fontSize: 14,
    lineHeight: 21,
  },
  sourceBox: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ece4e5',
    gap: 4,
  },
  sourceTitle: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  sourceUrl: {
    color: '#8f1d2c',
    fontSize: 12,
    lineHeight: 18,
  },
  footer: {
    color: '#7d7476',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
});
