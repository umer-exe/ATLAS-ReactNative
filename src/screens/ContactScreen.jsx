import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import FAQItem from '../components/contact/FAQItem';
import AppButton from '../components/ui/AppButton';
import AppCard from '../components/ui/AppCard';
import AppInput from '../components/ui/AppInput';
import AppFooter from '../components/ui/AppFooter';
import AppScreen from '../components/ui/AppScreen';
import PhoneNumberInput, { formatPakistanPhone } from '../components/ui/PhoneNumberInput';
import ScreenHeader from '../components/ui/ScreenHeader';
import ScreenHero from '../components/ui/ScreenHero';
import SectionTitle from '../components/ui/SectionTitle';
import { useTheme } from '../context/ThemeContext';
import { faqData } from '../data/faqData';
import { createContactMessage } from '../firebase/atlasFirebaseApi';
import colors from '../styles/colors';
import spacing from '../styles/spacing';
import { emailValidationMessage, isAcceptedEmail, normalizeEmail } from '../utils/validation';

export default function ContactScreen() {
  const { brandName, supportEmail, supportPhone } = useTheme();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneDigits, setPhoneDigits] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    const cleanEmail = normalizeEmail(email);

    if (!fullName.trim() || !cleanEmail || !message.trim()) {
      Alert.alert('Missing information', 'Please fill in your name, email, and message before sending.');
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
      await createContactMessage({
        fullName,
        email: cleanEmail,
        phone: formatPakistanPhone(phoneDigits),
        subject,
        message,
      });

      setFullName('');
      setEmail('');
      setPhoneDigits('');
      setSubject('');
      setMessage('');
      Alert.alert('Message Sent', 'Thanks for reaching out. Atlas Tours will get back to you soon.');
    } catch (error) {
      Alert.alert('Message not saved', error.message || 'Please try sending your message again.');
    } finally {
      setSaving(false);
    }
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
          <AppInput label="Subject" onChangeText={setSubject} placeholder="Tour planning, pricing, or support" value={subject} />
          <AppInput
            label="Message"
            multiline
            onChangeText={setMessage}
            placeholder="Share your destination, travel dates, or any questions you have."
            returnKeyType="done"
            value={message}
          />
          <AppButton label={saving ? 'Saving Message...' : 'Send Message'} onPress={handleSubmit} />
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

        <AppFooter />
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
  faqStack: {
    gap: spacing.md,
  },
});
