export interface User {
  id: string;
  email: string;
  phone: string;
  userType: 'client' | 'va';
  displayName: string;
  avatarUrl?: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  phone: string;
  password: string;
  userType: 'client' | 'va';
  displayName: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}