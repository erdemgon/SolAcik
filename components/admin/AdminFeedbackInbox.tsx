import * as Clipboard from 'expo-clipboard';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  fetchEditorFeedback,
  updateEditorFeedbackStatus,
} from '../../services/editorFeedbackClient';
import type { EditorFeedbackRecord, EditorFeedbackStatus } from '../../types/editorFeedback';

const statusLabels: Record<EditorFeedbackStatus, string> = {
  accepted: 'Kabul',
  done: 'Tamamlandı',
  pending: 'Bekliyor',
  rejected: 'Reddedildi',
};

const statusOptions: EditorFeedbackStatus[] = ['pending', 'accepted', 'rejected', 'done'];

export function AdminFeedbackInbox() {
  const [items, setItems] = useState<EditorFeedbackRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    void loadFeedback();
  }, []);

  async function loadFeedback() {
    setLoading(true);
    setMessage('');
    try {
      const rows = await fetchEditorFeedback();
      setItems(rows);
      setMessage(rows.length ? `${rows.length} feedback kaydı yüklendi.` : 'Henüz feedback kaydı yok.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Feedback listesi alınamadı.');
    } finally {
      setLoading(false);
    }
  }

  async function copyCommand(item: EditorFeedbackRecord) {
    await Clipboard.setStringAsync(item.commandText);
    setMessage(`${item.moduleTitle} için Codex komutu kopyalandı.`);
  }

  async function copyAllFeedback() {
    const backup = [
      `Sol Açık editör feedback yedeği`,
      `Kayıt sayısı: ${items.length}`,
      `Dışa aktarma: ${new Date().toLocaleString('tr-TR')}`,
      '',
      ...items.map((item, index) => formatFeedbackForBackup(item, index + 1)),
      '',
      'JSON:',
      JSON.stringify(items, null, 2),
    ].join('\n');

    await Clipboard.setStringAsync(backup);
    setMessage(`${items.length} feedback kaydı panoya kopyalandı.`);
  }

  async function changeStatus(item: EditorFeedbackRecord, status: EditorFeedbackStatus) {
    setUpdatingId(item.id);
    setMessage('');
    try {
      const updated = await updateEditorFeedbackStatus({ id: item.id, status });
      setItems((current) => current.map((row) => (row.id === item.id ? updated : row)));
      setMessage(`Durum güncellendi: ${statusLabels[status]}.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Feedback durumu güncellenemedi.');
    } finally {
      setUpdatingId(null);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.introCard}>
        <Text style={styles.kicker}>Admin</Text>
        <Text style={styles.title}>Editör Feedback Gelen Kutusu</Text>
        <Text style={styles.description}>
          Editörlerin sarı feedback alanlarından gönderdiği notlar burada listelenir.
          Klinik içerik otomatik değişmez; uygun bulunan kayıtlar Codex’e komut olarak
          kopyalanıp ayrıca uygulanır.
        </Text>
        <View style={styles.actionRow}>
          <Pressable
            accessibilityRole="button"
            onPress={loadFeedback}
            style={({ pressed }) => [styles.primaryButton, styles.flexButton, pressed ? styles.pressed : undefined]}
          >
            <Text style={styles.primaryButtonText}>{loading ? 'Yükleniyor...' : 'Yenile'}</Text>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            disabled={items.length === 0}
            onPress={copyAllFeedback}
            style={({ pressed }) => [
              styles.secondaryButton,
              styles.flexButton,
              items.length === 0 ? styles.disabled : undefined,
              pressed ? styles.pressed : undefined,
            ]}
          >
            <Text style={styles.secondaryButtonText}>Tüm feedbackleri kopyala</Text>
          </Pressable>
        </View>
        {message ? <Text style={styles.message}>{message}</Text> : null}
      </View>

      {items.map((item) => (
        <View key={item.id} style={styles.feedbackCard}>
          <View style={styles.cardHeader}>
            <View style={styles.cardHeaderText}>
              <Text style={styles.moduleTitle}>{item.moduleTitle}</Text>
              <Text style={styles.meta}>
                {item.userName} · {item.clinicalRole} · {formatDate(item.createdAt)}
              </Text>
            </View>
            <Text style={[styles.statusBadge, statusStyle(item.status)]}>{statusLabels[item.status]}</Text>
          </View>

          <InfoLine label="Katkı alanı" value={item.contributionArea} />
          <InfoLine label="Düzenleme niyeti" value={item.editIntent} />
          <InfoLine label="Eleştiri / sorun" value={item.feedback} />
          <InfoLine label="Önerilen düzenleme" value={item.suggestedEdit} />
          <InfoLine label="Kaynak / gerekçe" value={item.sourceNote} />

          <View style={styles.actionRow}>
            <Pressable
              accessibilityRole="button"
              onPress={() => copyCommand(item)}
              style={({ pressed }) => [styles.primaryButton, styles.flexButton, pressed ? styles.pressed : undefined]}
            >
              <Text style={styles.primaryButtonText}>Codex komutunu kopyala</Text>
            </Pressable>
          </View>

          <View style={styles.statusRow}>
            {statusOptions.map((status) => (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected: item.status === status }}
                disabled={updatingId === item.id}
                key={status}
                onPress={() => changeStatus(item, status)}
                style={[
                  styles.statusButton,
                  item.status === status ? styles.statusButtonSelected : undefined,
                  updatingId === item.id ? styles.disabled : undefined,
                ]}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    item.status === status ? styles.statusButtonTextSelected : undefined,
                  ]}
                >
                  {statusLabels[status]}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoLine}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value || '-'}</Text>
    </View>
  );
}

function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString('tr-TR', {
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function formatFeedbackForBackup(item: EditorFeedbackRecord, index: number) {
  return [
    `--- #${index} ${item.moduleTitle} ---`,
    `ID: ${item.id}`,
    `Tarih: ${formatDate(item.createdAt)}`,
    `Durum: ${statusLabels[item.status]}`,
    `Kullanıcı: ${item.userName}`,
    `Uygulama rolü: ${item.appRole}`,
    `Klinik rol: ${item.clinicalRole}`,
    `Katkı alanı: ${item.contributionArea}`,
    `Düzenleme niyeti: ${item.editIntent}`,
    `Eleştiri/sorun: ${item.feedback}`,
    `Önerilen düzenleme: ${item.suggestedEdit}`,
    `Kaynak/gerekçe: ${item.sourceNote}`,
    `Codex komutu:\n${item.commandText}`,
  ].join('\n');
}

function statusStyle(status: EditorFeedbackStatus) {
  if (status === 'accepted') return styles.statusAccepted;
  if (status === 'done') return styles.statusDone;
  if (status === 'rejected') return styles.statusRejected;
  return styles.statusPending;
}

const ACCENT = '#8f1d2c';
const TEXT = '#211f1f';
const MUTED = '#686868';

const styles = StyleSheet.create({
  scrollContent: {
    gap: 14,
    padding: 18,
    paddingBottom: 34,
  },
  introCard: {
    backgroundColor: '#fff',
    borderColor: '#ececee',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 16,
  },
  kicker: {
    color: ACCENT,
    fontSize: 13,
    fontWeight: '900',
  },
  title: {
    color: TEXT,
    fontSize: 23,
    fontWeight: '900',
    lineHeight: 29,
  },
  description: {
    color: MUTED,
    fontSize: 14,
    lineHeight: 20,
  },
  message: {
    backgroundColor: '#fff7e6',
    borderColor: '#f0c36a',
    borderRadius: 8,
    borderWidth: 1,
    color: '#8a5a00',
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 17,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  feedbackCard: {
    backgroundColor: '#f7f7f8',
    borderColor: '#e7e7e9',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    padding: 14,
  },
  cardHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  cardHeaderText: {
    flex: 1,
    gap: 4,
  },
  moduleTitle: {
    color: TEXT,
    fontSize: 17,
    fontWeight: '900',
    lineHeight: 22,
  },
  meta: {
    color: MUTED,
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
  },
  statusBadge: {
    borderRadius: 999,
    fontSize: 11,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  statusPending: {
    backgroundColor: '#fff7e6',
    color: '#8a5a00',
  },
  statusAccepted: {
    backgroundColor: '#eef2ff',
    color: '#3730a3',
  },
  statusRejected: {
    backgroundColor: '#fff1f2',
    color: '#9f1239',
  },
  statusDone: {
    backgroundColor: '#ecfdf3',
    color: '#166534',
  },
  infoLine: {
    gap: 3,
  },
  infoLabel: {
    color: ACCENT,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  infoValue: {
    color: TEXT,
    fontSize: 14,
    lineHeight: 20,
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: ACCENT,
    borderRadius: 8,
    minHeight: 42,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  flexButton: {
    flexGrow: 1,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#fff7e6',
    borderColor: '#f0c36a',
    borderRadius: 8,
    borderWidth: 1,
    minHeight: 42,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  secondaryButtonText: {
    color: '#8a5a00',
    fontSize: 13,
    fontWeight: '900',
  },
  statusRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusButton: {
    backgroundColor: '#fff',
    borderColor: '#dfdfe3',
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  statusButtonSelected: {
    backgroundColor: ACCENT,
    borderColor: ACCENT,
  },
  statusButtonText: {
    color: TEXT,
    fontSize: 12,
    fontWeight: '900',
  },
  statusButtonTextSelected: {
    color: '#fff',
  },
  disabled: {
    opacity: 0.55,
  },
  pressed: {
    opacity: 0.72,
  },
});
