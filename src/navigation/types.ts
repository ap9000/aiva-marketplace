import { NavigatorScreenParams } from '@react-navigation/native';

// Root Stack
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// Auth Stack
export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: { userType?: 'client' | 'va' };
  Onboarding: undefined;
  AuthMethod: { method: 'google' | 'apple' };
};

// Main Tab Navigator
export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Search: NavigatorScreenParams<SearchStackParamList>;
  Add: undefined;
  Messages: NavigatorScreenParams<MessagingStackParamList>;
  Profile: NavigatorScreenParams<ProfileStackParamList>;
};

// Home Stack
export type HomeStackParamList = {
  Browse: undefined;
  VAProfile: { vaId: string };
  Category: { categoryId: string; categoryName: string };
};

// Search Stack
export type SearchStackParamList = {
  SearchScreen: undefined;
  SearchResults: { query: string; filters?: any };
  VAProfile: { vaId: string };
};

// Messaging Stack
export type MessagingStackParamList = {
  Conversations: undefined;
  Chat: { conversationId: string; recipientName: string };
};

// Profile Stack
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Help: undefined;
};