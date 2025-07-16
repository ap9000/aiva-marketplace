import { LoginCredentials, RegisterData, AuthResponse, User } from '../types';

// Mock API service - replace with actual API calls
class AuthApi {
  private mockDelay = () => new Promise(resolve => setTimeout(resolve, 1000));

  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await this.mockDelay();
    
    // Mock validation
    if (!credentials.email || !credentials.password) {
      throw new Error('Email and password are required');
    }

    // Mock response
    return {
      user: {
        id: '1',
        email: credentials.email,
        phone: '+1234567890',
        userType: 'client',
        displayName: 'John Doe',
        verified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      tokens: {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
      },
    };
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    await this.mockDelay();
    
    // Mock validation
    if (!data.email || !data.password || !data.phone) {
      throw new Error('All fields are required');
    }

    // Mock response
    return {
      user: {
        id: '2',
        email: data.email,
        phone: data.phone,
        userType: data.userType,
        displayName: data.displayName,
        verified: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      tokens: {
        accessToken: 'mock-access-token',
        refreshToken: 'mock-refresh-token',
        expiresIn: 3600,
      },
    };
  }

  async logout(): Promise<void> {
    await this.mockDelay();
    // Mock logout
  }

  async getCurrentUser(token: string): Promise<User> {
    await this.mockDelay();
    
    // Mock user data
    return {
      id: '1',
      email: 'user@example.com',
      phone: '+1234567890',
      userType: 'client',
      displayName: 'John Doe',
      verified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    await this.mockDelay();
    
    // Mock token refresh
    return {
      user: {
        id: '1',
        email: 'user@example.com',
        phone: '+1234567890',
        userType: 'client',
        displayName: 'John Doe',
        verified: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      tokens: {
        accessToken: 'new-mock-access-token',
        refreshToken: 'new-mock-refresh-token',
        expiresIn: 3600,
      },
    };
  }
}

export const authApi = new AuthApi();