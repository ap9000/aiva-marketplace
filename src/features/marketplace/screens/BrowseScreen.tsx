import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../../navigation/types';
import { Card, Avatar, Loading } from '../../../shared/components';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../../theme/ThemeContext';
import { theme } from '../../../theme';
import { useAppDispatch, useAppSelector } from '../../../store';
import { fetchFeaturedVAs, fetchCategories } from '../store/marketplaceSlice';

type NavigationProp = StackNavigationProp<HomeStackParamList, 'Browse'>;

export default function BrowseScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const { featuredVAs, categories, isLoading } = useAppSelector((state) => state.marketplace);
  const { user } = useAppSelector((state) => state.auth);
  const styles = createStyles(isDark);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    dispatch(fetchFeaturedVAs());
    dispatch(fetchCategories());
  };

  const renderVACard = ({ item }: any) => (
    <TouchableOpacity onPress={() => navigation.navigate('VAProfile', { vaId: item.id })}>
      <Card style={styles.vaCard}>
        <Avatar
          source={item.avatarUrl}
          name={item.displayName}
          size="lg"
          verified={item.verified}
          status={item.availability === 'available' ? 'online' : 'offline'}
        />
        <Text style={styles.vaName} numberOfLines={1}>{item.displayName}</Text>
        <Text style={styles.vaTitle} numberOfLines={2}>{item.title}</Text>
        <View style={styles.vaRating}>
          <MaterialIcons name="star" size={16} color={theme.colors.warning} />
          <Text style={styles.vaRatingText}>{item.rating}</Text>
        </View>
        <Text style={styles.vaPrice}>${item.hourlyRateMin}-${item.hourlyRateMax}/hr</Text>
      </Card>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Category', { 
        categoryId: item.id, 
        categoryName: item.name 
      })}
    >
      <Card style={styles.categoryCard}>
        <MaterialIcons 
          name={item.icon as any} 
          size={32} 
          color={theme.colors.primary.main} 
        />
        <Text style={styles.categoryName}>{item.name}</Text>
      </Card>
    </TouchableOpacity>
  );

  if (isLoading && featuredVAs.length === 0) {
    return <Loading fullScreen />;
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={loadData} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>
          Welcome back, {user?.displayName || 'User'}!
        </Text>
        <TouchableOpacity style={styles.notificationButton}>
          <MaterialIcons 
            name="notifications-none" 
            size={24} 
            color={isDark ? theme.colors.white : theme.colors.gray[900]} 
          />
        </TouchableOpacity>
      </View>

      {/* Featured VAs */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Virtual Assistants</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={featuredVAs}
          renderItem={renderVACard}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Browse by Category</Text>
        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.categoryRow}
          scrollEnabled={false}
        />
      </View>

      {/* Top Rated */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Rated This Week</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>
        {featuredVAs.slice(0, 3).map((va) => (
          <TouchableOpacity
            key={va.id}
            onPress={() => navigation.navigate('VAProfile', { vaId: va.id })}
          >
            <Card style={styles.listCard}>
              <View style={styles.listCardContent}>
                <Avatar
                  source={va.avatarUrl}
                  name={va.displayName}
                  size="md"
                  verified={va.verified}
                />
                <View style={styles.listCardInfo}>
                  <Text style={styles.listCardName}>{va.displayName}</Text>
                  <Text style={styles.listCardTitle}>{va.title}</Text>
                  <View style={styles.listCardMeta}>
                    <View style={styles.vaRating}>
                      <MaterialIcons name="star" size={14} color={theme.colors.warning} />
                      <Text style={styles.listCardRating}>{va.rating}</Text>
                    </View>
                    <Text style={styles.listCardPrice}>
                      ${va.hourlyRateMin}-${va.hourlyRateMax}/hr
                    </Text>
                  </View>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDark ? theme.colors.dark.background : theme.colors.gray[100],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[3],
    paddingTop: theme.spacing[4],
    paddingBottom: theme.spacing[2],
  },
  greeting: {
    fontSize: theme.fontSize['2xl'],
    fontWeight: theme.fontWeight.bold,
    color: isDark ? theme.colors.white : theme.colors.gray[900],
  },
  notificationButton: {
    padding: theme.spacing[1],
  },
  section: {
    marginTop: theme.spacing[3],
    marginBottom: theme.spacing[2],
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing[3],
    marginBottom: theme.spacing[2],
  },
  sectionTitle: {
    fontSize: theme.fontSize.xl,
    fontWeight: theme.fontWeight.semibold,
    color: isDark ? theme.colors.white : theme.colors.gray[900],
  },
  seeAll: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.primary.main,
    fontWeight: theme.fontWeight.medium,
  },
  horizontalList: {
    paddingHorizontal: theme.spacing[3],
  },
  vaCard: {
    width: 160,
    marginRight: theme.spacing[2],
    alignItems: 'center',
    paddingVertical: theme.spacing[3],
  },
  vaName: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    marginTop: theme.spacing[2],
  },
  vaTitle: {
    fontSize: theme.fontSize.sm,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
    textAlign: 'center',
    marginTop: theme.spacing[1],
    minHeight: 36,
  },
  vaRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: theme.spacing[1],
  },
  vaRatingText: {
    fontSize: theme.fontSize.sm,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
    marginLeft: 4,
  },
  vaPrice: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.primary.main,
    marginTop: theme.spacing[1],
  },
  categoryRow: {
    paddingHorizontal: theme.spacing[3],
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: (100 - theme.spacing[6] - theme.spacing[2]) / 2 + '%',
    aspectRatio: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing[2],
  },
  categoryName: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.medium,
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    marginTop: theme.spacing[2],
  },
  listCard: {
    marginHorizontal: theme.spacing[3],
    marginBottom: theme.spacing[2],
  },
  listCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listCardInfo: {
    flex: 1,
    marginLeft: theme.spacing[2],
  },
  listCardName: {
    fontSize: theme.fontSize.base,
    fontWeight: theme.fontWeight.semibold,
    color: isDark ? theme.colors.white : theme.colors.gray[900],
  },
  listCardTitle: {
    fontSize: theme.fontSize.sm,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
    marginTop: 2,
  },
  listCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.spacing[1],
  },
  listCardRating: {
    fontSize: theme.fontSize.xs,
    color: isDark ? theme.colors.gray[300] : theme.colors.gray[700],
    marginLeft: 2,
  },
  listCardPrice: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: theme.colors.primary.main,
  },
});