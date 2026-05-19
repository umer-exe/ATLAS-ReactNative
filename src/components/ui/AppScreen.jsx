import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import colors from '../../styles/colors';

export default function AppScreen({
  children,
  scrollable = false,
  backgroundColor = colors.background,
  contentContainerStyle,
  style,
}) {
  const content = scrollable ? (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, contentContainerStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, contentContainerStyle]}>{children}</View>
  );

  return <SafeAreaView style={[styles.screen, { backgroundColor }, style]}>{content}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
});
