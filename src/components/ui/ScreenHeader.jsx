import { StyleSheet, Text, View } from 'react-native';

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';

export default function ScreenHeader({ brandName, pageLabel, style }) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.brand}>{brandName}</Text>
      <Text style={styles.pageLabel}>{pageLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
  },
  brand: {
    color: colors.navy,
    fontSize: 24,
    fontWeight: '800',
  },
  pageLabel: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
});
