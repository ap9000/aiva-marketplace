# FindNewTalent.ai - Complete Platform Pages Specification

## Overview
FindNewTalent.ai is a premium two-sided marketplace with a laboratory/scientific theme, connecting businesses with AI-trained virtual assistants. This spec defines all pages for both web and mobile platforms.

## 🧪 Core Design Language
- **Theme**: Laboratory/Scientific experimentation
- **Visual Metaphors**: VAs as "specimens", matching as "experiments", teams as "lab results"
- **Colors**: Lab purple (#6B46E5), plasma green (#10F4B1), white coat (#F8FAFC)
- **Animations**: Bubbling effects, particle systems, glowing CTAs

## 🛠️ Technical Implementation Plan

### Phase 1: NativeWind v4 Integration
1. **Setup NativeWind v4 (Proper Configuration)**
   - Install NativeWind v4 and dependencies
   - Configure babel.config.js with proper plugin format
   - Set up tailwind.config.js with content paths
   - Configure metro.config.js for CSS processing
   - Create global.css with Tailwind directives
   - Update App.tsx to import styles

2. **Resolve Previous Babel Issues**
   - Use object syntax for NativeWind plugin configuration
   - Ensure plugin is added after 'react-native-reanimated/plugin'
   - Test configuration before proceeding

### Phase 2: React Native Reusables Integration
1. **Core Component Setup**
   - Install @rn-primitives/slot for asChild pattern
   - Set up base components (Button, Card, Input)
   - Configure theme tokens for consistency
   - Create component wrappers with laboratory theme

2. **Component Library Structure**
   ```
   src/components/reusables/
   ├── primitives/           # Base RN Reusables components
   │   ├── button.tsx
   │   ├── card.tsx
   │   ├── input.tsx
   │   └── navigation-menu.tsx
   ├── laboratory/           # Themed wrappers
   │   ├── talent-card.tsx   # VA profile cards
   │   ├── experiment-button.tsx
   │   ├── data-chamber-input.tsx
   │   └── discovery-chamber.tsx
   └── index.ts
   ```

### Phase 3: Page Implementation Order
1. **Foundation Pages** (Week 1)
   - Update existing components to use NativeWind classes
   - Convert TopNavBar to use NavigationMenu component
   - Enhance LandingScreen with laboratory animations
   - Update AuthModal with themed inputs

2. **Core Marketplace Pages** (Week 2)
   - Browse/Discovery with filter sidebar
   - VA Profile with tab navigation
   - Search with AI Concierge chat interface
   - Messages with real-time updates

3. **Client Dashboard Pages** (Week 3)
   - Dashboard with stats grid
   - Project Management table view
   - Team Management with performance metrics
   - Billing & Payments flow

4. **Mobile-Specific Enhancements** (Week 4)
   - Bottom sheet implementations
   - Swipe gestures for navigation
   - Pull-to-refresh on all list views
   - Offline mode for messages

---

## 📱 Mobile-Specific Pages (Bottom Tab Navigation)

### 1. Browse/Discover Screen
**Current Status**: ✅ Basic implementation exists
**Enhancements Needed**:

```typescript
// Mobile Layout
- Sticky search bar with filter button
- Horizontal scrolling category pills
- Grid view (2 columns) of VA cards
- Pull-to-refresh functionality
- Infinite scroll loading

// VA Card Design (Mobile)
- Square aspect ratio for thumbnails
- Compact info: Name, role, rating, price
- Quick action: Heart icon for favorites
- Tap for full profile
```

### 2. Search Screen with AI Concierge
**Current Status**: ⚠️ Basic search exists
**New Design**:

```typescript
// AI Concierge Mode (Default)
- Animated AI avatar at top
- Chat-style interface
- Quick reply buttons:
  - "I need help with admin tasks"
  - "Looking for technical support"
  - "Social media management"
  - "Custom requirements"
- Progressive questions to narrow matches
- "Switch to manual search" toggle

// Manual Search Mode
- Search input with voice option
- Recent searches
- Trending skills
- Saved searches
```

### 3. Add/Post Project Screen
**Current Status**: ❌ Placeholder only
**New Design**:

```typescript
// Project Creation Flow (Mobile)
- Step 1: Project Type
  - One-time task
  - Ongoing support
  - Full-time assistance
  
- Step 2: Category Selection
  - Visual grid with icons
  - Multi-select capability
  
- Step 3: Requirements
  - Budget range slider
  - Timeline picker
  - Skills needed (tags)
  
- Step 4: Description
  - Voice-to-text option
  - Template suggestions
  - File attachments
  
- Step 5: Preview & Post
  - Estimated matches count
  - "Boost visibility" option
```

### 4. Messages/Chat Screen
**Current Status**: ⚠️ Basic implementation
**Enhancements**:

```typescript
// Conversations List
- Unread indicator bubbles
- Last message preview
- Online status indicators
- Swipe actions:
  - Archive
  - Mark unread
  - Delete

// Chat Interface
- Typing indicators
- Read receipts
- Quick actions bar:
  - Schedule call
  - Share file
  - Create task
- Voice messages
- In-chat hiring actions
```

### 5. Profile/Account Screen
**Current Status**: ⚠️ Basic implementation
**New Sections**:

```typescript
// Client Profile
- Stats Dashboard:
  - Active projects
  - Total spent
  - VAs hired
  - Average rating given
  
- Quick Actions:
  - View team
  - Billing & payments
  - Invite colleagues
  
- Settings Menu:
  - Notification preferences
  - Privacy settings
  - Payment methods
  - Help center
```

---

## 🖥️ Web-Specific Pages (Top Navigation)

### 1. Landing Page
**Current Status**: ✅ Basic implementation exists
**Laboratory Theme Enhancements**:

```typescript
// Hero Section
- Animated particle background
- "Where AI Meets Your Perfect Team" headline
- Floating "molecule" trust signals:
  - "500+ Verified VAs"
  - "15-min Average Match"
  - "AI-Powered Matching"
  
// How It Works - "The Experiment Flow"
- 5-step visual timeline:
  1. Hypothesis (Define needs)
  2. Setup (Configure requirements)  
  3. Test (Try candidates)
  4. Analyze (Review matches)
  5. Deploy (Start working)
- Connected by animated particle streams

// Categories Grid
- Hexagonal badges with hover effects
- "Bubbling" animation on hover
- Live VA count per category
```

### 2. Browse/Discovery Page (Desktop)
**Layout**: Split view with filters sidebar

```typescript
// Left Sidebar (300px)
- Search with autocomplete
- Advanced Filters:
  - Availability calendar widget
  - Price range dual slider
  - Skills (searchable multi-select)
  - Experience level
  - Languages
  - Timezone compatibility
  
// Main Content Area
- View toggles: Grid/List/Map
- Sort options dropdown
- VA cards (3-4 columns)
- Hover effects:
  - Card elevation
  - Quick preview
  - Action buttons fade in
```

### 3. VA Profile Page (Desktop)
**Layout**: Two-column with sticky sidebar

```typescript
// Left Column (Sticky)
- Large profile photo with status ring
- Verification badges orbiting
- Rating & reviews summary
- "Test This VA" CTA (glowing)
- "Message" secondary CTA
- Price packages card
- Availability calendar

// Right Column (Scrollable)
- Tab Navigation:
  - Overview (bio, skills hexagon grid)
  - Experience (timeline visualization)
  - Portfolio (masonry grid)
  - Reviews (with filters)
  - Certifications
```

### 4. Client Dashboard
**Current Status**: ❌ Missing
**New Design**:

```typescript
// Dashboard Grid Layout
Row 1: Stats Cards
- Active Projects
- This Month's Spend  
- Team Members
- Pending Reviews

Row 2: Your Laboratory (Team Section)
- Horizontal scroll of current VAs
- Performance metrics per VA
- Quick message buttons

Row 3: Project Management
- Active projects table
- Status indicators
- Quick actions menu

Row 4: Quick Actions
- "Start New Experiment" (Post project)
- "Browse Talent Pool"
- "AI Concierge"
```

### 5. Project Management Page
**Current Status**: ❌ Missing

```typescript
// Projects Table View
- Columns:
  - Project name
  - Assigned VA(s)
  - Status (color-coded)
  - Progress bar
  - Due date
  - Actions
  
// Project Detail Modal
- Milestone tracker
- Time tracking widget
- File attachments
- Discussion thread
- Payment history
```

### 6. Team Management Page
**Current Status**: ❌ Missing

```typescript
// Team Overview
- Grid view of all VAs (past & present)
- Filters:
  - Active/Inactive
  - By skill
  - By project
  
// VA Performance Card
- Total hours worked
- Projects completed
- Average rating
- Rehire button
- Performance graph
```

### 7. Billing & Payments
**Current Status**: ❌ Missing

```typescript
// Billing Dashboard
- Current balance
- Upcoming payments
- Payment methods
- Transaction history
- Download invoices

// Payment Flow
- Escrow visualization
- Milestone payments
- Auto-pay settings
- Dispute resolution
```

---

## 🔄 Platform-Specific Features

### Mobile-Only Features
1. **Bottom sheet modals** instead of popups
2. **Swipe gestures** for navigation
3. **Biometric authentication**
4. **Push notifications** with rich previews
5. **Offline mode** for messages
6. **Camera integration** for document uploads

### Web-Only Features
1. **Keyboard shortcuts** (Cmd+K for search)
2. **Drag-and-drop** file uploads
3. **Multi-tab support** for comparing VAs
4. **Advanced filtering** with saved presets
5. **Bulk actions** for team management
6. **Export capabilities** (CSV, PDF reports)
7. **Browser notifications**

### Responsive Breakpoints
```scss
// Mobile: 320px - 767px
// Tablet: 768px - 1023px  
// Desktop: 1024px+
// Wide: 1440px+

// Container max-widths
$container-mobile: 100%;
$container-tablet: 750px;
$container-desktop: 1200px;
$container-wide: 1440px;
```

---

## 🎨 Component Specifications

### Laboratory Card System
```scss
.talent-card {
  background: $white-coat;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(10, 14, 26, 0.08);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(107, 70, 229, 0.15);
    
    .card__glow {
      opacity: 1;
      animation: pulseGlow 2s infinite;
    }
  }
}
```

### Button Styles - "Catalyst Actions"
```scss
.btn-experiment {
  background: linear-gradient(135deg, #6B46E5 0%, #4338CA 100%);
  color: white;
  padding: 12px 24px;
  border-radius: 12px;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(16, 244, 177, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }
  
  &:active::before {
    width: 300px;
    height: 300px;
  }
}
```

### Loading States - "Experiment in Progress"
```scss
.loading-experiment {
  .bubbles {
    display: flex;
    gap: 8px;
    
    .bubble {
      width: 12px;
      height: 12px;
      background: $lab-purple;
      border-radius: 50%;
      animation: bubble-rise 1.5s ease-in-out infinite;
      
      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }
}

@keyframes bubble-rise {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(-20px); opacity: 1; }
}
```

---

## 📊 Data Tables (Web)

### VA Comparison Table
```typescript
// Columns
- Photo & Name
- Specializations (badges)
- Hourly Rate
- Availability
- Rating
- Total Reviews
- Response Time
- Languages
- Action Buttons

// Features
- Sticky header
- Sortable columns
- Inline preview on hover
- Bulk selection
- Export to CSV
```

---

## 🔔 Notification System

### Mobile Notifications
- Rich push notifications with VA photos
- Action buttons: "View Profile", "Message"
- Grouped by type (messages, matches, updates)

### Web Notifications
- Toast notifications (top-right)
- Notification center dropdown
- Browser push notifications
- Email digest options

---

## 🎯 Implementation Details

### NativeWind v4 Configuration
```javascript
// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      ['nativewind/babel', { mode: 'compileOnly' }] // Proper v4 syntax
    ]
  };
};

// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

module.exports = withNativeWind(config, { input: './global.css' });

// tailwind.config.js
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        'lab-purple': '#6B46E5',
        'plasma-green': '#10F4B1',
        'white-coat': '#F8FAFC',
        'titanium': '#E1E8ED',
        'carbon-black': '#0A0E1A',
        'silver': '#6B7280',
      },
      animation: {
        'bubble-float': 'bubbleFloat 3s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'particle-drift': 'particleDrift 10s linear infinite',
      }
    }
  }
};
```

### React Native Reusables Integration Example
```typescript
// src/components/reusables/laboratory/talent-card.tsx
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Card, CardContent, CardHeader } from '../primitives/card';
import { cn } from '@/lib/utils';

interface TalentCardProps {
  va: {
    id: string;
    name: string;
    role: string;
    rating: number;
    price: string;
    image: string;
    skills: string[];
    verified: boolean;
  };
  onPress?: () => void;
  className?: string;
}

export function TalentCard({ va, onPress, className }: TalentCardProps) {
  return (
    <Card 
      className={cn(
        "bg-white-coat border-titanium hover:border-lab-purple",
        "hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
        "group cursor-pointer",
        className
      )}
      asChild
    >
      <Pressable onPress={onPress}>
        <CardHeader className="p-0">
          <View className="relative aspect-video overflow-hidden rounded-t-lg">
            {/* Image with gradient overlay */}
            <View className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
            {va.verified && (
              <View className="absolute top-2 right-2 z-20 bg-plasma-green rounded-full p-1">
                <Text className="text-xs font-bold text-carbon-black">✓</Text>
              </View>
            )}
          </View>
        </CardHeader>
        <CardContent className="p-4">
          <Text className="text-lg font-semibold text-carbon-black">{va.name}</Text>
          <Text className="text-sm text-silver mb-2">{va.role}</Text>
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center gap-1">
              <Text className="text-lab-purple">★</Text>
              <Text className="text-sm font-medium">{va.rating}</Text>
            </View>
            <Text className="text-lab-purple font-semibold">{va.price}</Text>
          </View>
          <View className="flex-row flex-wrap gap-1 mt-3">
            {va.skills.slice(0, 3).map((skill, i) => (
              <View key={i} className="bg-lab-purple/10 px-2 py-1 rounded-full">
                <Text className="text-xs text-lab-purple">{skill}</Text>
              </View>
            ))}
          </View>
        </CardContent>
      </Pressable>
    </Card>
  );
}
```

### Platform-Specific Navigation Setup
```typescript
// src/navigation/NavigationContainer.tsx
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { WebNavigator } from './WebNavigator';
import { MobileNavigator } from './MobileNavigator';

export function AppNavigator() {
  return (
    <NavigationContainer>
      {Platform.OS === 'web' ? <WebNavigator /> : <MobileNavigator />}
    </NavigationContainer>
  );
}
```

## 🎯 Next Steps

1. **Immediate Actions**:
   - Install NativeWind v4 with proper configuration
   - Set up React Native Reusables base components
   - Create laboratory-themed component wrappers
   - Test Babel configuration thoroughly

2. **Migration Path**:
   - Convert existing StyleSheet components to NativeWind gradually
   - Start with simple components (Button, Card)
   - Move to complex layouts (TopNavBar, LandingScreen)
   - Ensure web/mobile responsive classes work

3. **Quality Assurance**:
   - Test on iOS, Android, and Web platforms
   - Verify animations and transitions
   - Check accessibility with screen readers
   - Performance testing with React DevTools

This specification ensures FindNewTalent.ai delivers a cohesive, scientifically-themed experience across all platforms while maintaining platform-specific best practices and avoiding previous Babel configuration issues.