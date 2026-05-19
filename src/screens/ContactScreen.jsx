import { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import FAQItem from '../components/contact/FAQItem';
import AppButton from '../components/ui/AppButton';
import AppCard from '../components/ui/AppCard';
import AppInput from '../components/ui/AppInput';
import AppScreen from '../components/ui/AppScreen';
import SectionTitle from '../components/ui/SectionTitle';
import { faqData } from '../data/faqData';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

export default function ContactScreen({ navigation }) {
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
        <View style={styles.topBar}>
          <Text style={styles.logo}>Atlas Tours</Text>
          <Text style={styles.activeLink}>Contact</Text>
        </View>

        <AppCard style={styles.heroCard}>
          <Text style={styles.heroTitle}>Get In Touch</Text>
          <Text style={styles.heroSubtitle}>We&apos;re here to help plan your perfect journey.</Text>
        </AppCard>

        <AppCard style={styles.formCard}>
          <SectionTitle
            eyebrow="Send Us a Message"
            title="Tell us about your trip"
            subtitle="A simple mobile form inspired by the website contact page."
          />
          <AppInput label="Full Name" onChangeText={setFullName} placeholder="Your full name" value={fullName} />
          <AppInput label="Email Address" onChangeText={setEmail} placeholder="name@example.com" value={email} />
          <AppInput label="Phone Number" onChangeText={setPhone} placeholder="+92 300 1234567" value={phone} />
          <AppInput label="Subject" onChangeText={setSubject} placeholder="Tour planning, pricing, or support" value={subject} />
          <AppInput
            label="Message"
            multiline
            onChangeText={setMessage}
            placeholder="Share your destination, travel dates, or any questions you have."
            value={message}
          />
          <AppButton label="Send Message" onPress={handleSubmit} />
        </AppCard>

        <AppCard style={styles.infoCard}>
          <SectionTitle
            eyebrow="Contact Information"
            title="Ways to reach Atlas Tours"
            subtitle="Quick details kept readable and stacked for mobile."
          />
          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>Office Address</Text>
            <Text style={styles.infoText}>12 Mall Road, Lahore, Pakistan</Text>
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoText}>+92 300 1234567</Text>
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>WhatsApp</Text>
            <Text style={styles.infoText}>Chat with our travel desk during office hours</Text>
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoText}>info@atlastours.pk</Text>
          </View>
          <View style={styles.infoGroup}>
            <Text style={styles.infoLabel}>Office Hours</Text>
            <Text style={styles.infoText}>Mon - Sat, 9:00 AM to 7:00 PM</Text>
          </View>
        </AppCard>

        <AppCard style={styles.purpleCard}>
          <SectionTitle
            eyebrow="Our Location"
            title="Visit the main office"
            subtitle="The web app uses a stronger purple block here, so the mobile version keeps that contrast."
            tone="inverse"
          />
          <Text style={styles.purpleText}>Lahore office serving domestic and international bookings across Pakistan.</Text>
        </AppCard>

        <AppCard style={styles.quickLinksCard}>
          <SectionTitle
            eyebrow="Quick Links"
            title="Where to go next"
            subtitle="Fast access to the main customer screens."
            tone="inverse"
          />
          <View style={styles.quickLinks}>
            <AppButton label="Browse Tours" onPress={() => navigation.navigate('Tours')} variant="secondary" style={styles.fullWidth} />
            <AppButton
              label="View Cart"
              onPress={() => navigation.getParent()?.navigate('CartStack')}
              variant="secondary"
              style={styles.fullWidth}
            />
            <AppButton label="Explore Home" onPress={() => navigation.navigate('Home')} variant="secondary" style={styles.fullWidth} />
          </View>
        </AppCard>

        <SectionTitle
          eyebrow="Frequently Asked Questions"
          title="Common travel questions"
          subtitle="FAQ cards follow the simple stacked style from the design notes."
        />
        <View style={styles.faqStack}>
          {faqData.map((item) => (
            <FAQItem item={item} key={item.id} />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerLogo}>Atlas Tours</Text>
          <Text style={styles.footerText}>Travel planning support for tours, pricing, and tailored itineraries.</Text>
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
  activeLink: {
    color: colors.primary,
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
