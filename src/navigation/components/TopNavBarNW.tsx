import React, { useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector, useAppDispatch } from '../../store';
import { logout } from '../../features/auth/store/authSlice';
import { Avatar } from '../../shared/components/Avatar';
import { Button } from '../../components/reusables/primitives/button';
import { cn } from '../../lib/utils';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  interpolate,
} from 'react-native-reanimated';

interface TopNavBarProps {
  onAuthPress?: (mode: 'signin' | 'signup') => void;
}

export const TopNavBarNW: React.FC<TopNavBarProps> = ({ onAuthPress }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, isGuestMode } = useAppSelector((state) => state.auth);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  const mobileMenuAnimation = useSharedValue(0);

  React.useEffect(() => {
    mobileMenuAnimation.value = withTiming(showMobileMenu ? 1 : 0, { duration: 300 });
  }, [showMobileMenu]);

  const mobileMenuStyle = useAnimatedStyle(() => ({
    opacity: mobileMenuAnimation.value,
    transform: [
      {
        translateY: interpolate(mobileMenuAnimation.value, [0, 1], [-20, 0]),
      },
    ],
  }));

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('Landing' as never);
  };

  const navItems = [
    { label: 'Browse VAs', route: 'Browse', icon: 'search' },
    { label: 'How it Works', route: 'HowItWorks', icon: 'help-circle-outline' },
    { label: 'Pricing', route: 'Pricing', icon: 'pricetag-outline' },
  ];

  const authenticatedItems = [
    { label: 'Browse', route: 'Browse', icon: 'search' },
    { label: 'Messages', route: 'Messages', icon: 'chatbubble-outline' },
    { label: 'Dashboard', route: 'Dashboard', icon: 'grid-outline' },
  ];

  const renderDesktopNav = () => (
    <>
      <View className="flex-row items-center gap-4 flex-1 justify-center">
        {(isAuthenticated ? authenticatedItems : navItems).map((item) => (
          <Pressable
            key={item.route}
            className="py-1 px-2 rounded-md hover:bg-gray-100 transition-colors"
            onPress={() => navigation.navigate(item.route as never)}
          >
            <Text className="text-base font-medium text-gray-700 dark:text-gray-200">
              {item.label}
            </Text>
          </Pressable>
        ))}
      </View>

      <View className="flex-row items-center gap-2">
        {isAuthenticated ? (
          <View className="relative">
            <Pressable
              className="flex-row items-center gap-1 p-1 rounded-md hover:bg-gray-100"
              onPress={() => setShowUserDropdown(!showUserDropdown)}
              {...(Platform.OS === 'web' ? {
                onMouseEnter: () => setShowUserDropdown(true),
                onMouseLeave: () => setShowUserDropdown(false),
              } : {})}
            >
              <Avatar
                source={user?.avatar}
                name={user?.displayName || 'User'}
                size="sm"
              />
              <Ionicons 
                name="chevron-down" 
                size={16} 
                color="#374151"
              />
            </Pressable>

            {showUserDropdown && (
              <View className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg min-w-[200px] p-1">
                <Pressable 
                  className="flex-row items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  onPress={() => navigation.navigate('Profile' as never)}
                >
                  <Ionicons name="person-outline" size={18} color="#374151" />
                  <Text className="text-sm text-gray-700 dark:text-gray-200">Profile</Text>
                </Pressable>
                <Pressable 
                  className="flex-row items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  onPress={() => navigation.navigate('Settings' as never)}
                >
                  <Ionicons name="settings-outline" size={18} color="#374151" />
                  <Text className="text-sm text-gray-700 dark:text-gray-200">Settings</Text>
                </Pressable>
                <View className="h-px bg-gray-200 dark:bg-gray-600 my-1" />
                <Pressable 
                  className="flex-row items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  onPress={handleLogout}
                >
                  <Ionicons name="log-out-outline" size={18} color="#EF4444" />
                  <Text className="text-sm text-red-500">Logout</Text>
                </Pressable>
              </View>
            )}
          </View>
        ) : (
          <>
            {isGuestMode && (
              <Text className="text-sm text-gray-500 mr-2">Browsing as Guest</Text>
            )}
            <Button
              label="Sign In"
              variant="ghost"
              size="sm"
              onPress={() => onAuthPress?.('signin')}
              className="mr-1"
            />
            <Button
              label="Sign Up"
              variant="default"
              size="sm"
              onPress={() => onAuthPress?.('signup')}
            />
          </>
        )}
      </View>
    </>
  );

  const renderMobileNav = () => (
    <>
      <Pressable
        className="p-1"
        onPress={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Ionicons 
          name={showMobileMenu ? 'close' : 'menu'} 
          size={28} 
          color="#111827"
        />
      </Pressable>

      {showMobileMenu && (
        <Animated.View 
          style={mobileMenuStyle}
          className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-xl max-h-[80vh]"
        >
          <ScrollView className="p-3">
            {(isAuthenticated ? authenticatedItems : navItems).map((item) => (
              <Pressable
                key={item.route}
                className="flex-row items-center gap-3 py-3 px-2"
                onPress={() => {
                  navigation.navigate(item.route as never);
                  setShowMobileMenu(false);
                }}
              >
                <Ionicons 
                  name={item.icon as any} 
                  size={24} 
                  color="#374151"
                />
                <Text className="text-base text-gray-900 dark:text-white">
                  {item.label}
                </Text>
              </Pressable>
            ))}

            {isAuthenticated ? (
              <>
                <View className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
                <Pressable
                  className="flex-row items-center gap-3 py-3 px-2"
                  onPress={() => {
                    navigation.navigate('Profile' as never);
                    setShowMobileMenu(false);
                  }}
                >
                  <Ionicons name="person-outline" size={24} color="#374151" />
                  <Text className="text-base text-gray-700 dark:text-gray-200">Profile</Text>
                </Pressable>
                <Pressable
                  className="flex-row items-center gap-3 py-3 px-2"
                  onPress={handleLogout}
                >
                  <Ionicons name="log-out-outline" size={24} color="#EF4444" />
                  <Text className="text-base text-red-500">Logout</Text>
                </Pressable>
              </>
            ) : (
              <View className="mt-3 gap-2">
                <Button
                  label="Sign In"
                  variant="secondary"
                  size="default"
                  onPress={() => {
                    onAuthPress?.('signin');
                    setShowMobileMenu(false);
                  }}
                  className="w-full"
                />
                <Button
                  label="Sign Up"
                  variant="default"
                  size="default"
                  onPress={() => {
                    onAuthPress?.('signup');
                    setShowMobileMenu(false);
                  }}
                  className="w-full"
                />
              </View>
            )}
          </ScrollView>
        </Animated.View>
      )}
    </>
  );

  return (
    <View className={cn(
      "sticky top-0 left-0 right-0 z-50",
      "bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg",
      "border-b border-gray-200 dark:border-gray-800",
      "shadow-sm"
    )}>
      <View className="flex-row items-center justify-between h-16 px-6 max-w-7xl mx-auto w-full">
        <Pressable 
          className="flex-row items-center gap-2"
          onPress={() => navigation.navigate(isAuthenticated ? 'Browse' : 'Landing' as never)}
        >
          <View className="w-10 h-10 rounded-lg bg-lab-purple items-center justify-center">
            <Text className="text-xl font-bold text-white">FT</Text>
          </View>
          <Text className="text-lg font-bold text-gray-900 dark:text-white hidden md:flex">
            FindNewTalent.ai
          </Text>
        </Pressable>

        {Platform.OS === 'web' && window.innerWidth >= 768 ? renderDesktopNav() : renderMobileNav()}
      </View>
    </View>
  );
};

export default TopNavBarNW;