import { StyleSheet, Text, View } from 'react-native';

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import AppCard from '../ui/AppCard';

export default function DestinationCard({ destination }) {
  return (
    <AppCard style={styles.card}>
      <View style={styles.imagePlaceholder}>
        <Text style={styles.locationHint}>{destination.imageName}</Text>
      </View>
      <View style={styles.overlay}>
        <Text style={styles.title}>{destination.title}</Text>
        <Text style={styles.location}>{destination.location}</Text>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.sm,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: 180,
    borderRadius: 14,
    backgroundColor: '#4338ca',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  locationHint: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 13,
  },
  overlay: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.lg,
    left: spacing.lg,
    gap: 4,
  },
  title: {
    color: colors.surface,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
  },
  location: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 14,
    lineHeight: 20,
  },
});
