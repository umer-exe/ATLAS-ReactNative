import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import AppBadge from '../components/ui/AppBadge';
import AppCard from '../components/ui/AppCard';
import AppScreen from '../components/ui/AppScreen';
import SectionTitle from '../components/ui/SectionTitle';
import { useTheme } from '../context/ThemeContext';
import { toursData } from '../data/toursData';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

const defaultTour = toursData[1];

export default function OrderConfirmationScreen() {
  const { brandName, footerLinks, supportPhone } = useTheme();
  const cart = useSelector((state) => state.cart);
  const selectedTour =
    toursData.find((item) => item.slug === cart.selectedTourSlug) ?? defaultTour;
  const customerName = `${cart.customerInfo.firstName || 'Muhammad'} ${cart.customerInfo.lastName || 'Ali'}`;
  const fullAddress = cart.customerInfo.address
    ? `${cart.customerInfo.address}, ${cart.customerInfo.city || 'City not provided'}, ${cart.customerInfo.country || 'Country not provided'}`
    : 'Address not provided';
  const totalAmount = `$${(selectedTour.price * cart.quantity).toLocaleString()}`;

  return (
    <AppScreen scrollable>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.logo}>{brandName}</Text>
          <Text style={styles.topHint}>Confirmation</Text>
        </View>

        <AppCard style={styles.confirmationCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.headerTitle}>Order Confirmation</Text>
            <Text style={styles.orderNumber}>Order #AT-{String(cart.quantity).padStart(2, '0')}427</Text>
          </View>

          <AppBadge label="Confirmed" tone="success" />

          <SectionTitle
            eyebrow="Customer Information"
            subtitle="Your booking details are saved in this frontend-only confirmation flow."
            title={customerName}
          />
          <View style={styles.infoStack}>
            <Text style={styles.infoRow}>Email: {cart.customerInfo.email || 'traveler@example.com'}</Text>
            <Text style={styles.infoRow}>Phone: {cart.customerInfo.phone || '+92 300 1234567'}</Text>
            <Text style={styles.infoRow}>
              Payment Method: {cart.paymentMethod === 'card' ? 'Card On Delivery' : 'Cash On Delivery'}
            </Text>
            <Text style={styles.infoRow}>Address: {fullAddress}</Text>
          </View>

          <SectionTitle
            eyebrow="Tour Details"
            subtitle="A condensed summary inspired by the website confirmation card."
            title={selectedTour.title}
          />
          <View style={styles.tourRow}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageText}>{selectedTour.images.imageName}</Text>
            </View>
            <View style={styles.tourCopy}>
              <Text style={styles.tourMeta}>{selectedTour.location}</Text>
              <Text style={styles.tourMeta}>Departure: {cart.departureDate}</Text>
              <Text style={styles.tourMeta}>{selectedTour.duration}</Text>
              <Text style={styles.tourMeta}>Travelers: {cart.quantity}</Text>
              <AppBadge label={`${selectedTour.type} tour`} tone={selectedTour.type === 'domestic' ? 'success' : 'default'} />
            </View>
          </View>

          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>{totalAmount}</Text>
          </View>

          <SectionTitle
            eyebrow="What's Next"
            subtitle="The next-step guidance mirrors the reassurance shown on the original site."
            title="What happens after confirmation"
          />
          <View style={styles.nextSteps}>
            <Text style={styles.step}>- Our travel team will review your booking details.</Text>
            <Text style={styles.step}>- You will receive a follow-up call or email for departure coordination.</Text>
            <Text style={styles.step}>- Payment and final itinerary details will be confirmed before travel.</Text>
          </View>
        </AppCard>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>{brandName}</Text>
          <Text style={styles.footerText}>Thank you for choosing Atlas Tours for your next journey.</Text>
          <Text style={styles.footerLinks}>{footerLinks}</Text>
          <Text style={styles.footerText}>Phone: {supportPhone}</Text>
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
  topHint: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  confirmationCard: {
    gap: spacing.lg,
  },
  cardHeader: {
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  orderNumber: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  infoStack: {
    gap: spacing.xs,
  },
  infoRow: {
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 22,
  },
  tourRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: spacing.md,
  },
  imagePlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.sm,
  },
  imageText: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  tourCopy: {
    flex: 1,
    minWidth: 180,
    gap: spacing.xs,
  },
  tourMeta: {
    color: colors.textSoft,
    fontSize: 14,
  },
  totalCard: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
    borderWidth: 1,
    borderRadius: 16,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  totalLabel: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  totalValue: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: '800',
  },
  nextSteps: {
    gap: spacing.sm,
  },
  step: {
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
