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
          <Text numberOfLines={1} style={styles.name}>{testimonial.name}</Text>
          <Text numberOfLines={1} style={styles.location}>{testimonial.location}</Text>
        </View>
      </View>
      <Text style={styles.stars}>{'\u2605'.repeat(testimonial.rating ?? 5)}</Text>
      <Text ellipsizeMode="tail" numberOfLines={4} style={styles.quote}>{testimonial.quote}</Text>
      <Text numberOfLines={1} style={styles.trip}>{testimonial.trip}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.md,
    width: '100%',
    height: 248,
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
    flex: 1,
    gap: 2,
  },
  name: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 22,
  },
  location: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
  },
  stars: {
    color: colors.accent,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 2,
    lineHeight: 22,
  },
  quote: {
    flex: 1,
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
