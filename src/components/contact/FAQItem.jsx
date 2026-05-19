import { StyleSheet, Text, View } from 'react-native';

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';
import AppCard from '../ui/AppCard';

export default function FAQItem({ item }) {
  return (
    <AppCard style={styles.card}>
      <Text style={styles.question}>{item.question}</Text>
      <Text style={styles.answer}>{item.answer}</Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: spacing.sm,
  },
  question: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
  },
  answer: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
});
