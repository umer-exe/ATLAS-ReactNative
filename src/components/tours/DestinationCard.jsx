import { ImageBackground, StyleSheet, Text, View } from 'react-native';

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import AppCard from '../ui/AppCard';

export default function DestinationCard({ destination }) {
  return (
    <AppCard style={styles.card}>
      <ImageBackground
        imageStyle={styles.image}
        resizeMode="cover"
        source={destination.image}
        style={styles.imageBackground}
      >
        <View style={styles.scrim} />
        <View style={styles.overlay}>
          <Text style={styles.title}>{destination.title}</Text>
          <Text style={styles.location}>{destination.location}</Text>
        </View>
      </ImageBackground>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.sm,
    overflow: 'hidden',
  },
  imageBackground: {
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 14,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.38)',
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
