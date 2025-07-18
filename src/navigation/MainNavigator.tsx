import React from 'react';
import { Platform } from 'react-native';
import { useResponsive } from '../shared/hooks/useResponsive';
import MobileNavigator from './MobileNavigator';
import WebNavigator from './WebNavigator';

export default function MainNavigator() {
  const { isWeb, isDesktop } = useResponsive();
  
  // Use web navigator for desktop web, mobile navigator for everything else
  if (isWeb && isDesktop) {
    return <WebNavigator />;
  }
  
  return <MobileNavigator />;
}