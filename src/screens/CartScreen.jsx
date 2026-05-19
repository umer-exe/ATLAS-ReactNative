import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../components/ui/AppButton';
import AppCard from '../components/ui/AppCard';
import AppInput from '../components/ui/AppInput';
import AppScreen from '../components/ui/AppScreen';
import SectionTitle from '../components/ui/SectionTitle';
import { useTheme } from '../context/ThemeContext';
import { setCheckoutDetails, updateQuantity } from '../store/cartSlice';
import { toursData } from '../data/toursData';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const { brandName } = useTheme();
  const cart = useSelector((state) => state.cart);
  const selectedTour =
    toursData.find((item) => item.slug === cart.selectedTourSlug) ?? toursData[1];
  const [firstName, setFirstName] = useState(cart.customerInfo.firstName);
  const [lastName, setLastName] = useState(cart.customerInfo.lastName);
  const [email, setEmail] = useState(cart.customerInfo.email);
  const [phone, setPhone] = useState(cart.customerInfo.phone);
  const [address, setAddress] = useState(cart.customerInfo.address);
  const [city, setCity] = useState(cart.customerInfo.city);
  const [country, setCountry] = useState(cart.customerInfo.country);
  const [paymentMethod, setPaymentMethod] = useState(cart.paymentMethod);

  const totalAmount = selectedTour.price * cart.quantity;
  const formattedTotal = `$${totalAmount.toLocaleString()}`;

  const confirmBooking = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      Alert.alert('Missing information', 'Please fill in your first name, last name, and email before confirming.');
      return;
    }

    dispatch(
      setCheckoutDetails({
        customerInfo: {
          firstName,
          lastName,
          email,
          phone,
          address,
          city,
          country,
        },
        paymentMethod,
      })
    );

    navigation.navigate('OrderConfirmation');
  };

  const continueShopping = () => {
    navigation.getParent()?.navigate('MainTabs', { screen: 'Tours' });
  };

  return (
    <AppScreen scrollable>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.logo}>{brandName}</Text>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{cart.quantity}</Text>
          </View>
        </View>

        {cart.addedToCart ? (
          <AppCard style={styles.successCard}>
            <Text style={styles.successText}>Tour added to cart successfully</Text>
          </AppCard>
        ) : null}

        <AppCard style={styles.heroCard}>
          <Text style={styles.heroTitle}>Shopping Cart</Text>
          <Text style={styles.heroSubtitle}>Review your tours and complete your booking.</Text>
        </AppCard>

        <AppCard style={styles.formCard}>
          <SectionTitle
            eyebrow="Customer Information"
            subtitle="This stays simple for the course project, but still matches the shape of the website checkout."
            title="Who is traveling?"
          />
          <AppInput label="First Name" onChangeText={setFirstName} placeholder="First name" returnKeyType="next" value={firstName} />
          <AppInput label="Last Name" onChangeText={setLastName} placeholder="Last name" returnKeyType="next" value={lastName} />
          <AppInput
            autoCapitalize="none"
            keyboardType="email-address"
            label="Email Address"
            onChangeText={setEmail}
            placeholder="name@example.com"
            returnKeyType="next"
            value={email}
          />
          <AppInput
            keyboardType="phone-pad"
            label="Phone Number"
            onChangeText={setPhone}
            placeholder="+92 300 1234567"
            returnKeyType="next"
            value={phone}
          />
          <AppInput label="Address" multiline onChangeText={setAddress} placeholder="Street address" value={address} />
          <AppInput label="City" onChangeText={setCity} placeholder="Lahore" value={city} />
          <AppInput label="Country" onChangeText={setCountry} placeholder="Pakistan" value={country} />
        </AppCard>

        <AppCard style={styles.paymentCard}>
          <SectionTitle
            eyebrow="Payment Method"
            subtitle="No real payment flow is added here. These are presentation-only choices."
            title="Choose an option"
          />
          <View style={styles.optionStack}>
            <AppButton
              label="Cash On Delivery"
              onPress={() => setPaymentMethod('cash')}
              textStyle={paymentMethod === 'cash' ? styles.selectedLabel : undefined}
              variant={paymentMethod === 'cash' ? 'primary' : 'secondary'}
            />
            <AppButton
              label="Card On Delivery"
              onPress={() => setPaymentMethod('card')}
              textStyle={paymentMethod === 'card' ? styles.selectedLabel : undefined}
              variant={paymentMethod === 'card' ? 'primary' : 'secondary'}
            />
          </View>
        </AppCard>

        <AppCard style={styles.summaryCard}>
          <SectionTitle
            eyebrow="Order Summary"
            subtitle="A compact mobile summary of the package before booking confirmation."
            title="Your selected tour"
          />
          <View style={styles.tourPreview}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageText}>{selectedTour.images.imageName}</Text>
            </View>
            <View style={styles.tourCopy}>
              <Text style={styles.tourTitle}>{selectedTour.title}</Text>
              <Text style={styles.tourMeta}>{selectedTour.duration}</Text>
              <Text style={styles.tourMeta}>Departure: {cart.departureDate}</Text>
            </View>
          </View>

          <View style={styles.quantityRow}>
            <Text style={styles.quantityLabel}>Travelers</Text>
            <View style={styles.quantityControls}>
              <AppButton
                label="-"
                onPress={() => dispatch(updateQuantity(cart.quantity - 1))}
                style={styles.quantityButton}
                variant="secondary"
              />
              <Text style={styles.quantityValue}>{cart.quantity}</Text>
              <AppButton
                label="+"
                onPress={() => dispatch(updateQuantity(cart.quantity + 1))}
                style={styles.quantityButton}
                variant="secondary"
              />
            </View>
          </View>

          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>Tour Price</Text>
            <Text style={styles.summaryValue}>{selectedTour.formattedPrice}</Text>
          </View>
          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>{formattedTotal}</Text>
          </View>

          <AppButton label="Confirm Booking" onPress={confirmBooking} />
          <AppButton label="Continue Shopping" onPress={continueShopping} variant="secondary" />
          <Text style={styles.termsText}>By confirming, you agree to Atlas Tours booking terms and privacy guidance.</Text>
        </AppCard>
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
  cartBadge: {
    minWidth: 30,
    height: 30,
    borderRadius: 15,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartBadgeText: {
    color: colors.textLight,
    fontSize: 13,
    fontWeight: '800',
  },
  successCard: {
    backgroundColor: '#DCFCE7',
    borderColor: '#BBF7D0',
  },
  successText: {
    color: '#166534',
    fontSize: 14,
    fontWeight: '700',
  },
  heroCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    gap: spacing.sm,
  },
  heroTitle: {
    color: colors.textLight,
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 15,
    lineHeight: 22,
  },
  formCard: {
    gap: spacing.md,
  },
  paymentCard: {
    gap: spacing.md,
  },
  optionStack: {
    gap: spacing.sm,
  },
  selectedLabel: {
    color: colors.textLight,
  },
  summaryCard: {
    gap: spacing.md,
  },
  tourPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: 92,
    height: 92,
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
    gap: 4,
  },
  tourTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  tourMeta: {
    color: colors.textMuted,
    fontSize: 14,
  },
  quantityRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  quantityButton: {
    minWidth: 48,
  },
  quantityValue: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    minWidth: 20,
    textAlign: 'center',
  },
  summaryLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    color: colors.textMuted,
    fontSize: 15,
  },
  summaryValue: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  totalValue: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: '800',
  },
  termsText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
});
