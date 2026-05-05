import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

export const CLINICAL_NOTE_SAFETY_SENTENCE =
  'Bu çıktı eğitim/checklist amaçlıdır; klinisyen tarafından resmi kaynak, kurum protokolü ve klinik bağlamla doğrulanmalıdır.';

export function CopyClinicalNoteButton({
  note,
  label = 'Klinik notu kopyala',
}: {
  note: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await Clipboard.setStringAsync(note);
    setCopied(true);
  }

  return (
    <Pressable
      accessibilityRole="button"
      onPress={handleCopy}
      style={({ pressed }) => [styles.button, pressed ? styles.pressed : undefined]}
    >
      <Text style={styles.text}>{copied ? 'Klinik not kopyalandı' : label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#8f1d2c',
    borderRadius: 8,
    minHeight: 42,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '900',
  },
  pressed: {
    opacity: 0.72,
  },
});
