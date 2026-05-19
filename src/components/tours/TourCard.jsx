import { Pressable, StyleSheet, Text, View } from 'react-native';

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import AppBadge from '../ui/AppBadge';
import AppButton from '../ui/AppButton';
import AppCard from '../ui/AppCard';

export default function TourCard({ tour, onPress }) {
  return (
    <AppCard style={styles.card}>
      <Pressable onPress={onPress} style={styles.content}>
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageText}>{tour.images.imageName}</Text>
        </View>
        <AppBadge label={tour.type} tone={tour.type === 'domestic' ? 'success' : 'default'} />
        <View style={styles.copy}>
          <Text style={styles.title}>{tour.title}</Text>
          <Text style={styles.meta}>{tour.location}</Text>
          <Text style={styles.meta}>{tour.duration}</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.price}>{tour.formattedPrice}</Text>
          <AppButton label="View Details" onPress={onPress} style={styles.button} />
        </View>
      </Pressable>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.md,
  },
  content: {
    gap: spacing.md,
  },
  imagePlaceholder: {
    height: 168,
    borderRadius: 16,
    backgroundColor: colors.primaryDark,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  imageText: {
    color: colors.surface,
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  copy: {
    gap: spacing.xs,
  },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  meta: {
    color: colors.textMuted,
    fontSize: 14,
  },
  footer: {
    gap: spacing.sm,
  },
  price: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '800',
  },
  button: {
    width: '100%',
  },
});
