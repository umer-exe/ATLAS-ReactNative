import { ScrollView, StyleSheet, Text, View } from 'react-native';

import AppBadge from '../components/ui/AppBadge';
import AppButton from '../components/ui/AppButton';
import AppCard from '../components/ui/AppCard';
import AppInput from '../components/ui/AppInput';
import AppScreen from '../components/ui/AppScreen';
import SectionTitle from '../components/ui/SectionTitle';
import { toursData } from '../data/toursData';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

const buildItinerary = (tour) =>
  tour.highlights.map((highlight, index) => ({
    id: `${tour.slug}-day-${index + 1}`,
    day: `Day ${index + 1}`,
    title: highlight,
    description: `Planned experience for ${tour.title.toLowerCase()} with guided support, local coordination, and time to explore at a comfortable mobile-app-friendly pace.`,
  }));

export default function TourDetailScreen({ navigation, route }) {
  const routeTitle = route.params?.tourTitle;
  const tour =
    toursData.find((item) => item.title === routeTitle) ??
    toursData.find((item) => item.slug === route.params?.slug) ??
    toursData[0];
  const itinerary = buildItinerary(tour);

  return (
    <AppScreen scrollable>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.logo}>Atlas Tours</Text>
          <AppBadge label="Tour Detail" />
        </View>

        <AppCard style={styles.heroCard}>
          <Text style={styles.heroImageHint}>{tour.images.imageName}</Text>
          <AppBadge label={`${tour.type} tour`} tone={tour.type === 'domestic' ? 'success' : 'default'} />
          <Text style={styles.heroTitle}>{tour.title}</Text>
          <Text style={styles.heroMeta}>{tour.location}</Text>
          <Text style={styles.heroMeta}>{tour.duration}</Text>
          <Text style={styles.heroPrice}>{tour.formattedPrice}</Text>
        </AppCard>

        <AppCard style={styles.overviewCard}>
          <SectionTitle
            eyebrow="Overview"
            title="About this journey"
            subtitle="A simplified mobile version of the overview content shown on the website detail page."
          />
          <Text style={styles.bodyText}>{tour.overview}</Text>
        </AppCard>

        <AppCard style={styles.galleryCard}>
          <SectionTitle
            eyebrow="Photo Gallery"
            title="Trip moments"
            subtitle="Real gallery images can be connected later through `assets/images/tours/`."
          />
          <View style={styles.galleryGrid}>
            {[tour.images.imageName, `${tour.slug}-view-1.jpg`, `${tour.slug}-view-2.jpg`].map((imageName) => (
              <View key={imageName} style={styles.galleryItem}>
                <Text style={styles.galleryText}>{imageName}</Text>
              </View>
            ))}
          </View>
        </AppCard>

        <AppCard style={styles.bookingCard}>
          <SectionTitle
            eyebrow="Booking"
            title="Reserve your spot"
            subtitle="Static inputs only for now. Real checkout behavior comes later."
          />
          <View style={styles.bookingHeader}>
            <Text style={styles.bookingPrice}>{tour.formattedPrice}</Text>
            <Text style={styles.bookingSubtext}>Starting price per traveler</Text>
          </View>
          <AppInput label="Departure Date" placeholder="Select a departure date" value="" />
          <AppInput label="Number of Travelers" placeholder="2" value="" />
          <AppButton
            label="Add to Cart"
            onPress={() => navigation.getParent()?.getParent()?.navigate('CartStack')}
          />
          <View style={styles.helpBox}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>Phone: +92 300 1234567</Text>
            <Text style={styles.helpText}>WhatsApp support available during office hours</Text>
          </View>
        </AppCard>

        <AppCard style={styles.itineraryCard}>
          <SectionTitle
            eyebrow="Detailed Itinerary"
            title="Day by day plan"
            subtitle="The desktop site shows a richer itinerary, so this mobile version keeps each day readable and stacked."
          />
          <View style={styles.sectionStack}>
            {itinerary.map((item) => (
              <View key={item.id} style={styles.itineraryItem}>
                <AppBadge label={item.day} tone="accent" />
                <Text style={styles.itineraryTitle}>{item.title}</Text>
                <Text style={styles.bodyText}>{item.description}</Text>
              </View>
            ))}
          </View>
        </AppCard>

        <AppCard style={styles.highlightsCard}>
          <SectionTitle
            eyebrow="Highlights"
            title="Why travelers pick this tour"
            subtitle="A simple checklist keeps the content easy to scan on mobile."
          />
          <View style={styles.sectionStack}>
            {tour.highlights.map((highlight) => (
              <View key={highlight} style={styles.highlightRow}>
                <Text style={styles.highlightIcon}>•</Text>
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>
        </AppCard>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>Atlas Tours</Text>
          <Text style={styles.footerText}>Trusted travel planning for domestic and international journeys.</Text>
          <Text style={styles.footerLinks}>Home  •  Tours  •  Contact  •  Cart</Text>
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
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    color: colors.navy,
    fontSize: 24,
    fontWeight: '800',
  },
  heroCard: {
    backgroundColor: colors.primaryDark,
    borderColor: colors.primaryDark,
    gap: spacing.sm,
  },
  heroImageHint: {
    color: 'rgba(255,255,255,0.74)',
    fontSize: 13,
    marginBottom: spacing.sm,
  },
  heroTitle: {
    color: colors.textLight,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
  },
  heroMeta: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
  },
  heroPrice: {
    color: '#FDE68A',
    fontSize: 28,
    fontWeight: '800',
    marginTop: spacing.xs,
  },
  overviewCard: {
    gap: spacing.md,
  },
  galleryCard: {
    gap: spacing.md,
  },
  galleryGrid: {
    gap: spacing.sm,
  },
  galleryItem: {
    minHeight: 112,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
  },
  galleryText: {
    color: colors.primaryDark,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  bookingCard: {
    gap: spacing.md,
  },
  bookingHeader: {
    gap: 4,
  },
  bookingPrice: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '800',
  },
  bookingSubtext: {
    color: colors.textMuted,
    fontSize: 14,
  },
  helpBox: {
    borderRadius: 14,
    backgroundColor: colors.softSurface,
    padding: spacing.md,
    gap: spacing.xs,
  },
  helpTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  helpText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  itineraryCard: {
    gap: spacing.md,
  },
  sectionStack: {
    gap: spacing.md,
  },
  itineraryItem: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itineraryTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  bodyText: {
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 23,
  },
  highlightsCard: {
    gap: spacing.md,
  },
  highlightRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  highlightIcon: {
    color: colors.primary,
    fontSize: 20,
    lineHeight: 22,
  },
  highlightText: {
    flex: 1,
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    borderRadius: 18,
    backgroundColor: colors.navy,
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
