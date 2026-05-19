import { StyleSheet, Text, View } from 'react-native';

import AppBadge from '../components/ui/AppBadge';
import AppCard from '../components/ui/AppCard';
import AppScreen from '../components/ui/AppScreen';
import SectionTitle from '../components/ui/SectionTitle';
import { toursData } from '../data/toursData';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

const defaultTour = toursData[1];

export default function OrderConfirmationScreen({ route }) {
  const tourTitle = route.params?.tourTitle ?? defaultTour.title;
  const customerName = route.params?.customerName ?? 'Muhammad Ali';
  const totalAmount = route.params?.totalAmount ?? defaultTour.formattedPrice;
  const quantity = route.params?.quantity ?? 2;
  const paymentMethod = route.params?.paymentMethod ?? 'cash';

  return (
    <AppScreen scrollable>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.logo}>Atlas Tours</Text>
          <Text style={styles.topHint}>Confirmation</Text>
        </View>

        <AppCard style={styles.confirmationCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.headerTitle}>Order Confirmation</Text>
            <Text style={styles.orderNumber}>Order #AT-{String(quantity).padStart(2, '0')}427</Text>
          </View>

          <AppBadge label="Confirmed" tone="success" />

          <SectionTitle
            eyebrow="Customer Information"
            title={customerName}
            subtitle="Your booking details are saved in this static confirmation flow for the course project."
          />
          <View style={styles.infoStack}>
            <Text style={styles.infoRow}>Email: traveler@example.com</Text>
            <Text style={styles.infoRow}>Phone: +92 300 1234567</Text>
            <Text style={styles.infoRow}>Payment Method: {paymentMethod === 'card' ? 'Card On Delivery' : 'Cash On Delivery'}</Text>
            <Text style={styles.infoRow}>Address: Lahore, Pakistan</Text>
          </View>

          <SectionTitle
            eyebrow="Tour Details"
            title={tourTitle}
            subtitle="A condensed summary inspired by the website confirmation card."
          />
          <View style={styles.tourRow}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageText}>{defaultTour.images.imageName}</Text>
            </View>
            <View style={styles.tourCopy}>
              <Text style={styles.tourMeta}>{defaultTour.location}</Text>
              <Text style={styles.tourMeta}>Departure: Flexible planning</Text>
              <Text style={styles.tourMeta}>{defaultTour.duration}</Text>
              <Text style={styles.tourMeta}>Travelers: {quantity}</Text>
              <AppBadge label={`${defaultTour.type} tour`} tone={defaultTour.type === 'domestic' ? 'success' : 'default'} />
            </View>
          </View>

          <AppCard style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>{totalAmount}</Text>
          </AppCard>

          <SectionTitle
            eyebrow="What's Next"
            title="What happens after confirmation"
            subtitle="The next-step guidance mirrors the reassurance shown on the original site."
          />
          <View style={styles.nextSteps}>
            <Text style={styles.step}>• Our travel team will review your booking details.</Text>
            <Text style={styles.step}>• You will receive a follow-up call or email for departure coordination.</Text>
            <Text style={styles.step}>• Payment and final itinerary details will be confirmed before travel.</Text>
          </View>
        </AppCard>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>Atlas Tours</Text>
          <Text style={styles.footerText}>Thank you for choosing Atlas Tours for your next journey.</Text>
          <Text style={styles.footerLinks}>Home  •  Tours  •  Contact  •  Cart</Text>
          <Text style={styles.footerText}>Phone: +92 300 1234567</Text>
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
    gap: spacing.xs,
  },
  tourMeta: {
    color: colors.textSoft,
    fontSize: 14,
  },
  totalCard: {
    backgroundColor: colors.primaryLight,
    borderColor: colors.primaryLight,
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
