import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { theme } from '../../theme';
import { useAppSelector, useAppDispatch } from '../../store';
import { logout } from '../../features/auth/store/authSlice';
import { Avatar, Button } from '../../shared/components';
import { useResponsive } from '../../shared/hooks/useResponsive';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withTiming,
  interpolate,
} from 'react-native-reanimated';

interface TopNavBarProps {
  onAuthPress?: (mode: 'signin' | 'signup') => void;
}

export const TopNavBar: React.FC<TopNavBarProps> = ({ onAuthPress }) => {
  const { isDark } = useTheme();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { isAuthenticated, user, isGuestMode } = useAppSelector((state) => state.auth);
  const { width, isDesktop, isTablet } = useResponsive();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  
  const mobileMenuAnimation = useSharedValue(0);
  const styles = createStyles(isDark, isDesktop);

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
      <View style={styles.navItems}>
        {(isAuthenticated ? authenticatedItems : navItems).map((item) => (
          <Pressable
            key={item.route}
            style={styles.navItem}
            onPress={() => navigation.navigate(item.route as never)}
          >
            <Text style={styles.navItemText}>{item.label}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.rightSection}>
        {isAuthenticated ? (
          <View style={styles.userSection}>
            <Pressable
              style={styles.userDropdownTrigger}
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
                color={isDark ? theme.colors.white : theme.colors.gray[700]}
              />
            </Pressable>

            {showUserDropdown && (
              <View style={styles.dropdown}>
                <Pressable 
                  style={styles.dropdownItem}
                  onPress={() => navigation.navigate('Profile' as never)}
                >
                  <Ionicons name="person-outline" size={18} color={theme.colors.gray[700]} />
                  <Text style={styles.dropdownText}>Profile</Text>
                </Pressable>
                <Pressable 
                  style={styles.dropdownItem}
                  onPress={() => navigation.navigate('Settings' as never)}
                >
                  <Ionicons name="settings-outline" size={18} color={theme.colors.gray[700]} />
                  <Text style={styles.dropdownText}>Settings</Text>
                </Pressable>
                <View style={styles.dropdownDivider} />
                <Pressable 
                  style={styles.dropdownItem}
                  onPress={handleLogout}
                >
                  <Ionicons name="log-out-outline" size={18} color={theme.colors.error} />
                  <Text style={[styles.dropdownText, styles.logoutText]}>Logout</Text>
                </Pressable>
              </View>
            )}
          </View>
        ) : (
          <>
            {isGuestMode && (
              <Text style={styles.guestText}>Browsing as Guest</Text>
            )}
            <Button
              title="Sign In"
              variant="ghost"
              size="sm"
              onPress={() => onAuthPress?.('signin')}
              style={styles.authButton}
            />
            <Button
              title="Sign Up"
              variant="primary"
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
        style={styles.hamburger}
        onPress={() => setShowMobileMenu(!showMobileMenu)}
      >
        <Ionicons 
          name={showMobileMenu ? 'close' : 'menu'} 
          size={28} 
          color={isDark ? theme.colors.white : theme.colors.gray[900]}
        />
      </Pressable>

      {showMobileMenu && (
        <Animated.View style={[styles.mobileMenu, mobileMenuStyle]}>
          <ScrollView style={styles.mobileMenuContent}>
            {(isAuthenticated ? authenticatedItems : navItems).map((item) => (
              <Pressable
                key={item.route}
                style={styles.mobileMenuItem}
                onPress={() => {
                  navigation.navigate(item.route as never);
                  setShowMobileMenu(false);
                }}
              >
                <Ionicons 
                  name={item.icon as any} 
                  size={24} 
                  color={isDark ? theme.colors.white : theme.colors.gray[700]}
                />
                <Text style={styles.mobileMenuText}>{item.label}</Text>
              </Pressable>
            ))}

            {isAuthenticated ? (
              <>
                <View style={styles.mobileDivider} />
                <Pressable
                  style={styles.mobileMenuItem}
                  onPress={() => {
                    navigation.navigate('Profile' as never);
                    setShowMobileMenu(false);
                  }}
                >
                  <Ionicons name="person-outline" size={24} color={theme.colors.gray[700]} />
                  <Text style={styles.mobileMenuText}>Profile</Text>
                </Pressable>
                <Pressable
                  style={styles.mobileMenuItem}
                  onPress={handleLogout}
                >
                  <Ionicons name="log-out-outline" size={24} color={theme.colors.error} />
                  <Text style={[styles.mobileMenuText, styles.logoutText]}>Logout</Text>
                </Pressable>
              </>
            ) : (
              <View style={styles.mobileAuthButtons}>
                <Button
                  title="Sign In"
                  variant="secondary"
                  size="md"
                  fullWidth
                  onPress={() => {
                    onAuthPress?.('signin');
                    setShowMobileMenu(false);
                  }}
                  style={styles.mobileAuthButton}
                />
                <Button
                  title="Sign Up"
                  variant="primary"
                  size="md"
                  fullWidth
                  onPress={() => {
                    onAuthPress?.('signup');
                    setShowMobileMenu(false);
                  }}
                />
              </View>
            )}
          </ScrollView>
        </Animated.View>
      )}
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Pressable 
          style={styles.logo}
          onPress={() => navigation.navigate(isAuthenticated ? 'Browse' : 'Landing' as never)}
        >
          <View style={styles.logoIcon}>
            <Text style={styles.logoText}>VA</Text>
          </View>
          <Text style={styles.brandText}>AIVA Marketplace</Text>
        </Pressable>

        {isDesktop ? renderDesktopNav() : renderMobileNav()}
      </View>
    </View>
  );
};

const createStyles = (isDark: boolean, isDesktop: boolean) => StyleSheet.create({
  container: {
    position: Platform.OS === 'web' ? 'sticky' : 'relative',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
    borderBottomWidth: 1,
    borderBottomColor: isDark ? theme.colors.dark.border : theme.colors.gray[200],
    zIndex: 100,
    ...Platform.select({
      web: {
        backdropFilter: 'blur(10px)',
      },
    }),
    ...theme.shadows.sm,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 64,
    paddingHorizontal: isDesktop ? theme.spacing[6] : theme.spacing[3],
    maxWidth: theme.maxContainerWidths.xl,
    marginHorizontal: 'auto',
    width: '100%',
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: theme.colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.white,
  },
  brandText: {
    fontSize: theme.fontSize.lg,
    fontWeight: '700',
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    display: isDesktop ? 'flex' : 'none',
  },
  navItems: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[4],
    flex: 1,
    justifyContent: 'center',
  },
  navItem: {
    paddingVertical: theme.spacing[1],
    paddingHorizontal: theme.spacing[2],
  },
  navItemText: {
    fontSize: theme.fontSize.base,
    fontWeight: '500',
    color: isDark ? theme.colors.gray[200] : theme.colors.gray[700],
    transition: 'color 0.2s',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
  },
  guestText: {
    fontSize: theme.fontSize.sm,
    color: theme.colors.gray[500],
    marginRight: theme.spacing[2],
  },
  authButton: {
    marginRight: theme.spacing[1],
  },
  userSection: {
    position: 'relative',
  },
  userDropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[1],
    padding: theme.spacing[1],
    borderRadius: theme.borderRadius.md,
    cursor: 'pointer',
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    right: 0,
    marginTop: theme.spacing[1],
    backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.white,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.lg,
    minWidth: 200,
    padding: theme.spacing[1],
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[2],
    padding: theme.spacing[2],
    borderRadius: theme.borderRadius.sm,
  },
  dropdownText: {
    fontSize: theme.fontSize.sm,
    color: isDark ? theme.colors.gray[200] : theme.colors.gray[700],
  },
  dropdownDivider: {
    height: 1,
    backgroundColor: isDark ? theme.colors.dark.border : theme.colors.gray[200],
    marginVertical: theme.spacing[1],
  },
  logoutText: {
    color: theme.colors.error,
  },
  hamburger: {
    padding: theme.spacing[1],
  },
  mobileMenu: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    backgroundColor: isDark ? theme.colors.dark.background : theme.colors.white,
    ...theme.shadows.xl,
    maxHeight: '80vh',
  },
  mobileMenuContent: {
    padding: theme.spacing[3],
  },
  mobileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing[3],
    paddingVertical: theme.spacing[3],
    paddingHorizontal: theme.spacing[2],
  },
  mobileMenuText: {
    fontSize: theme.fontSize.base,
    color: isDark ? theme.colors.white : theme.colors.gray[900],
  },
  mobileDivider: {
    height: 1,
    backgroundColor: isDark ? theme.colors.dark.border : theme.colors.gray[200],
    marginVertical: theme.spacing[2],
  },
  mobileAuthButtons: {
    marginTop: theme.spacing[3],
    gap: theme.spacing[2],
  },
  mobileAuthButton: {
    marginBottom: theme.spacing[2],
  },
});