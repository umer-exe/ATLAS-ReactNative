import { ScrollView, StyleSheet, Text, View } from 'react-native';

import TestimonialCard from '../components/home/TestimonialCard';
import DestinationCard from '../components/tours/DestinationCard';
import TourCard from '../components/tours/TourCard';
import AppButton from '../components/ui/AppButton';
import AppCard from '../components/ui/AppCard';
import AppScreen from '../components/ui/AppScreen';
import ScreenHeader from '../components/ui/ScreenHeader';
import ScreenHero from '../components/ui/ScreenHero';
import SectionTitle from '../components/ui/SectionTitle';
import { useTheme } from '../context/ThemeContext';
import { destinationsData, featuredTours } from '../data/toursData';
import { testimonialsData } from '../data/testimonialsData';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

export default function HomeScreen({ navigation }) {
  const { brandName, supportEmail, supportPhone, footerLinks } = useTheme();

  return (
    <AppScreen scrollable>
      <View style={styles.container}>
        <ScreenHeader brandName={brandName} pageLabel="Home" />

        <ScreenHero
          eyebrow="Curated journeys across Pakistan and beyond"
          title="Discover Your Next Adventure"
          subtitle="Explore international escapes and memorable local tours designed for travelers who want something polished, simple, and easy to book on mobile."
        >
          <View style={styles.heroActions}>
            <AppButton
              label="International Tours"
              onPress={() => navigation.navigate('Tours')}
              style={styles.flexButton}
              textStyle={styles.heroButtonLabel}
            />
            <AppButton
              label="Domestic Tours"
              onPress={() => navigation.navigate('Tours')}
              style={styles.flexButton}
              textStyle={styles.secondaryHeroLabel}
              variant="secondary"
            />
          </View>
        </ScreenHero>

        <SectionTitle
          eyebrow="Featured Tours"
          subtitle="A mobile-first version of the website's featured tours section, with clean cards and quick detail access."
          title="Popular journeys worth saving"
        />
        <View style={styles.section}>
          {featuredTours.slice(0, 3).map((tour) => (
            <TourCard
              key={tour.id}
              onPress={() => navigation.navigate('TourDetail', { tourTitle: tour.title })}
              tour={tour}
            />
          ))}
          <AppButton label="View All Tours" onPress={() => navigation.navigate('Tours')} variant="secondary" />
        </View>

        <SectionTitle
          eyebrow="Top Destinations"
          subtitle="Destinations keep the darker image-overlay style from the web app while staying easy to scan on mobile."
          title="Around the world and close to home"
        />
        <ScrollView contentContainerStyle={styles.horizontalSection} horizontal showsHorizontalScrollIndicator={false}>
          {destinationsData.map((destination) => (
            <View key={destination.id} style={styles.horizontalCard}>
              <DestinationCard destination={destination} />
            </View>
          ))}
        </ScrollView>

        <SectionTitle
          eyebrow="Testimonials"
          subtitle="White cards, light hierarchy, and short reviews keep the section familiar to the existing Atlas brand."
          title="What travelers are saying"
        />
        <ScrollView contentContainerStyle={styles.horizontalSection} horizontal showsHorizontalScrollIndicator={false}>
          {testimonialsData.map((testimonial) => (
            <View key={testimonial.id} style={styles.testimonialCard}>
              <TestimonialCard testimonial={testimonial} />
            </View>
          ))}
        </ScrollView>

        <AppCard style={styles.ctaCard}>
          <Text style={styles.ctaEyebrow}>Ready to Start Your Journey?</Text>
          <Text style={styles.ctaTitle}>Let Atlas Tours help plan your next trip.</Text>
          <Text style={styles.ctaText}>
            Browse tour packages, compare destinations, and reach out when you are ready to book.
          </Text>
          <View style={styles.ctaActions}>
            <AppButton label="Contact Us" onPress={() => navigation.navigate('Contact')} style={styles.flexButton} />
            <AppButton label="Call Now" onPress={() => navigation.navigate('Contact')} style={styles.flexButton} variant="secondary" />
          </View>
        </AppCard>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>{brandName}</Text>
          <Text style={styles.footerText}>Explore trusted domestic and international travel experiences.</Text>
          <Text style={styles.footerLinks}>{footerLinks}</Text>
          <Text style={styles.footerText}>Phone: {supportPhone}</Text>
          <Text style={styles.footerText}>Email: {supportEmail}</Text>
        </View>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.xl,
    padding: spacing.lg,
  },
  heroActions: {
    gap: spacing.sm,
  },
  flexButton: {
    width: '100%',
  },
  heroButtonLabel: {
    color: colors.textLight,
  },
  secondaryHeroLabel: {
    color: colors.primaryDark,
  },
  section: {
    gap: spacing.md,
  },
  horizontalSection: {
    gap: spacing.md,
    paddingRight: spacing.lg,
  },
  horizontalCard: {
    width: 280,
  },
  testimonialCard: {
    width: 296,
  },
  ctaCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    gap: spacing.md,
  },
  ctaEyebrow: {
    color: 'rgba(255,255,255,0.84)',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  ctaTitle: {
    color: colors.textLight,
    fontSize: 26,
    fontWeight: '800',
    lineHeight: 32,
  },
  ctaText: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 15,
    lineHeight: 22,
  },
  ctaActions: {
    gap: spacing.sm,
  },
  footer: {
    backgroundColor: colors.navy,
    borderRadius: 18,
    padding: spacing.xl,
    gap: spacing.sm,
  },
  footerLogo: {
    color: colors.textLight,
    fontSize: 22,
    fontWeight: '800',
  },
  footerText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    lineHeight: 21,
  },
  footerLinks: {
    color: colors.textLight,
    fontSize: 14,
    fontWeight: '600',
  },
});
