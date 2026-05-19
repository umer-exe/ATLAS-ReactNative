import { Pressable, StyleSheet, Text } from 'react-native';

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';

export default function AppButton({ label, onPress, variant = 'primary', style, textStyle }) {
  const buttonStyle = variant === 'secondary' ? styles.secondaryButton : styles.primaryButton;
  const labelStyle = variant === 'secondary' ? styles.secondaryLabel : styles.primaryLabel;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.baseButton, buttonStyle, pressed && styles.pressed, style]}
    >
      <Text numberOfLines={2} style={[styles.baseLabel, labelStyle, textStyle]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    minHeight: 48,
    borderRadius: 14,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pressed: {
    opacity: 0.9,
  },
  baseLabel: {
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    textAlign: 'center',
  },
  primaryLabel: {
    color: colors.surface,
  },
  secondaryLabel: {
    color: colors.primaryDark,
  },
});
