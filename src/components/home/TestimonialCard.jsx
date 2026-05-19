import { StyleSheet, Text, View } from 'react-native';

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import AppCard from '../ui/AppCard';

const initialsFromName = (name) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function TestimonialCard({ testimonial }) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initialsFromName(testimonial.name)}</Text>
        </View>
        <View style={styles.meta}>
          <Text style={styles.name}>{testimonial.name}</Text>
          <Text style={styles.location}>{testimonial.location}</Text>
        </View>
      </View>
      <Text style={styles.stars}>★★★★★</Text>
      <Text style={styles.quote}>{testimonial.quote}</Text>
      <Text style={styles.trip}>{testimonial.trip}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '800',
  },
  meta: {
    gap: 2,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  location: {
    color: colors.textMuted,
    fontSize: 13,
  },
  stars: {
    color: colors.accent,
    fontSize: 14,
    letterSpacing: 1,
  },
  quote: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
  },
  trip: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '700',
  },
});
