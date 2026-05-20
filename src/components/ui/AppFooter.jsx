import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import colors from '../../styles/colors';
import spacing from '../../styles/spacing';

export default function AppFooter() {
  const { brandName, supportEmail, supportPhone } = useTheme();

  return (
    <View style={styles.footer}>
      <Text style={styles.footerLogo}>{brandName}</Text>
      <Text style={styles.footerText}>Trusted domestic and international travel experiences.</Text>
      <Text style={styles.footerText}>Phone: {supportPhone}</Text>
      <Text style={styles.footerText}>Email: {supportEmail}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.navy,
    borderRadius: 18,
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
});
