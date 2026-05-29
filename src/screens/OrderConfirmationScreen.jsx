import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import AppBadge from '../components/ui/AppBadge';
import AppButton from '../components/ui/AppButton';
import AppCard from '../components/ui/AppCard';
import AppScreen from '../components/ui/AppScreen';
import ScreenHeader from '../components/ui/ScreenHeader';
import SectionTitle from '../components/ui/SectionTitle';
import { useTheme } from '../context/ThemeContext';
import { getOrderByNumber } from '../firebase/atlasFirebaseApi';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

export default function OrderConfirmationScreen({ navigation, route }) {
  const { brandName } = useTheme();
  const lastOrderNumber = useSelector((state) => state.cart.lastOrderNumber);
  const orderNumber = route.params?.orderNumber ?? lastOrderNumber;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(Boolean(orderNumber));
  const [dataError, setDataError] = useState('');

  useEffect(() => {
    let mounted = true;

    const loadOrder = async () => {
      if (!orderNumber) {
        setLoading(false);
        return;
      }

      try {
        const databaseOrder = await getOrderByNumber(orderNumber);

        if (mounted) {
          setOrder(databaseOrder);
          setDataError('');
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setDataError(error.message || 'Firebase order could not be loaded.');
          setLoading(false);
        }
      }
    };

    loadOrder();

    return () => {
      mounted = false;
    };
  }, [orderNumber]);

  const navigateHome = () => {
    navigation.navigate('MainTabs', { screen: 'Home' });
  };

  const navigateTours = () => {
    navigation.navigate('MainTabs', { screen: 'Tours' });
  };

  if (loading) {
    return (
      <AppScreen>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading confirmation...</Text>
        </View>
      </AppScreen>
    );
  }

  if (!order) {
    return (
      <AppScreen scrollable>
        <View style={styles.container}>
          <ScreenHeader brandName={brandName} pageLabel="Confirmation" />
          <AppCard style={styles.confirmationCard}>
            <Text style={styles.headerTitle}>No confirmed order found</Text>
            <Text style={styles.infoRow}>
              {dataError || 'Confirm a booking from the cart to create a saved order.'}
            </Text>
            <AppButton label="Browse Tours" onPress={navigateTours} />
          </AppCard>
        </View>
      </AppScreen>
    );
  }

  const customerName = `${order.customerInfo.firstName} ${order.customerInfo.lastName}`;
  const fullAddress = order.customerInfo.address
    ? `${order.customerInfo.address}, ${order.customerInfo.city || 'City not provided'}, ${order.customerInfo.country || 'Country not provided'}`
    : 'Address not provided';

  return (
    <AppScreen scrollable>
      <View style={styles.container}>
        <ScreenHeader brandName={brandName} pageLabel="Confirmation" />

        <AppCard style={styles.confirmationCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.headerTitle}>Order Confirmation</Text>
            <Text style={styles.orderNumber}>Order #{order.orderNumber}</Text>
          </View>

          <AppBadge label="Confirmed" tone="success" />

          <SectionTitle eyebrow="Customer Information" title={customerName} />
          <View style={styles.infoStack}>
            <Text style={styles.infoRow}>Email: {order.customerInfo.email}</Text>
            <Text style={styles.infoRow}>Phone: {order.customerInfo.phone || 'Phone not provided'}</Text>
            <Text style={styles.infoRow}>
              Payment Method: {order.paymentMethod === 'card' ? 'Card On Delivery' : 'Cash On Delivery'}
            </Text>
            <Text style={styles.infoRow}>Address: {fullAddress}</Text>
          </View>

          <SectionTitle eyebrow="Tour Details" title="Booked tours" />
          <View style={styles.itemsStack}>
            {order.items.map((item) => (
              <View key={item.id} style={styles.tourItem}>
                <Image resizeMode="cover" source={item.image} style={styles.tourImage} />
                <View style={styles.tourCopy}>
                  <Text style={styles.tourTitle}>{item.title}</Text>
                  <Text style={styles.tourMeta}>{item.location}</Text>
                  <Text style={styles.tourMeta}>Departure: {item.departureDate}</Text>
                  <Text style={styles.tourMeta}>{item.duration}</Text>
                  <Text style={styles.tourMeta}>Travelers: {item.travelers}</Text>
                  <AppBadge label={`${item.type} tour`} tone={item.type === 'domestic' ? 'success' : 'default'} />
                  <Text style={styles.lineTotal}>{item.formattedLineTotal}</Text>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.totalCard}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>{order.formattedTotal}</Text>
          </View>

          <SectionTitle eyebrow="What's Next" title="What happens after confirmation" />
          <View style={styles.nextSteps}>
            <Text style={styles.step}>- Our travel team will review your booking details.</Text>
            <Text style={styles.step}>- You will receive a follow-up call or email for departure coordination.</Text>
            <Text style={styles.step}>- Payment and final itinerary details will be confirmed before travel.</Text>
          </View>

          <View style={styles.actionButtons}>
            <AppButton label="Back to Home" onPress={navigateHome} />
            <AppButton label="Browse Tours" onPress={navigateTours} variant="secondary" />
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
  itemsStack: {
    gap: spacing.md,
  },
  tourItem: {
    gap: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tourImage: {
    width: '100%',
    height: 150,
    borderRadius: 16,
  },
  tourCopy: {
    gap: spacing.xs,
  },
  tourTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  tourMeta: {
    color: colors.textSoft,
    fontSize: 14,
  },
  lineTotal: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '800',
    marginTop: spacing.xs,
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
  actionButtons: {
    gap: spacing.sm,
  },
});
