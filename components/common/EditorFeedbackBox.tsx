import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { AccessSession } from '../../data/accessControl';

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

export function EditorFeedbackBox({
  moduleTitle,
  session,
}: {
  moduleTitle: string;
  session: AccessSession;
}) {
  const [clinicalRole, setClinicalRole] = useState(roleOptions[0]);
  const [editIntent, setEditIntent] = useState(editOptions[1]);
  const [feedback, setFeedback] = useState('');
  const [suggestedEdit, setSuggestedEdit] = useState('');
  const [sourceNote, setSourceNote] = useState('');
  const [copied, setCopied] = useState(false);

  const feedbackText = [
    `Sol Açık editör feedback`,
    `Modül: ${moduleTitle}`,
    `Kullanıcı: ${session.displayName}`,
    `Uygulama rolü: ${session.roleLabel}`,
    `Klinik rol: ${clinicalRole}`,
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

  return (
    <View style={styles.box}>
      <View style={styles.header}>
        <Text style={styles.title}>Editör feedback alanı</Text>
        <Text style={styles.badge}>{session.role === 'admin' ? 'Admin' : 'Editör'}</Text>
      </View>
      <Text style={styles.help}>
        Bu sarı alan yalnızca admin/editör görünümünde çıkar. Hasta kimliği yazmayın;
        eleştiri, öneri ve kaynak notunu kopyalayıp klinik editör sorumlusuna iletin.
      </Text>

      <OptionRow options={roleOptions} selected={clinicalRole} onSelect={setClinicalRole} />
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

      <Pressable
        accessibilityRole="button"
        onPress={copyFeedback}
        style={({ pressed }) => [styles.copyButton, pressed ? styles.pressed : undefined]}
      >
        <Text style={styles.copyText}>{copied ? 'Feedback kopyalandı' : 'Feedback metnini kopyala'}</Text>
      </Pressable>
    </View>
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
  copyButton: {
    alignItems: 'center',
    backgroundColor: '#8a5a00',
    borderRadius: 8,
    minHeight: 40,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  copyText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.72,
  },
});
