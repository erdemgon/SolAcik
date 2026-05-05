import * as Clipboard from 'expo-clipboard';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SourceVersionBadge } from '../components/common/SourceVersionBadge';
import { WarningBox } from '../components/common/WarningBox';
import {
  classifyImmunologyValue,
  getImmunologyRowsForAge,
  immunologyAnalytes,
  immunologyClinicalNotes,
  immunologyReferenceRows,
  immunologySource,
  type ImmunologyAnalyte,
  type ImmunologyReferenceRow,
} from '../data/reference/immunologyValues';
import {
  lymphocyteAgeLabels,
  lymphocyteSubsetRows,
  uploadedIgGSubclassRows,
  uploadedImmunologyTableSource,
  uploadedSerumIgRows,
} from '../data/reference/uploadedImmunologyTables';

type TabKey = 'age' | 'interpret' | 'table' | 'serumUploaded' | 'lymphocytes' | 'source';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'age', label: 'Yaşa Göre' },
  { key: 'interpret', label: 'Değer Yorumla' },
  { key: 'table', label: 'Tam Tablo' },
  { key: 'serumUploaded', label: 'Ek Serum Ig' },
  { key: 'lymphocytes', label: 'Lenfosit Alt Grup' },
  { key: 'source', label: 'Kaynak' },
];

const analyteLabels: Record<ImmunologyAnalyte, string> = {
  IgG: 'IgG',
  IgA: 'IgA',
  IgM: 'IgM',
  IgG1: 'IgG1',
  IgG2: 'IgG2',
  IgG3: 'IgG3',
  IgG4: 'IgG4',
};

export function ImmunologyReferenceScreen() {
  const [activeTab, setActiveTab] = useState<TabKey>('age');
  const [ageMonthsText, setAgeMonthsText] = useState('');
  const [measuredValues, setMeasuredValues] = useState<Partial<Record<ImmunologyAnalyte, string>>>({});

  const ageMonths = parseNumber(ageMonthsText);
  const rowsForAge = useMemo(() => getImmunologyRowsForAge(ageMonths), [ageMonths]);
  const rowsByAnalyte = useMemo(() => {
    const map = new Map<ImmunologyAnalyte, ImmunologyReferenceRow>();
    rowsForAge.forEach((row) => map.set(row.analyte, row));
    return map;
  }, [rowsForAge]);
  const ageWarning = getAgeWarning(ageMonths);

  const copySummary = async () => {
    const rowSummaries = rowsForAge
      .map((row) => {
        const measured = parseNumber(measuredValues[row.analyte] ?? '');
        const status = measured === null ? '' : `; girilen ${measured} mg/dL: ${classifyImmunologyValue(measured, row)}`;
        return `${row.analyte} ${row.minMgDl}-${row.maxMgDl} mg/dL${status}`;
      })
      .join('; ');
    await Clipboard.setStringAsync(
      `İmmünoloji referans özeti: Yaş ${ageMonths ?? '?'} ay. ${rowSummaries}. Bu çıktı tanı koymaz; laboratuvar referansı ve klinik bağlamla doğrulanmalıdır.`,
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.intro}>
        <Text style={styles.kicker}>Normal değerler</Text>
        <Text style={styles.title}>İmmünolojik Değerler: Yaşa Göre Türkiye Çocuk Referansları</Text>
        <Text style={styles.description}>
          IgG, IgA, IgM, IgG alt grupları ve periferik kan lenfosit alt grup
          referanslarını yaşa göre hızlı görüntüler. Girilen değerler kalıcı saklanmaz.
        </Text>
      </View>

      <SourceVersionBadge text={immunologySource.badge} />
      <WarningBox title="Klinik sınır" text={immunologySource.warning} />

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

      {activeTab === 'age' || activeTab === 'interpret' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Yaş girişi</Text>
            <TextInput
              keyboardType="decimal-pad"
              onChangeText={setAgeMonthsText}
              placeholder="Yaş, ay olarak"
              placeholderTextColor="#8a8a8a"
              style={styles.input}
              value={ageMonthsText}
            />
            <Text style={styles.helperText}>
              Örnek: 18 ay için 18, 7 yaş için 84 girin. Yaş ondalıklı girilebilir.
            </Text>
            {ageWarning ? <Text style={styles.warningText}>{ageWarning}</Text> : null}
          </View>

          {activeTab === 'interpret' ? (
            <View style={styles.panel}>
              <Text style={styles.panelTitle}>Girilen laboratuvar değerleri</Text>
              <View style={styles.inputGrid}>
                {immunologyAnalytes.map((analyte) => (
                  <View key={analyte} style={styles.smallInputWrap}>
                    <Text style={styles.inputLabel}>{analyteLabels[analyte]} mg/dL</Text>
                    <TextInput
                      keyboardType="decimal-pad"
                      onChangeText={(value) =>
                        setMeasuredValues((current) => ({ ...current, [analyte]: value }))
                      }
                      placeholder="Opsiyonel"
                      placeholderTextColor="#8a8a8a"
                      style={styles.smallInput}
                      value={measuredValues[analyte] ?? ''}
                    />
                  </View>
                ))}
              </View>
            </View>
          ) : null}

          {rowsForAge.length > 0 ? (
            <>
              <View style={styles.resultHeader}>
                <Text style={styles.resultHeaderTitle}>Yaş aralığı: {rowsForAge[0].ageLabel}</Text>
                <Pressable onPress={copySummary} style={styles.copyButton}>
                  <Text style={styles.copyButtonText}>Özeti kopyala</Text>
                </Pressable>
              </View>
              {immunologyAnalytes.map((analyte) => {
                const row = rowsByAnalyte.get(analyte);
                const measured = parseNumber(measuredValues[analyte] ?? '');
                return (
                  <ReferenceCard key={analyte} measuredValue={measured} row={row} />
                );
              })}
            </>
          ) : (
            <View style={styles.emptyCard}>
              <Text style={styles.emptyTitle}>Yaş girildiğinde referanslar burada gösterilir.</Text>
              <Text style={styles.emptyText}>
                Bu veri seti 0–18 yaş aralığını kapsar. IgG alt grup değerleri 25 ay ve
                üzeri için gösterilir.
              </Text>
            </View>
          )}
        </>
      ) : null}

      {activeTab === 'table' ? <FullReferenceTable /> : null}

      {activeTab === 'serumUploaded' ? (
        <>
          <WarningBox
            tone="amber"
            title="Ek tablo kaynağı"
            text={uploadedImmunologyTableSource.warning}
          />
          <UploadedSerumIgTable />
          <UploadedIgGSubclassTable />
        </>
      ) : null}

      {activeTab === 'lymphocytes' ? (
        <>
          <WarningBox
            tone="amber"
            title="Lenfosit alt grup uyarısı"
            text="Periferik kan lenfosit alt grup değerleri yaşa çok bağımlıdır. Mutlak sayı ve yüzde birlikte yorumlanmalı; akut enfeksiyon, steroid/immünsüpresyon, prematürite ve laboratuvar yöntemi dikkate alınmalıdır."
          />
          <LymphocyteSubsetTable />
        </>
      ) : null}

      {activeTab === 'source' ? (
        <>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Pratik notlar</Text>
            {immunologyClinicalNotes.map((note) => (
              <Text key={note} style={styles.bullet}>
                • {note}
              </Text>
            ))}
          </View>
          <SourceVersionBadge text={uploadedImmunologyTableSource.badge} />
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>Kaynaklar</Text>
            {immunologySource.sourceLinks.map((source) => (
              <View key={source.url} style={styles.sourceBox}>
                <Text style={styles.sourceTitle}>{source.title}</Text>
                <Text style={styles.sourceUrl}>{source.url}</Text>
              </View>
            ))}
            {uploadedImmunologyTableSource.sourceLinks.map((source) => (
              <View key={source.url} style={styles.sourceBox}>
                <Text style={styles.sourceTitle}>{source.title}</Text>
                <Text style={styles.sourceUrl}>{source.url}</Text>
              </View>
            ))}
          </View>
          <WarningBox
            title="Kullanım notu"
            text="Fonksiyonel immünoloji testleri bu sürüme bağlanmadı. Lenfosit alt grup ve serum immünoglobulin değerleri orijinal yayın/laboratuvar referansı ile doğrulanmalıdır."
          />
        </>
      ) : null}

      <Text style={styles.footer}>
        Sol Açık — Solunum için Açık Kaynak Çocuk Göğüs Klinik Asistanı
      </Text>
    </ScrollView>
  );
}

function ReferenceCard({
  row,
  measuredValue,
}: {
  row: ImmunologyReferenceRow | undefined;
  measuredValue: number | null;
}) {
  if (!row) {
    return (
      <View style={styles.cardMuted}>
        <Text style={styles.cardTitle}>IgG alt grup</Text>
        <Text style={styles.cardText}>
          Bu yaş için IgG alt grup referansı yok. Bu veri setinde alt grup değerleri 25 ay
          ve üzeri çocuklarda verilmiştir.
        </Text>
      </View>
    );
  }

  const status = measuredValue === null ? null : classifyImmunologyValue(measuredValue, row);

  return (
    <View style={styles.card}>
      <View style={styles.cardTop}>
        <Text style={styles.cardTitle}>{row.analyte}</Text>
        {status ? <StatusBadge status={status} /> : null}
      </View>
      <Text style={styles.rangeText}>
        {formatValue(row.minMgDl)}–{formatValue(row.maxMgDl)} mg/dL
      </Text>
      <Text style={styles.cardText}>Ortalama: {formatValue(row.meanMgDl)} mg/dL</Text>
      {measuredValue !== null ? (
        <Text style={styles.measuredText}>
          Girilen değer: {formatValue(measuredValue)} mg/dL — {status}
        </Text>
      ) : (
        <Text style={styles.cardText}>Değer girilirse yaş aralığına göre durum gösterilir.</Text>
      )}
    </View>
  );
}

function UploadedSerumIgTable() {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Sağlıklı Türk çocuklarında serum Ig değerleri</Text>
      <Text style={styles.helperText}>mg/dL; hücrelerde ana değer ve parantezli aralıklar gösterilir.</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.ageCell]}>Yaş</Text>
            <Text style={styles.wideTableCell}>IgG</Text>
            <Text style={styles.wideTableCell}>IgM</Text>
            <Text style={styles.wideTableCell}>IgA</Text>
          </View>
          {uploadedSerumIgRows.map((row) => (
            <View key={row.ageLabel} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.ageCell]}>{row.ageLabel}</Text>
              <Text style={styles.wideTableCell}>{row.igG}</Text>
              <Text style={styles.wideTableCell}>{row.igM}</Text>
              <Text style={styles.wideTableCell}>{row.igA}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function UploadedIgGSubclassTable() {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Serum IgG alt grup değerleri</Text>
      <Text style={styles.helperText}>
        mg/dL. Gönderilen IgG4 başlıklı görseldeki sayılar Bayram 2019 IgG3
        tablosu ile uyumlu göründüğü için IgG4 burada tekrar gösterilmedi; doğrulanmış
        IgG4 değerleri ana tabloda yer alır.
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.ageCell]}>Yaş</Text>
            <Text style={styles.wideTableCell}>IgG1</Text>
            <Text style={styles.wideTableCell}>IgG2</Text>
            <Text style={styles.wideTableCell}>IgG3</Text>
          </View>
          {uploadedIgGSubclassRows.map((row) => (
            <View key={row.ageLabel} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.ageCell]}>{row.ageLabel}</Text>
              <Text style={styles.wideTableCell}>{row.igG1}</Text>
              <Text style={styles.wideTableCell}>{row.igG2}</Text>
              <Text style={styles.wideTableCell}>{row.igG3}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function LymphocyteSubsetTable() {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Periferik kan lenfosit alt grupları</Text>
      <Text style={styles.helperText}>Medyan ve min–maks değerleri. # birimi hücre/µL olarak yorumlanır.</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={styles.markerCell}>Parametre</Text>
            <Text style={styles.unitCell}>Birim</Text>
            {lymphocyteAgeLabels.map((label) => (
              <Text key={label} style={styles.lymphCell}>{label}</Text>
            ))}
          </View>
          {lymphocyteSubsetRows.map((row) => (
            <View key={`${row.marker}-${row.unit}`} style={styles.tableRow}>
              <Text style={styles.markerCell}>{row.marker}</Text>
              <Text style={styles.unitCell}>{row.unit}</Text>
              {row.values.map((value, index) => (
                <Text key={`${row.marker}-${index}`} style={styles.lymphCell}>{value}</Text>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function FullReferenceTable() {
  return (
    <View style={styles.panel}>
      <Text style={styles.panelTitle}>Tam referans tablo</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator>
        <View>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.ageCell]}>Yaş</Text>
            <Text style={[styles.tableCell, styles.analyteCell]}>Parametre</Text>
            <Text style={styles.tableCell}>Ortalama</Text>
            <Text style={styles.tableCell}>Min</Text>
            <Text style={styles.tableCell}>Maks</Text>
          </View>
          {immunologyReferenceRows.map((row) => (
            <View key={`${row.ageLabel}-${row.analyte}`} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.ageCell]}>{row.ageLabel}</Text>
              <Text style={[styles.tableCell, styles.analyteCell]}>{row.analyte}</Text>
              <Text style={styles.tableCell}>{formatValue(row.meanMgDl)}</Text>
              <Text style={styles.tableCell}>{formatValue(row.minMgDl)}</Text>
              <Text style={styles.tableCell}>{formatValue(row.maxMgDl)}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
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

function StatusBadge({ status }: { status: string }) {
  const isNormal = status === 'Referans aralıkta';
  return (
    <View style={[styles.badge, isNormal ? styles.badgeGreen : styles.badgeAmber]}>
      <Text style={[styles.badgeText, isNormal ? styles.badgeTextGreen : styles.badgeTextAmber]}>
        {status}
      </Text>
    </View>
  );
}

function parseNumber(value: string) {
  if (!value.trim()) return null;
  const normalized = value.replace(',', '.');
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatValue(value: number) {
  return Number.isInteger(value) ? String(value) : value.toFixed(2).replace(/\.?0+$/, '');
}

function getAgeWarning(ageMonths: number | null) {
  if (ageMonths === null) return null;
  if (ageMonths < 0) return 'Yaş negatif olamaz.';
  if (ageMonths > 216) {
    return 'Bu Türkiye pediatrik veri seti 18 yaşa kadar verilmiştir; erişkin referans aralığı ayrı değerlendirilmelidir.';
  }
  return null;
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
  input: {
    minHeight: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#dfd7d8',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    color: '#211f1f',
    fontSize: 16,
  },
  helperText: {
    color: '#6b6264',
    fontSize: 13,
    lineHeight: 19,
  },
  warningText: {
    color: '#8f1d2c',
    fontSize: 13,
    fontWeight: '800',
    lineHeight: 19,
  },
  inputGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  smallInputWrap: {
    minWidth: 132,
    flexGrow: 1,
    flexBasis: '30%',
    gap: 6,
  },
  inputLabel: {
    color: '#4b4446',
    fontSize: 13,
    fontWeight: '800',
  },
  smallInput: {
    minHeight: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#dfd7d8',
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    color: '#211f1f',
    fontSize: 15,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  resultHeaderTitle: {
    color: '#211f1f',
    flex: 1,
    fontSize: 17,
    fontWeight: '900',
  },
  copyButton: {
    borderRadius: 999,
    backgroundColor: '#8f1d2c',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  copyButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ece4e5',
    padding: 16,
    gap: 7,
  },
  cardMuted: {
    backgroundColor: '#f1f1f2',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#e1dcdd',
    padding: 16,
    gap: 7,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  cardTitle: {
    color: '#211f1f',
    fontSize: 18,
    fontWeight: '900',
  },
  rangeText: {
    color: '#8f1d2c',
    fontSize: 22,
    fontWeight: '900',
  },
  cardText: {
    color: '#5d5658',
    fontSize: 14,
    lineHeight: 20,
  },
  measuredText: {
    color: '#211f1f',
    fontSize: 14,
    fontWeight: '800',
    lineHeight: 20,
  },
  badge: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  badgeGreen: {
    backgroundColor: '#e8f5ed',
  },
  badgeAmber: {
    backgroundColor: '#fff4db',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '900',
  },
  badgeTextGreen: {
    color: '#1d6b3a',
  },
  badgeTextAmber: {
    color: '#8a5a00',
  },
  emptyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ece4e5',
  },
  emptyTitle: {
    color: '#211f1f',
    fontSize: 17,
    fontWeight: '900',
  },
  emptyText: {
    color: '#5d5658',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  bullet: {
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
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5ddde',
    backgroundColor: '#ffffff',
  },
  tableHeader: {
    backgroundColor: '#f5e7ea',
  },
  tableCell: {
    width: 104,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#302b2c',
    fontSize: 13,
    fontWeight: '700',
  },
  wideTableCell: {
    width: 190,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#302b2c',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },
  markerCell: {
    width: 180,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#302b2c',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
  },
  unitCell: {
    width: 56,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#302b2c',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
  },
  lymphCell: {
    width: 140,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: '#302b2c',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 17,
  },
  ageCell: {
    width: 112,
  },
  analyteCell: {
    width: 92,
  },
  footer: {
    color: '#7d7476',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 6,
  },
});
