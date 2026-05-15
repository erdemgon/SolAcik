import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import type { AccessSession } from '../../data/accessControl';
import { submitEditorFeedback } from '../../services/editorFeedbackClient';

const roleOptions = [
  'Çocuk göğüs uzmanı',
  'Çocuk göğüs yan dal asistanı',
  'Çocuk alerji/immünoloji',
  'Çocuk enfeksiyon',
  'Çocuk yoğun bakım',
  'Genel pediatri',
  'Diğer',
];

const editOptions = ['Ben düzenlemek isterim', 'Sadece öneri bırakıyorum'];

const contributionAreas = [
  'Astım',
  'Kistik fibrozis',
  'Tüberküloz',
  'Bronkoskopi / BAL',
  'Girişimsel işlemler',
  'Solunum teknolojileri',
  'Enfeksiyonlar',
  'Normal değerler / laboratuvar',
  'İlaç / doz',
  'Genel kullanılabilirlik',
  'Diğer',
];

export function EditorFeedbackBox({
  moduleTitle,
  session,
}: {
  moduleTitle: string;
  session: AccessSession;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [clinicalRole, setClinicalRole] = useState(roleOptions[0]);
  const [contributionArea, setContributionArea] = useState(contributionAreas[9]);
  const [editIntent, setEditIntent] = useState(editOptions[1]);
  const [feedback, setFeedback] = useState('');
  const [suggestedEdit, setSuggestedEdit] = useState('');
  const [sourceNote, setSourceNote] = useState('');
  const [copied, setCopied] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const feedbackText = [
    `Sol Açık editör feedback`,
    `Modül: ${moduleTitle}`,
    `Kullanıcı: ${session.displayName}`,
    `Uygulama rolü: ${session.roleLabel}`,
    `Klinik rol: ${clinicalRole}`,
    `Katkı alanı: ${contributionArea}`,
    `Düzenleme niyeti: ${editIntent}`,
    `Eleştiri/sorun: ${feedback.trim() || '-'}`,
    `Önerilen düzenleme: ${suggestedEdit.trim() || '-'}`,
    `Kaynak/gerekçe: ${sourceNote.trim() || '-'}`,
    'Not: Bu feedback klinik editör sorumlusu tarafından onaylanmadan uygulama içeriğine dönüşmez.',
  ].join('\n');

  async function copyFeedback() {
    await Clipboard.setStringAsync(feedbackText);
    setCopied(true);
  }

  async function sendFeedback() {
    if (!feedback.trim() && !suggestedEdit.trim()) {
      setSubmitStatus('error');
      setSubmitMessage('En azından eleştiri/sorun veya önerilen düzenleme alanını doldurun.');
      return;
    }

    setSubmitStatus('sending');
    setSubmitMessage('');

    try {
      await submitEditorFeedback({
        appRole: session.roleLabel,
        clinicalRole,
        commandText: feedbackText,
        contributionArea,
        editIntent,
        feedback: feedback.trim() || '-',
        moduleTitle,
        sourceNote: sourceNote.trim() || '-',
        suggestedEdit: suggestedEdit.trim() || '-',
        userName: session.displayName,
      });
      setSubmitStatus('sent');
      setSubmitMessage('Feedback kaydedildi. Teşekkürler.');
      setCopied(false);
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Feedback gönderilemedi.');
    }
  }

  if (!isOpen) {
    return (
      <View style={styles.collapsedBox}>
        <Text style={styles.collapsedText}>
          Bu modül için editör notu bırakmak isterseniz feedback alanını açabilirsiniz.
        </Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => setIsOpen(true)}
          style={({ pressed }) => [styles.openButton, pressed ? styles.pressed : undefined]}
        >
          <Text style={styles.openButtonText}>Feedback vermek istiyorum</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <View style={styles.collapsedBox}>
        <Text style={styles.collapsedText}>Feedback formu açık.</Text>
        <Pressable
          accessibilityRole="button"
          onPress={() => setIsOpen(false)}
          style={({ pressed }) => [styles.openButton, pressed ? styles.pressed : undefined]}
        >
          <Text style={styles.openButtonText}>Feedback alanını kapat</Text>
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
        transparent
        visible={isOpen}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <ScrollView
              contentContainerStyle={styles.modalScrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator
            >
              <View style={styles.header}>
                <Text style={styles.title}>Editör feedback alanı</Text>
                <Text style={styles.badge}>{session.role === 'admin' ? 'Admin' : 'Editör'}</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                onPress={() => setIsOpen(false)}
                style={({ pressed }) => [styles.closeButton, pressed ? styles.pressed : undefined]}
              >
                <Text style={styles.closeButtonText}>Feedback alanını kapat</Text>
              </Pressable>
              <Text style={styles.help}>
                Bu sarı alan yalnızca admin/editör görünümünde çıkar. Hasta kimliği yazmayın;
                eleştiri, öneri ve kaynak notu doğrudan editör havuzuna kaydedilir.
              </Text>

              <OptionRow options={roleOptions} selected={clinicalRole} onSelect={setClinicalRole} />
              <View style={styles.sectionBlock}>
                <Text style={styles.label}>Katkı vermek istediğiniz alan</Text>
                <OptionRow
                  options={contributionAreas}
                  selected={contributionArea}
                  onSelect={setContributionArea}
                />
              </View>
              <OptionRow options={editOptions} selected={editIntent} onSelect={setEditIntent} />

              <InputBlock
                label="Eleştiri / sorun"
                placeholder="Bu modülde ne eksik, hatalı veya belirsiz?"
                value={feedback}
                onChangeText={setFeedback}
              />
              <InputBlock
                label="Önerilen düzenleme"
                placeholder="Nasıl yazılsın veya hangi alan değişsin?"
                value={suggestedEdit}
                onChangeText={setSuggestedEdit}
              />
              <InputBlock
                label="Kaynak / gerekçe"
                placeholder="Kılavuz, makale, KÜB/KT veya kurum protokol notu"
                value={sourceNote}
                onChangeText={setSourceNote}
              />

              {submitMessage ? (
                <Text style={[styles.statusText, submitStatus === 'error' ? styles.errorText : styles.successText]}>
                  {submitMessage}
                </Text>
              ) : null}

              <View style={styles.actionRow}>
                <Pressable
                  accessibilityRole="button"
                  disabled={submitStatus === 'sending'}
                  onPress={sendFeedback}
                  style={({ pressed }) => [
                    styles.submitButton,
                    submitStatus === 'sending' ? styles.disabledButton : undefined,
                    pressed ? styles.pressed : undefined,
                  ]}
                >
                  <Text style={styles.submitText}>
                    {submitStatus === 'sending' ? 'Gönderiliyor...' : 'Feedback gönder'}
                  </Text>
                </Pressable>
                <Pressable
                  accessibilityRole="button"
                  onPress={copyFeedback}
                  style={({ pressed }) => [styles.copyButton, pressed ? styles.pressed : undefined]}
                >
                  <Text style={styles.copyText}>{copied ? 'Kopyalandı' : 'Yedek kopyala'}</Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </>
  );
}

function OptionRow({
  options,
  selected,
  onSelect,
}: {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <View style={styles.options}>
      {options.map((option) => (
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: selected === option }}
          key={option}
          onPress={() => onSelect(option)}
          style={[styles.chip, selected === option ? styles.chipSelected : undefined]}
        >
          <Text style={[styles.chipText, selected === option ? styles.chipTextSelected : undefined]}>
            {option}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

function InputBlock({
  label,
  placeholder,
  value,
  onChangeText,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
}) {
  return (
    <View style={styles.inputBlock}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        multiline
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#8a8a8a"
        style={styles.input}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  collapsedBox: {
    alignItems: 'center',
    backgroundColor: '#fff7e6',
    borderColor: '#f0c36a',
    borderRadius: 8,
    borderWidth: 1,
    gap: 8,
    marginHorizontal: 18,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  collapsedText: {
    color: '#5d5658',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 17,
    textAlign: 'center',
  },
  openButton: {
    backgroundColor: '#8a5a00',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 9,
  },
  openButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '900',
  },
  box: {
    backgroundColor: '#fff7e6',
    borderColor: '#f0c36a',
    borderRadius: 8,
    borderWidth: 1,
    gap: 10,
    marginHorizontal: 18,
    marginTop: 10,
    padding: 12,
  },
  modalOverlay: {
    backgroundColor: 'rgba(33, 31, 31, 0.28)',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 12,
  },
  modalCard: {
    backgroundColor: '#fff7e6',
    borderColor: '#f0c36a',
    borderRadius: 12,
    borderWidth: 1,
    maxHeight: '88%',
    overflow: 'hidden',
  },
  modalScrollContent: {
    gap: 10,
    padding: 12,
    paddingBottom: 22,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
  },
  title: {
    color: '#8a5a00',
    fontSize: 14,
    fontWeight: '900',
  },
  badge: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    color: '#8a5a00',
    fontSize: 11,
    fontWeight: '900',
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  closeButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
    borderColor: '#e4c26d',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  closeButtonText: {
    color: '#8a5a00',
    fontSize: 12,
    fontWeight: '900',
  },
  help: {
    color: '#5d5658',
    fontSize: 12,
    lineHeight: 17,
  },
  options: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  chip: {
    backgroundColor: '#ffffff',
    borderColor: '#e4c26d',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 9,
    paddingVertical: 7,
  },
  chipSelected: {
    backgroundColor: '#8a5a00',
    borderColor: '#8a5a00',
  },
  chipText: {
    color: '#5d5658',
    fontSize: 12,
    fontWeight: '800',
  },
  chipTextSelected: {
    color: '#ffffff',
  },
  inputBlock: {
    gap: 5,
  },
  sectionBlock: {
    gap: 6,
  },
  label: {
    color: '#8a5a00',
    fontSize: 12,
    fontWeight: '900',
  },
  input: {
    backgroundColor: '#ffffff',
    borderColor: '#e4c26d',
    borderRadius: 8,
    borderWidth: 1,
    color: '#211f1f',
    fontSize: 13,
    minHeight: 68,
    paddingHorizontal: 10,
    paddingVertical: 8,
    textAlignVertical: 'top',
  },
  actionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  submitButton: {
    alignItems: 'center',
    backgroundColor: '#8a5a00',
    borderRadius: 8,
    flexGrow: 1,
    minHeight: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
  copyButton: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#8a5a00',
    borderRadius: 8,
    borderWidth: 1,
    flexGrow: 1,
    minHeight: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  copyText: {
    color: '#8a5a00',
    fontSize: 13,
    fontWeight: '900',
  },
  disabledButton: {
    opacity: 0.55,
  },
  statusText: {
    borderRadius: 8,
    fontSize: 12,
    fontWeight: '900',
    lineHeight: 17,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  successText: {
    backgroundColor: '#ecfdf3',
    color: '#166534',
  },
  errorText: {
    backgroundColor: '#fff1f2',
    color: '#9f1239',
  },
  pressed: {
    opacity: 0.72,
  },
});
