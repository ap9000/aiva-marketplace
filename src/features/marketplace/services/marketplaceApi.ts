import { VA, Category } from '../types';

class MarketplaceApi {
  private mockDelay = () => new Promise(resolve => setTimeout(resolve, 500));

  async getFeaturedVAs(): Promise<VA[]> {
    await this.mockDelay();
    
    return [
      {
        id: '1',
        userId: '1',
        displayName: 'Jane Smith',
        title: 'Executive Assistant',
        bio: 'Experienced executive assistant with 5+ years helping C-suite executives.',
        hourlyRateMin: 35,
        hourlyRateMax: 50,
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
        verified: true,
        rating: 4.9,
        reviewCount: 127,
        categories: ['admin', 'executive'],
        skills: ['Calendar Management', 'Email Management', 'Travel Planning'],
        experience: '5 years',
        availability: 'available',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: '2',
        userId: '2',
        displayName: 'John Davis',
        title: 'Social Media Manager',
        bio: 'Creative social media strategist specializing in brand growth.',
        hourlyRateMin: 25,
        hourlyRateMax: 40,
        avatarUrl: 'https://i.pravatar.cc/150?img=2',
        verified: true,
        rating: 4.8,
        reviewCount: 89,
        categories: ['social-media', 'marketing'],
        skills: ['Content Creation', 'Instagram', 'Facebook Ads'],
        experience: '3 years',
        availability: 'available',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  async getCategories(): Promise<Category[]> {
    await this.mockDelay();
    
    return [
      {
        id: '1',
        name: 'Administrative',
        slug: 'admin',
        icon: 'business-center',
        orderIndex: 1,
      },
      {
        id: '2',
        name: 'Social Media',
        slug: 'social-media',
        icon: 'share',
        orderIndex: 2,
      },
      {
        id: '3',
        name: 'Design',
        slug: 'design',
        icon: 'palette',
        orderIndex: 3,
      },
      {
        id: '4',
        name: 'Customer Support',
        slug: 'support',
        icon: 'support-agent',
        orderIndex: 4,
      },
    ];
  }

  async getVAById(id: string): Promise<VA> {
    await this.mockDelay();
    
    // Mock single VA data
    return {
      id,
      userId: '1',
      displayName: 'Jane Smith',
      title: 'Executive Assistant',
      bio: 'Experienced executive assistant with 5+ years helping C-suite executives manage their busy schedules and maximize productivity.',
      hourlyRateMin: 35,
      hourlyRateMax: 50,
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      verified: true,
      rating: 4.9,
      reviewCount: 127,
      categories: ['admin', 'executive'],
      skills: ['Calendar Management', 'Email Management', 'Travel Planning', 'Meeting Coordination'],
      experience: '5 years',
      availability: 'available',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }
}

export const marketplaceApi = new MarketplaceApi();