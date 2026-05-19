import { StyleSheet, Text, View } from 'react-native';

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';

export default function SectionTitle({ eyebrow, title, subtitle, rightContent, tone = 'default' }) {
  const isInverse = tone === 'inverse';

  return (
    <View style={styles.header}>
      <View style={styles.copy}>
        {eyebrow ? <Text style={[styles.eyebrow, isInverse && styles.inverseEyebrow]}>{eyebrow}</Text> : null}
        <Text style={[styles.title, isInverse && styles.inverseTitle]}>{title}</Text>
        {subtitle ? <Text style={[styles.subtitle, isInverse && styles.inverseSubtitle]}>{subtitle}</Text> : null}
      </View>
      {rightContent}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },
  copy: {
    gap: spacing.xs,
  },
  eyebrow: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    lineHeight: 30,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  inverseEyebrow: {
    color: 'rgba(255,255,255,0.84)',
  },
  inverseTitle: {
    color: colors.textLight,
  },
  inverseSubtitle: {
    color: 'rgba(255,255,255,0.9)',
  },
});
