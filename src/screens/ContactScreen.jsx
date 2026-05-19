import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import FAQItem from '../components/contact/FAQItem';
import AppButton from '../components/ui/AppButton';
import AppCard from '../components/ui/AppCard';
import AppInput from '../components/ui/AppInput';
import AppScreen from '../components/ui/AppScreen';
import ScreenHeader from '../components/ui/ScreenHeader';
import ScreenHero from '../components/ui/ScreenHero';
import SectionTitle from '../components/ui/SectionTitle';
import { useTheme } from '../context/ThemeContext';
import { faqData } from '../data/faqData';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

export default function ContactScreen({ navigation }) {
  const { brandName, supportEmail, supportPhone, footerLinks } = useTheme();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!fullName.trim() || !email.trim() || !message.trim()) {
      Alert.alert('Missing information', 'Please fill in your name, email, and message before sending.');
      return;
    }

    Alert.alert('Message Sent', 'Thanks for reaching out. Atlas Tours will get back to you soon.');
  };

  return (
    <AppScreen scrollable>
      <View style={styles.container}>
        <ScreenHeader brandName={brandName} pageLabel="Contact" />

        <ScreenHero title="Get In Touch" subtitle="We're here to help plan your perfect journey." />

        <AppCard style={styles.formCard}>
          <SectionTitle
            eyebrow="Send Us a Message"
            subtitle="A simple mobile form inspired by the website contact page."
            title="Tell us about your trip"
          />
          <AppInput label="Full Name" onChangeText={setFullName} placeholder="Your full name" returnKeyType="next" value={fullName} />
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
            placeholder={supportPhone}
            returnKeyType="next"
            value={phone}
          />
          <AppInput label="Subject" onChangeText={setSubject} placeholder="Tour planning, pricing, or support" value={subject} />
          <AppInput
            label="Message"
            multiline
            onChangeText={setMessage}
            placeholder="Share your destination, travel dates, or any questions you have."
            returnKeyType="done"
            value={message}
          />
          <AppButton label="Send Message" onPress={handleSubmit} />
        </AppCard>

        <AppCard style={styles.infoCard}>
          <SectionTitle
            eyebrow="Contact Information"
            subtitle="Quick details kept readable and stacked for mobile."
            title="Ways to reach Atlas Tours"
          />
          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>Office Address</Text>
            <Text style={styles.infoText}>12 Mall Road, Lahore, Pakistan</Text>
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoText}>{supportPhone}</Text>
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>WhatsApp</Text>
            <Text style={styles.infoText}>Chat with our travel desk during office hours</Text>
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoText}>{supportEmail}</Text>
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>Office Hours</Text>
            <Text style={styles.infoText}>Mon - Sat, 9:00 AM to 7:00 PM</Text>
          </View>
        </AppCard>

        <AppCard style={styles.purpleCard}>
          <SectionTitle
            eyebrow="Our Location"
            subtitle="The web app uses a stronger purple block here, so the mobile version keeps that contrast."
            title="Visit the main office"
            tone="inverse"
          />
          <Text style={styles.purpleText}>Lahore office serving domestic and international bookings across Pakistan.</Text>
        </AppCard>

        <AppCard style={styles.quickLinksCard}>
          <SectionTitle
            eyebrow="Quick Links"
            subtitle="Fast access to the main customer screens."
            title="Where to go next"
            tone="inverse"
          />
          <View style={styles.quickLinks}>
            <AppButton label="Browse Tours" onPress={() => navigation.navigate('Tours')} style={styles.fullWidth} variant="secondary" />
            <AppButton
              label="View Cart"
              onPress={() => navigation.getParent()?.getParent()?.navigate('CartStack')}
              style={styles.fullWidth}
              variant="secondary"
            />
            <AppButton label="Explore Home" onPress={() => navigation.navigate('Home')} style={styles.fullWidth} variant="secondary" />
          </View>
        </AppCard>

        <SectionTitle
          eyebrow="Frequently Asked Questions"
          subtitle="FAQ cards follow the simple stacked style from the design notes."
          title="Common travel questions"
        />
        <View style={styles.faqStack}>
          {faqData.map((item) => (
            <FAQItem item={item} key={item.id} />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>{brandName}</Text>
          <Text style={styles.footerText}>Travel planning support for tours, pricing, and tailored itineraries.</Text>
          <Text style={styles.footerLinks}>{footerLinks}</Text>
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
  formCard: {
    gap: spacing.md,
  },
  infoCard: {
    gap: spacing.md,
  },
  infoGroup: {
    gap: 4,
  },
  infoLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  infoText: {
    color: colors.textSoft,
    fontSize: 15,
    lineHeight: 22,
  },
  purpleCard: {
    backgroundColor: colors.primaryDark,
    borderColor: colors.primaryDark,
    gap: spacing.md,
  },
  purpleText: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 15,
    lineHeight: 22,
  },
  quickLinksCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    gap: spacing.md,
  },
  quickLinks: {
    gap: spacing.sm,
  },
  fullWidth: {
    width: '100%',
  },
  faqStack: {
    gap: spacing.md,
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
