import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import AppBadge from '../components/ui/AppBadge';
import AppButton from '../components/ui/AppButton';
import AppCard from '../components/ui/AppCard';
import AppInput from '../components/ui/AppInput';
import AppScreen from '../components/ui/AppScreen';
import SectionTitle from '../components/ui/SectionTitle';
import { toursData } from '../data/toursData';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

export default function CartScreen({ navigation }) {
  const selectedTour = toursData[1];
  const [quantity, setQuantity] = useState(2);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const totalAmount = selectedTour.price * quantity;
  const formattedTotal = `$${totalAmount.toLocaleString()}`;

  const confirmBooking = () => {
    if (!firstName.trim() || !lastName.trim() || !email.trim()) {
      Alert.alert('Missing information', 'Please fill in your first name, last name, and email before confirming.');
      return;
    }

    navigation.navigate('OrderConfirmation', {
      tourTitle: selectedTour.title,
      customerName: `${firstName} ${lastName}`,
      totalAmount: formattedTotal,
      quantity,
      paymentMethod,
    });
  };

  return (
    <AppScreen scrollable>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <Text style={styles.logo}>Atlas Tours</Text>
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>{quantity}</Text>
          </View>
        </View>

        <AppCard style={styles.successCard}>
          <Text style={styles.successText}>Tour added to cart successfully</Text>
        </AppCard>

        <AppCard style={styles.heroCard}>
          <Text style={styles.heroTitle}>Shopping Cart</Text>
          <Text style={styles.heroSubtitle}>Review your tours and complete your booking.</Text>
        </AppCard>

        <AppCard style={styles.formCard}>
          <SectionTitle
            eyebrow="Customer Information"
            title="Who is traveling?"
            subtitle="This stays simple for the course project, but still matches the shape of the website checkout."
          />
          <AppInput label="First Name" onChangeText={setFirstName} placeholder="First name" value={firstName} />
          <AppInput label="Last Name" onChangeText={setLastName} placeholder="Last name" value={lastName} />
          <AppInput label="Email Address" onChangeText={setEmail} placeholder="name@example.com" value={email} />
          <AppInput label="Phone Number" onChangeText={setPhone} placeholder="+92 300 1234567" value={phone} />
          <AppInput label="Address" multiline onChangeText={setAddress} placeholder="Street address" value={address} />
          <AppInput label="City" onChangeText={setCity} placeholder="Lahore" value={city} />
          <AppInput label="Country" onChangeText={setCountry} placeholder="Pakistan" value={country} />
        </AppCard>

        <AppCard style={styles.paymentCard}>
          <SectionTitle
            eyebrow="Payment Method"
            title="Choose an option"
            subtitle="No real payment flow is added here. These are presentation-only choices."
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
            title="Your selected tour"
            subtitle="A compact mobile summary of the package before booking confirmation."
          />
          <View style={styles.tourPreview}>
            <View style={styles.imagePlaceholder}>
              <Text style={styles.imageText}>{selectedTour.images.imageName}</Text>
            </View>
            <View style={styles.tourCopy}>
              <Text style={styles.tourTitle}>{selectedTour.title}</Text>
              <Text style={styles.tourMeta}>{selectedTour.duration}</Text>
              <Text style={styles.tourMeta}>Departure: Flexible planning</Text>
            </View>
          </View>

          <View style={styles.quantityRow}>
            <Text style={styles.quantityLabel}>Travelers</Text>
            <View style={styles.quantityControls}>
              <AppButton label="-" onPress={() => setQuantity((value) => Math.max(1, value - 1))} variant="secondary" style={styles.quantityButton} />
              <Text style={styles.quantityValue}>{quantity}</Text>
              <AppButton label="+" onPress={() => setQuantity((value) => value + 1)} variant="secondary" style={styles.quantityButton} />
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
