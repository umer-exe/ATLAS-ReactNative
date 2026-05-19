import { StyleSheet, Text } from 'react-native';

import AppCard from './AppCard';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';

export default function ScreenHero({ eyebrow, title, subtitle, children, style }) {
  return (
    <AppCard style={[styles.card, style]}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      {children}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    gap: spacing.sm,
  },
  eyebrow: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    color: colors.textLight,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    lineHeight: 22,
  },
});
