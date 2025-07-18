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
  UserTypeSelection: undefined;
  ClientOnboarding: undefined;
  VAApplication: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  Home: NavigatorScreenParams<HomeStackParamList>;
  Search: NavigatorScreenParams<SearchStackParamList>;
  Projects: NavigatorScreenParams<ProjectStackParamList>;
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

// Project Stack
export type ProjectStackParamList = {
  ProjectDashboard: undefined;
  ProjectPosting: undefined;
  ProjectDetail: { projectId: string };
  TeamManagement: undefined;
};

// Messaging Stack
export type MessagingStackParamList = {
  Conversations: undefined;
  Chat: { conversationId: string; recipientName: string };
  Notifications: undefined;
};

// Profile Stack
export type ProfileStackParamList = {
  ProfileScreen: undefined;
  EditProfile: undefined;
  Settings: undefined;
  Help: undefined;
  Billing: undefined;
};