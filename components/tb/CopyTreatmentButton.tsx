import * as Clipboard from 'expo-clipboard';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { tbColors } from './theme';

export function CopyTreatmentButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await Clipboard.setStringAsync(text);
    setCopied(true);
  }

  return (
    <View style={styles.wrap}>
      <Pressable
        accessibilityRole="button"
        onPress={handleCopy}
        style={({ pressed }) => [styles.button, pressed ? styles.pressed : undefined]}
      >
        <Text style={styles.buttonText}>
          {copied ? 'Tedavi şeması kopyalandı' : 'Tedavi şemasını metin olarak kopyala'}
        </Text>
      </Pressable>
      <Text style={styles.note}>
        Kopyalanan metin hasta kimliği içermez; klinik karar yerine geçmez.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 7,
  },
  button: {
    alignItems: 'center',
    backgroundColor: tbColors.accent,
    borderRadius: 8,
    minHeight: 46,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  buttonText: {
    color: tbColors.white,
    fontSize: 14,
    fontWeight: '900',
    textAlign: 'center',
  },
  note: {
    color: tbColors.muted,
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
  },
  pressed: {
    opacity: 0.72,
  },
});
