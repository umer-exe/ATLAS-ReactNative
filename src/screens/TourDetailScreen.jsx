import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

import AppBadge from '../components/ui/AppBadge';
import AppButton from '../components/ui/AppButton';
import AppCard from '../components/ui/AppCard';
import AppInput from '../components/ui/AppInput';
import AppScreen from '../components/ui/AppScreen';
import SectionTitle from '../components/ui/SectionTitle';
import { useTheme } from '../context/ThemeContext';
import { getDepartureDates, getTourBySlug, getTourReviews } from '../firebase/atlasFirebaseApi';
import { addCartItem } from '../store/cartSlice';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

const buildItinerary = (tour) =>
  tour.highlights.map((highlight, index) => ({
    id: `${tour.slug}-day-${index + 1}`,
    day: `Day ${index + 1}`,
    title: highlight,
    description: `Planned experience for ${tour.title.toLowerCase()} with guided support, local coordination, and time to explore at a comfortable mobile-friendly pace.`,
  }));

const formatDateLabel = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

export default function TourDetailScreen({ navigation, route }) {
  const dispatch = useDispatch();
  const { supportPhone } = useTheme();
  const [tour, setTour] = useState(null);
  const [departureDates, setDepartureDates] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [departureDate, setDepartureDate] = useState('');
  const [travelers, setTravelers] = useState('1');
  const [dataError, setDataError] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadTour = async () => {
      try {
        const routeSlug = route.params?.slug;
        const databaseTour = await getTourBySlug(routeSlug ?? 'discover-japan');

        if (!databaseTour) {
          if (mounted) {
            setDataError('This tour could not be found in Firebase.');
          }
          return;
        }

        const [dateItems, reviewItems] = await Promise.all([
          getDepartureDates(databaseTour.slug),
          getTourReviews(databaseTour.slug),
        ]);

        if (mounted) {
          setTour(databaseTour);
          setDepartureDates(dateItems);
          setReviews(reviewItems);
          setDepartureDate('');
          setTravelers('1');
          setDataError('');
        }
      } catch (error) {
        if (mounted) {
          setDataError(error.message || 'Firebase tour details could not be loaded.');
        }
      }
    };

    loadTour();

    return () => {
      mounted = false;
    };
  }, [route.params?.slug]);

  if (!tour) {
    return (
      <AppScreen>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>{dataError || 'Loading tour details...'}</Text>
        </View>
      </AppScreen>
    );
  }

  const itinerary = buildItinerary(tour);

  const addToCart = () => {
    const travelerCount = Math.max(1, Number(travelers) || 1);

    if (!departureDate) {
      Alert.alert('Select a date', 'Please choose one of the available departure dates before adding this tour.');
      return;
    }

    dispatch(
      addCartItem({
        tourId: tour.id,
        tourSlug: tour.slug,
        title: tour.title,
        location: tour.location,
        duration: tour.duration,
        price: tour.price,
        formattedPrice: tour.formattedPrice,
        type: tour.type,
        imageName: tour.images.imageName,
        departureDate,
        travelers: travelerCount,
      })
    );

    navigation.navigate('Cart');
  };

  const updateTravelers = (value) => {
    setTravelers(value.replace(/\D/g, ''));
  };

  return (
    <AppScreen scrollable>
      <View style={styles.container}>
        <AppCard style={styles.heroCard}>
          <Image resizeMode="cover" source={tour.images.hero} style={styles.heroImage} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroCopy}>
            <AppBadge label={`${tour.type} tour`} tone={tour.type === 'domestic' ? 'success' : 'default'} />
            <Text style={styles.heroTitle}>{tour.title}</Text>
            <Text style={styles.heroMeta}>{tour.location}</Text>
            <Text style={styles.heroMeta}>{tour.duration}</Text>
            <Text style={styles.heroPrice}>{tour.formattedPrice}</Text>
          </View>
        </AppCard>

        <AppCard style={styles.overviewCard}>
          <SectionTitle eyebrow="Overview" title="About this journey" />
          <Text style={styles.bodyText}>{tour.overview}</Text>
        </AppCard>

        <AppCard style={styles.galleryCard}>
          <SectionTitle eyebrow="Photo Gallery" title="Trip moments" />
          <View style={styles.galleryGrid}>
            {tour.images.gallery.map((imageSource, index) => (
              <Image
                key={`${tour.slug}-gallery-${index + 1}`}
                resizeMode="cover"
                source={imageSource}
                style={styles.galleryItem}
              />
            ))}
          </View>
        </AppCard>

        <AppCard style={styles.bookingCard}>
          <SectionTitle eyebrow="Booking" title="Reserve your spot" />
          <View style={styles.bookingHeader}>
            <Text style={styles.bookingPrice}>{tour.formattedPrice}</Text>
            <Text style={styles.bookingSubtext}>Starting price per traveler</Text>
          </View>

          <View style={styles.dateSection}>
            <Text style={styles.inputLabel}>Departure Date</Text>
            <View style={styles.dateGrid}>
              {departureDates.map((item) => {
                const selected = departureDate === item.date;

                return (
                  <Pressable
                    accessibilityRole="button"
                    key={item.id}
                    onPress={() => setDepartureDate(item.date)}
                    style={[styles.dateOption, selected && styles.selectedDateOption]}
                  >
                    <Text style={[styles.dateText, selected && styles.selectedDateText]}>
                      {formatDateLabel(item.date)}
                    </Text>
                    <Text style={[styles.seatsText, selected && styles.selectedSeatsText]}>
                      {item.seatsAvailable} seats
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <AppInput
            label="Number of Travelers"
            keyboardType="numeric"
            onChangeText={updateTravelers}
            placeholder="1"
            value={travelers}
          />
          <AppButton label="Add to Cart" onPress={addToCart} />
          <View style={styles.helpBox}>
            <Text style={styles.helpTitle}>Need Help?</Text>
            <Text style={styles.helpText}>Phone: {supportPhone}</Text>
            <Text style={styles.helpText}>WhatsApp support available during office hours</Text>
          </View>
        </AppCard>

        <AppCard style={styles.itineraryCard}>
          <SectionTitle eyebrow="Detailed Itinerary" title="Day by day plan" />
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
          <SectionTitle eyebrow="Highlights" title="Why travelers pick this tour" />
          <View style={styles.sectionStack}>
            {tour.highlights.map((highlight) => (
              <View key={highlight} style={styles.highlightRow}>
                <Text style={styles.highlightIcon}>-</Text>
                <Text style={styles.highlightText}>{highlight}</Text>
              </View>
            ))}
          </View>
        </AppCard>

        <AppCard style={styles.reviewsCard}>
          <SectionTitle eyebrow="Reviews" title="Traveler feedback" />
          <View style={styles.sectionStack}>
            {reviews.map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewName}>{review.name}</Text>
                  <Text style={styles.reviewStars}>{'\u2605'.repeat(review.rating)}</Text>
                </View>
                <Text style={styles.reviewLocation}>{review.location}</Text>
                <Text style={styles.bodyText}>{review.quote}</Text>
              </View>
            ))}
          </View>
        </AppCard>
      </View>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  loadingText: {
    color: colors.textMuted,
    fontSize: 15,
    fontWeight: '600',
  },
  container: {
    gap: spacing.xl,
    padding: spacing.lg,
  },
  heroCard: {
    minHeight: 320,
    overflow: 'hidden',
    padding: 0,
    borderColor: colors.primaryDark,
  },
  heroImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(49, 46, 129, 0.58)',
  },
  heroCopy: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: spacing.sm,
    padding: spacing.lg,
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
    width: '100%',
    height: 150,
    borderRadius: 16,
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
  dateSection: {
    gap: spacing.xs,
  },
  inputLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  dateGrid: {
    gap: spacing.sm,
  },
  dateOption: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: 2,
  },
  selectedDateOption: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  dateText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  selectedDateText: {
    color: colors.textLight,
  },
  seatsText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },
  selectedSeatsText: {
    color: 'rgba(255,255,255,0.86)',
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
  reviewsCard: {
    gap: spacing.md,
  },
  reviewItem: {
    gap: spacing.xs,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  reviewName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '800',
  },
  reviewStars: {
    color: colors.accent,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 2,
    lineHeight: 22,
  },
  reviewLocation: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: '600',
  },
});
