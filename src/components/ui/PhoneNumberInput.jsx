import { StyleSheet, Text, TextInput, View } from 'react-native';

import colors from '../../styles/colors';
import spacing from '../../styles/spacing';

export const PHONE_PREFIX = '+92';
export const MAX_PHONE_DIGITS = 10;

export const sanitizePhoneDigits = (value) => {
  const digits = String(value ?? '').replace(/\D/g, '');
  const withoutPrefix = digits.startsWith('92') ? digits.slice(2) : digits;

  return withoutPrefix.slice(0, MAX_PHONE_DIGITS);
};

export const formatPakistanPhone = (digits) => {
  const cleanDigits = sanitizePhoneDigits(digits);
  return cleanDigits ? `${PHONE_PREFIX} ${cleanDigits}` : '';
};

export default function PhoneNumberInput({ label = 'Phone Number', onChangeText, value }) {
  return (
    <View style={styles.fieldGroup}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.phoneInputRow}>
        <View style={styles.phonePrefixBox}>
          <Text style={styles.phonePrefixText}>{PHONE_PREFIX}</Text>
        </View>
        <TextInput
          keyboardType="number-pad"
          maxLength={MAX_PHONE_DIGITS}
          onChangeText={(text) => onChangeText(sanitizePhoneDigits(text))}
          placeholder="3001234567"
          placeholderTextColor={colors.textMuted}
          returnKeyType="next"
          style={styles.phoneInput}
          value={value}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fieldGroup: {
    gap: spacing.xs,
  },
  fieldLabel: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '600',
  },
  phoneInputRow: {
    minHeight: 48,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  phonePrefixBox: {
    minWidth: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: colors.border,
    backgroundColor: colors.primaryLight,
  },
  phonePrefixText: {
    color: colors.primaryDark,
    fontSize: 15,
    fontWeight: '800',
  },
  phoneInput: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: 15,
    lineHeight: 21,
  },
});
