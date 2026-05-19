import { StyleSheet, Text, View } from 'react-native';

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';

export default function AppBadge({ label, tone = 'default', style, textStyle }) {
  const badgeStyle = tone === 'accent' ? styles.accent : tone === 'success' ? styles.success : styles.default;
  const labelStyle = tone === 'accent' ? styles.accentText : tone === 'success' ? styles.successText : styles.defaultText;

  return (
    <View style={[styles.base, badgeStyle, style]}>
      <Text style={[styles.text, labelStyle, textStyle]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  default: {
    backgroundColor: colors.primaryLight,
  },
  accent: {
    backgroundColor: '#fef3c7',
  },
  success: {
    backgroundColor: '#dcfce7',
  },
  text: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  defaultText: {
    color: colors.primary,
  },
  accentText: {
    color: '#92400e',
  },
  successText: {
    color: colors.success,
  },
});
