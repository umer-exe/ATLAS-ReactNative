import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import TourCard from '../components/tours/TourCard';
import AppBadge from '../components/ui/AppBadge';
import AppButton from '../components/ui/AppButton';
import AppCard from '../components/ui/AppCard';
import AppInput from '../components/ui/AppInput';
import AppScreen from '../components/ui/AppScreen';
import { toursData } from '../data/toursData';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

const FILTER_OPTIONS = ['all', 'international', 'domestic'];

export default function ToursScreen({ navigation }) {
  const [selectedType, setSelectedType] = useState('all');
  const [destinationQuery, setDestinationQuery] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({
    selectedType: 'all',
    destinationQuery: '',
    minPrice: '',
    maxPrice: '',
  });

  const filteredTours = toursData.filter((tour) => {
    const matchesType = appliedFilters.selectedType === 'all' || tour.type === appliedFilters.selectedType;
    const searchValue = appliedFilters.destinationQuery.trim().toLowerCase();
    const matchesDestination =
      searchValue.length === 0 ||
      tour.location.toLowerCase().includes(searchValue) ||
      tour.title.toLowerCase().includes(searchValue);
    const min = appliedFilters.minPrice === '' ? null : Number(appliedFilters.minPrice);
    const max = appliedFilters.maxPrice === '' ? null : Number(appliedFilters.maxPrice);
    const matchesMin = min === null || tour.price >= min;
    const matchesMax = max === null || tour.price <= max;

    return matchesType && matchesDestination && matchesMin && matchesMax;
  });

  const applyFilters = () => {
    setAppliedFilters({
      selectedType,
      destinationQuery,
      minPrice,
      maxPrice,
    });
  };

  const renderHeader = () => (
    <View style={styles.headerContent}>
      <View style={styles.topBar}>
        <Text style={styles.logo}>Atlas Tours</Text>
        <AppBadge label="Tours" />
      </View>

      <AppCard style={styles.heroCard}>
        <Text style={styles.heroTitle}>Explore Our Tours</Text>
        <Text style={styles.heroSubtitle}>Browse our complete collection of travel packages.</Text>
      </AppCard>

      <AppCard style={styles.filterCard}>
        <Text style={styles.filterLabel}>Tour Type</Text>
        <View style={styles.filterOptions}>
          {FILTER_OPTIONS.map((option) => {
            const selected = selectedType === option;

            return (
              <AppButton
                key={option}
                label={option === 'all' ? 'All Tours' : option[0].toUpperCase() + option.slice(1)}
                onPress={() => setSelectedType(option)}
                style={styles.filterButton}
                textStyle={selected ? styles.selectedFilterLabel : undefined}
                variant={selected ? 'primary' : 'secondary'}
              />
            );
          })}
        </View>

        <AppInput
          label="Destination"
          onChangeText={setDestinationQuery}
          placeholder="Search by location or tour title"
          value={destinationQuery}
        />

        <View style={styles.priceRow}>
          <View style={styles.priceInput}>
            <AppInput
              label="Min Price"
              onChangeText={setMinPrice}
              placeholder="0"
              value={minPrice}
            />
          </View>
          <View style={styles.priceInput}>
            <AppInput
              label="Max Price"
              onChangeText={setMaxPrice}
              placeholder="20000"
              value={maxPrice}
            />
          </View>
        </View>

        <AppButton label="Apply Filters" onPress={applyFilters} />
      </AppCard>

      <View style={styles.resultsRow}>
        <Text style={styles.resultsText}>Showing {filteredTours.length} tours</Text>
      </View>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.footerStack}>
      <AppCard style={styles.ctaCard}>
        <Text style={styles.ctaEyebrow}>Need Help Choosing?</Text>
        <Text style={styles.ctaTitle}>Talk to Atlas Tours before you book.</Text>
        <Text style={styles.ctaText}>
          Compare packages, ask about custom plans, and get guidance for the destination that fits your budget.
        </Text>
        <View style={styles.ctaActions}>
          <AppButton label="Contact Us" onPress={() => navigation.navigate('Contact')} style={styles.fullWidth} />
          <AppButton
            label="Open Cart"
            onPress={() => navigation.getParent()?.navigate('CartStack')}
            style={styles.fullWidth}
            variant="secondary"
          />
        </View>
      </AppCard>

      <View style={styles.footer}>
        <Text style={styles.footerLogo}>Atlas Tours</Text>
        <Text style={styles.footerText}>Browse by destination, compare packages, and plan your next trip with confidence.</Text>
        <Text style={styles.footerLinks}>Home  •  Tours  •  Contact  •  Cart</Text>
      </View>
    </View>
  );

  return (
    <AppScreen>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={filteredTours}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <AppCard style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No tours found</Text>
            <Text style={styles.emptyText}>Try changing the destination or price filters to see more options.</Text>
          </AppCard>
        }
        ListFooterComponent={renderFooter}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <TourCard
            onPress={() => navigation.navigate('TourDetail', { tourTitle: item.title })}
            tour={item}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  listContent: {
    padding: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  headerContent: {
    gap: spacing.lg,
    marginBottom: spacing.lg,
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
  filterCard: {
    gap: spacing.md,
  },
  filterLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  filterOptions: {
    gap: spacing.sm,
  },
  filterButton: {
    width: '100%',
  },
  selectedFilterLabel: {
    color: colors.textLight,
  },
  priceRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  priceInput: {
    flex: 1,
  },
  resultsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultsText: {
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyCard: {
    gap: spacing.sm,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  footerStack: {
    gap: spacing.lg,
    marginTop: spacing.lg,
  },
  ctaCard: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    gap: spacing.md,
  },
  ctaEyebrow: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  ctaTitle: {
    color: colors.textLight,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
  },
  ctaText: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: 15,
    lineHeight: 22,
  },
  ctaActions: {
    gap: spacing.sm,
  },
  fullWidth: {
    width: '100%',
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
