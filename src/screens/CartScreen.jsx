import { useMemo, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import AppButton from '../components/ui/AppButton';
import AppCard from '../components/ui/AppCard';
import AppInput from '../components/ui/AppInput';
import AppScreen from '../components/ui/AppScreen';
import PhoneNumberInput, { formatPakistanPhone, sanitizePhoneDigits } from '../components/ui/PhoneNumberInput';
import SectionTitle from '../components/ui/SectionTitle';
import { useTheme } from '../context/ThemeContext';
import { getTourImageSource, formatPrice } from '../data/toursData';
import { createOrder } from '../firebase/atlasFirebaseApi';
import {
  removeCartItem,
  setCheckoutDetails,
  updateCartItemTravelers,
} from '../store/cartSlice';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import { emailValidationMessage, isAcceptedEmail, normalizeEmail } from '../utils/validation';

const locationOptions = [
  {
    country: 'Pakistan',
    cities: [
      'Lahore',
      'Karachi',
      'Islamabad',
      'Rawalpindi',
      'Faisalabad',
      'Multan',
      'Peshawar',
      'Quetta',
      'Sialkot',
      'Hyderabad',
      'Gujranwala',
      'Bahawalpur',
    ],
  },
];

const defaultLocation = locationOptions[0];

const getLocationOption = (country) =>
  locationOptions.find((option) => option.country === country) ?? defaultLocation;

const getInitialCountry = (savedCountry) =>
  locationOptions.some((option) => option.country === savedCountry)
    ? savedCountry
    : defaultLocation.country;

const getInitialCity = (country, savedCity) => {
  const option = getLocationOption(country);
  return option.cities.includes(savedCity) ? savedCity : '';
};

function OptionPicker({ label, onSelect, options, value }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.optionGrid}>
        {options.map((option) => {
          const selected = option === value;

          return (
            <Pressable
              accessibilityRole="button"
              key={option}
              onPress={() => onSelect(option)}
              style={[styles.optionChip, selected && styles.selectedOptionChip]}
            >
              <Text numberOfLines={1} style={[styles.optionText, selected && styles.selectedOptionText]}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export default function CartScreen({ navigation }) {
  const dispatch = useDispatch();
  const { brandName } = useTheme();
  const cart = useSelector((state) => state.cart);
  const initialCountry = getInitialCountry(cart.customerInfo.country);
  const [firstName, setFirstName] = useState(cart.customerInfo.firstName);
  const [lastName, setLastName] = useState(cart.customerInfo.lastName);
  const [email, setEmail] = useState(cart.customerInfo.email);
  const [phoneDigits, setPhoneDigits] = useState(sanitizePhoneDigits(cart.customerInfo.phone));
  const [address, setAddress] = useState(cart.customerInfo.address);
  const [country, setCountry] = useState(initialCountry);
  const [city, setCity] = useState(getInitialCity(initialCountry, cart.customerInfo.city));
  const [paymentMethod, setPaymentMethod] = useState(cart.paymentMethod);
  const [saving, setSaving] = useState(false);

  const totals = useMemo(
    () =>
      cart.items.reduce(
        (summary, item) => {
          const travelers = Number(item.travelers) || 1;
          const lineTotal = Number(item.price) * travelers;

          return {
            travelers: summary.travelers + travelers,
            amount: summary.amount + lineTotal,
          };
        },
        { travelers: 0, amount: 0 }
      ),
    [cart.items]
  );

  const confirmBooking = async () => {
    if (!cart.items.length) {
      Alert.alert('Cart is empty', 'Please add at least one tour before confirming your booking.');
      return;
    }

    const cleanEmail = normalizeEmail(email);

    if (!firstName.trim() || !lastName.trim() || !cleanEmail || !phoneDigits || !country || !city) {
      Alert.alert(
        'Missing information',
        'Please fill in your name, email, phone number, country, and city before confirming.'
      );
      return;
    }

    if (!isAcceptedEmail(cleanEmail)) {
      Alert.alert('Invalid email address', emailValidationMessage);
      return;
    }

    if (saving) {
      return;
    }

    setSaving(true);

    try {
      const customerInfo = {
        firstName,
        lastName,
        email: cleanEmail,
        phone: formatPakistanPhone(phoneDigits),
        address,
        city,
        country,
      };
      const { orderNumber } = await createOrder({
        customerInfo,
        paymentMethod,
        items: cart.items,
      });

      dispatch(
        setCheckoutDetails({
          customerInfo,
          paymentMethod,
          orderNumber,
        })
      );

      navigation.replace('OrderConfirmation', { orderNumber });
    } catch (error) {
      Alert.alert('Booking not saved', error.message || 'Please try confirming your booking again.');
    } finally {
      setSaving(false);
    }
  };

  const continueShopping = () => {
    navigation.navigate('MainTabs', { screen: 'Tours' });
  };

  const selectCountry = (nextCountry) => {
    const option = getLocationOption(nextCountry);

    setCountry(nextCountry);
    setCity(option.cities[0]);
  };

  const cityOptions = getLocationOption(country).cities;

  return (
    <AppScreen scrollable>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.logo}>{brandName}</Text>
          <View style={styles.cartPill}>
            <Text style={styles.cartPillText}>Cart - {totals.travelers}</Text>
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

        <AppCard style={styles.summaryCard}>
          <SectionTitle eyebrow="Order Summary" title="Selected tours" />

          {cart.items.length ? (
            <View style={styles.cartItems}>
              {cart.items.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  <Image resizeMode="cover" source={getTourImageSource(item.imageName)} style={styles.itemImage} />
                  <View style={styles.itemCopy}>
                    <Text style={styles.tourTitle}>{item.title}</Text>
                    <Text style={styles.tourMeta}>{item.duration}</Text>
                    <Text style={styles.tourMeta}>Departure: {item.departureDate}</Text>
                    <Text style={styles.tourMeta}>Price: {item.formattedPrice}</Text>
                  </View>

                  <View style={styles.quantityRow}>
                    <Text style={styles.quantityLabel}>Travelers</Text>
                    <View style={styles.quantityControls}>
                      <AppButton
                        label="-"
                        onPress={() =>
                          dispatch(updateCartItemTravelers({ id: item.id, travelers: item.travelers - 1 }))
                        }
                        style={styles.quantityButton}
                        variant="secondary"
                      />
                      <Text style={styles.quantityValue}>{item.travelers}</Text>
                      <AppButton
                        label="+"
                        onPress={() =>
                          dispatch(updateCartItemTravelers({ id: item.id, travelers: item.travelers + 1 }))
                        }
                        style={styles.quantityButton}
                        variant="secondary"
                      />
                    </View>
                  </View>

                  <View style={styles.summaryLine}>
                    <Text style={styles.summaryLabel}>Line Total</Text>
                    <Text style={styles.summaryValue}>{formatPrice(Number(item.price) * item.travelers)}</Text>
                  </View>

                  <AppButton
                    label="Remove"
                    onPress={() => dispatch(removeCartItem(item.id))}
                    style={styles.removeButton}
                    variant="secondary"
                  />
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyCart}>
              <Text style={styles.emptyTitle}>Your cart is empty</Text>
              <Text style={styles.emptyText}>Add one or more tours before confirming a booking.</Text>
            </View>
          )}

          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>Total Travelers</Text>
            <Text style={styles.summaryValue}>{totals.travelers}</Text>
          </View>
          <View style={styles.summaryLine}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>{formatPrice(totals.amount)}</Text>
          </View>
        </AppCard>

        <AppCard style={styles.formCard}>
          <SectionTitle eyebrow="Customer Information" title="Who is traveling?" />
          <AppInput label="First Name" onChangeText={setFirstName} placeholder="First name" returnKeyType="next" value={firstName} />
          <AppInput label="Last Name" onChangeText={setLastName} placeholder="Last name" returnKeyType="next" value={lastName} />
          <AppInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            label="Email Address"
            onChangeText={(value) => setEmail(normalizeEmail(value))}
            placeholder="name@example.com"
            returnKeyType="next"
            textContentType="emailAddress"
            value={email}
          />
          <PhoneNumberInput onChangeText={setPhoneDigits} value={phoneDigits} />
          <AppInput label="Address" multiline onChangeText={setAddress} placeholder="Street address" value={address} />
          <View style={styles.locationStack}>
            <OptionPicker
              label="Country"
              onSelect={selectCountry}
              options={locationOptions.map((option) => option.country)}
              value={country}
            />
            <OptionPicker label="City" onSelect={setCity} options={cityOptions} value={city} />
          </View>
        </AppCard>

        <AppCard style={styles.paymentCard}>
          <SectionTitle eyebrow="Payment Method" title="Choose an option" />
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

        <View style={styles.actionStack}>
          <AppButton label={saving ? 'Saving Booking...' : 'Confirm Booking'} onPress={confirmBooking} />
          <AppButton label="Continue Shopping" onPress={continueShopping} variant="secondary" />
          <Text style={styles.termsText}>By confirming, you agree to Atlas Tours booking terms and privacy guidance.</Text>
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
  cartPill: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    backgroundColor: colors.primaryLight,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  cartPillText: {
    color: colors.primaryDark,
    fontSize: 13,
    fontWeight: '700',
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
  fieldGroup: {
    gap: spacing.xs,
  },
  fieldLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  locationStack: {
    gap: spacing.md,
  },
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionChip: {
    minHeight: 40,
    maxWidth: '100%',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  selectedOptionChip: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  optionText: {
    color: colors.textSoft,
    fontSize: 14,
    fontWeight: '700',
  },
  selectedOptionText: {
    color: colors.textLight,
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
  cartItems: {
    gap: spacing.md,
  },
  cartItem: {
    gap: spacing.md,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  itemImage: {
    width: '100%',
    height: 150,
    borderRadius: 16,
  },
  itemCopy: {
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
    minWidth: 44,
    minHeight: 38,
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
    gap: spacing.md,
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
  removeButton: {
    minHeight: 40,
  },
  emptyCart: {
    gap: spacing.xs,
    borderRadius: 14,
    backgroundColor: colors.softSurface,
    padding: spacing.md,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '800',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
  },
  actionStack: {
    gap: spacing.sm,
  },
  termsText: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 20,
  },
});
