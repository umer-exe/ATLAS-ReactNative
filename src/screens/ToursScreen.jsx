import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import TourCard from '../components/tours/TourCard';
import AppButton from '../components/ui/AppButton';
import AppCard from '../components/ui/AppCard';
import AppFooter from '../components/ui/AppFooter';
import AppInput from '../components/ui/AppInput';
import AppScreen from '../components/ui/AppScreen';
import ScreenHeader from '../components/ui/ScreenHeader';
import ScreenHero from '../components/ui/ScreenHero';
import { useTheme } from '../context/ThemeContext';
import { getTours } from '../firebase/atlasFirebaseApi';
import colors from '../styles/colors';
import spacing from '../styles/spacing';

const FILTER_OPTIONS = ['all', 'international', 'domestic'];

function ToursHeader({
  appliedCount,
  brandName,
  destinationQuery,
  loading,
  maxPrice,
  minPrice,
  onApplyFilters,
  onChangeDestination,
  onChangeMaxPrice,
  onChangeMinPrice,
  onSelectType,
  selectedType,
}) {
  return (
    <View style={styles.headerContent}>
      <ScreenHeader brandName={brandName} pageLabel="Tours" />

      <ScreenHero title="Explore Our Tours" subtitle="Browse our complete collection of travel packages." />

      <AppCard style={styles.filterCard}>
        <Text style={styles.filterLabel}>Tour Type</Text>
        <View style={styles.filterOptions}>
          {FILTER_OPTIONS.map((option) => {
            const selected = selectedType === option;

            return (
              <AppButton
                key={option}
                label={option === 'all' ? 'All Tours' : option[0].toUpperCase() + option.slice(1)}
                onPress={() => onSelectType(option)}
                style={styles.filterButton}
                textStyle={[styles.filterButtonLabel, selected && styles.selectedFilterLabel]}
                variant={selected ? 'primary' : 'secondary'}
              />
            );
          })}
        </View>

        <AppInput
          label="Destination"
          onChangeText={onChangeDestination}
          placeholder="Search by location or tour title"
          value={destinationQuery}
        />

        <View style={styles.priceRow}>
          <View style={styles.priceInput}>
            <AppInput
              keyboardType="numeric"
              label="Min Price"
              onChangeText={onChangeMinPrice}
              placeholder="0"
              value={minPrice}
            />
          </View>
          <View style={styles.priceInput}>
            <AppInput
              keyboardType="numeric"
              label="Max Price"
              onChangeText={onChangeMaxPrice}
              placeholder="20000"
              value={maxPrice}
            />
          </View>
        </View>

        <AppButton label="Apply Filters" onPress={onApplyFilters} style={styles.applyButton} />
      </AppCard>

      <View style={styles.resultsRow}>
        <Text style={styles.resultsText}>{loading ? 'Loading tours...' : `Showing ${appliedCount} tours`}</Text>
      </View>
    </View>
  );
}

function ToursFooter() {
  return (
    <View style={styles.footerStack}>
      <AppFooter />
    </View>
  );
}

export default function ToursScreen({ navigation }) {
  const { brandName } = useTheme();
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dataError, setDataError] = useState('');
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

  useEffect(() => {
    let mounted = true;

    const loadTours = async () => {
      setLoading(true);
      try {
        const databaseTours = await getTours(appliedFilters);

        if (mounted) {
          setTours(databaseTours);
          setDataError('');
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setTours([]);
          setDataError(error.message || 'Firebase tours could not be loaded.');
          setLoading(false);
        }
      }
    };

    loadTours();

    return () => {
      mounted = false;
    };
  }, [appliedFilters]);

  const applyFilters = () => {
    setAppliedFilters({
      selectedType,
      destinationQuery,
      minPrice,
      maxPrice,
    });
  };

  return (
    <AppScreen>
      <FlatList
        contentContainerStyle={styles.listContent}
        data={tours}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={
          <AppCard style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>No tours found</Text>
            <Text style={styles.emptyText}>
              {dataError || (loading ? 'Loading Firebase tours now.' : 'Try changing the destination or price filters to see more options.')}
            </Text>
          </AppCard>
        }
        ListFooterComponent={<ToursFooter />}
        ListHeaderComponent={
          <ToursHeader
            appliedCount={tours.length}
            brandName={brandName}
            destinationQuery={destinationQuery}
            loading={loading}
            maxPrice={maxPrice}
            minPrice={minPrice}
            onApplyFilters={applyFilters}
            onChangeDestination={setDestinationQuery}
            onChangeMaxPrice={setMaxPrice}
            onChangeMinPrice={setMinPrice}
            onSelectType={setSelectedType}
            selectedType={selectedType}
          />
        }
        renderItem={({ item }) => (
          <TourCard
            onPress={() => navigation.navigate('TourDetail', { slug: item.slug })}
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
  filterCard: {
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: 14,
  },
  filterLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '700',
  },
  filterOptions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  filterButton: {
    flex: 1,
    minHeight: 38,
    paddingHorizontal: 6,
    borderRadius: 10,
  },
  filterButtonLabel: {
    fontSize: 12,
    lineHeight: 16,
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
    minWidth: 0,
  },
  applyButton: {
    minHeight: 42,
    borderRadius: 10,
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
  fullWidth: {
    width: '100%',
  },
});
