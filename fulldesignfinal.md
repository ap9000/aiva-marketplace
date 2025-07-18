# AIVA Marketplace - Complete Design & Implementation Specification

## 1. Executive Summary

AIVA Marketplace is a modern two-sided marketplace connecting businesses with AI-trained Virtual Assistants. The platform combines a scientific "laboratory" theme with clean, modern design patterns inspired by leading tech companies and Airbnb's intuitive card-based layouts.

### Current Status
- **Tamagui UI Framework**: Successfully migrated from NativeWind
- **Core Pages**: Search (AI Concierge), Browse, Pricing, How It Works completed
- **Design System**: Laboratory theme with purple/green color palette established
- **Navigation**: Responsive web/mobile navigation patterns implemented

### Remaining Work
- Complete 8 major pages with modern designs
- Enhance messaging and real-time features
- Implement project management workflows
- Build team collaboration tools

---

## 2. Current State Analysis

### ✅ Fully Implemented Pages
1. **SearchScreen** (`src/features/search/screens/SearchScreen.tsx`)
   - AI Concierge chat interface with animated avatar
   - Manual search mode with filters
   - Quick reply buttons and trending skills
   - Responsive design with proper spacing

2. **BrowseScreen** (`src/features/marketplace/screens/BrowseScreen.tsx`)
   - Category grid with Lucide icons
   - VA card components with animations
   - Filter system and search integration

3. **WelcomeScreen** (`src/features/auth/screens/WelcomeScreen.tsx`)
   - Authentication options with social login
   - Animated logo and floating effects
   - Responsive split-screen design

4. **PricingScreen** (`src/features/static/screens/PricingScreen.tsx`)
   - Three-tier pricing with laboratory theme
   - Comparison table and feature lists
   - Animated cards with hover effects

5. **HowItWorksScreen** (`src/features/static/screens/HowItWorksScreen.tsx`)
   - 5-step process visualization
   - Floating trust signals
   - Interactive timeline design

### ⚠️ Partially Implemented Pages
1. **ConversationsScreen** - Basic structure exists, needs enhancement
2. **ChatScreen** - Basic messaging, needs real-time features
3. **ProfileScreen** - Basic layout, needs content and functionality
4. **VAProfileScreen** - Placeholder implementation

### ❌ Missing Pages
1. **ProjectPostingScreen** (AddScreen enhancement)
2. **ProjectDashboard** 
3. **TeamManagementScreen**
4. **BillingScreen**
5. **EditProfileScreen** 
6. **NotificationsScreen**

---

## 3. Design System Foundation

### 3.1 Current Tamagui Configuration

**Colors** (from `tamagui.config.ts`):
```typescript
const colors = {
  // Laboratory theme
  labPurple: '#6B46E5',
  plasmaGreen: '#10F4B1', 
  whiteCoat: '#F8FAFC',
  titanium: '#E1E8ED',
  carbonBlack: '#0A0E1A',
  silver: '#6B7280',
  
  // Functional colors
  background: '#FFFFFF',
  backgroundSoft: '#F8FAFC',
  primaryPress: '#5B3CD4',
  primaryHover: '#7C5CE8'
}
```

**Typography Scale**:
- `$1`: 11px (captions)
- `$2`: 12px (small text)
- `$3`: 14px (body text)
- `$4`: 16px (default)
- `$5`: 18px (large text)
- `$6`: 20px (headings)
- `$8`: 24px (large headings)
- `$10`: 32px (hero text)

**Spacing System**:
- `$1`: 4px
- `$2`: 8px  
- `$3`: 12px
- `$4`: 16px
- `$5`: 20px
- `$6`: 24px
- `$8`: 32px

### 3.2 Component Patterns

**Card System**:
```typescript
// Standard card with laboratory aesthetics
<Card 
  backgroundColor="$whiteCoat"
  borderColor="$titanium" 
  borderWidth={1}
  borderRadius="$4"
  shadowColor="$labPurple"
  shadowOpacity={0.1}
  shadowRadius={10}
  hoverStyle={{
    borderColor: '$labPurple',
    shadowOpacity: 0.2,
    shadowRadius: 20
  }}
/>
```

**Button Variants**:
```typescript
// Primary laboratory button
<Button
  backgroundColor="$labPurple"
  color="$whiteCoat"
  borderRadius="$4"
  pressStyle={{ backgroundColor: '$primaryPress' }}
  hoverStyle={{ backgroundColor: '$primaryHover' }}
/>

// Secondary with plasma accent
<Button
  backgroundColor="transparent"
  borderColor="$plasmaGreen"
  borderWidth={2}
  color="$plasmaGreen"
/>
```

---

## 4. Complete Page Specifications

### 4.1 Enhanced ConversationsScreen

**Current Status**: Basic list implementation exists
**Enhancement Plan**: Modern messaging interface with Airbnb-inspired layout

```typescript
// Layout Structure
┌─────────────────────────────────────────────┐
│ Header: "Messages" + Search + Filter        │
├─────────────────────────────────────────────┤
│ Active Conversations (Horizontal Scroll)    │
├─────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────┐ │
│ │ Conversation Item                       │ │
│ │ ├─ Avatar + Online Status              │ │  
│ │ ├─ Name + Last Message Preview        │ │
│ │ ├─ Timestamp + Unread Badge           │ │
│ │ └─ Project Context (if applicable)     │ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │ Conversation Item...                    │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

**Key Features**:
- **Search & Filter**: Real-time search, filter by unread/archived
- **Swipe Actions**: Archive, mark unread, delete
- **Active Chats**: Horizontal scroll of recent conversations
- **Rich Previews**: Message content, file attachments, project context
- **Status Indicators**: Online/offline, typing, read receipts

**Design Elements**:
```typescript
// Conversation Card
<Card
  backgroundColor="$whiteCoat"
  padding="$4"
  marginVertical="$2"
  borderRadius="$4"
  pressStyle={{ backgroundColor: '$backgroundSoft' }}
>
  <XStack alignItems="center" gap="$3">
    {/* Avatar with status ring */}
    <YStack position="relative">
      <Avatar size="$6" />
      <View 
        position="absolute"
        bottom={0}
        right={0}
        width={16}
        height={16}
        borderRadius={8}
        backgroundColor="$plasmaGreen" // Online status
        borderWidth={2}
        borderColor="$background"
      />
    </YStack>
    
    {/* Content */}
    <YStack flex={1}>
      <XStack justifyContent="space-between" alignItems="center">
        <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
          {conversation.name}
        </Text>
        <Text fontSize="$2" color="$silver">
          {formatTime(conversation.lastMessage.timestamp)}
        </Text>
      </XStack>
      
      <Text 
        fontSize="$3" 
        color="$silver" 
        numberOfLines={1}
        marginTop="$1"
      >
        {conversation.lastMessage.preview}
      </Text>
      
      {conversation.project && (
        <Badge 
          backgroundColor="$labPurple"
          color="$whiteCoat"
          marginTop="$2"
          alignSelf="flex-start"
        >
          {conversation.project.title}
        </Badge>
      )}
    </YStack>
    
    {/* Unread indicator */}
    {conversation.unreadCount > 0 && (
      <View
        backgroundColor="$labPurple"
        borderRadius={12}
        paddingHorizontal="$2"
        paddingVertical="$1"
        minWidth={24}
        alignItems="center"
      >
        <Text color="$whiteCoat" fontSize="$2" fontWeight="600">
          {conversation.unreadCount}
        </Text>
      </View>
    )}
  </XStack>
</Card>
```

### 4.2 Enhanced ChatScreen

**Current Status**: Basic messaging layout
**Enhancement Plan**: Professional chat interface with hiring workflow integration

```typescript
// Layout Structure  
┌─────────────────────────────────────────────┐
│ Header: Contact Info + Actions              │
├─────────────────────────────────────────────┤
│ Project Context Bar (if applicable)         │
├─────────────────────────────────────────────┤
│ Messages Container (Scrollable)             │
│ ┌─────────────────────────────────────────┐ │
│ │ Message Bubble (User/VA)                │ │
│ │ ┌─ Content + Timestamp                 │ │  
│ │ ├─ File Attachments                   │ │
│ │ └─ Quick Actions (if VA message)      │ │
│ └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│ Typing Indicator (when active)              │
├─────────────────────────────────────────────┤
│ Input: Text + Attachments + Voice + Send    │
└─────────────────────────────────────────────┘
```

**Key Features**:
- **Rich Messages**: Text, files, voice notes, project attachments
- **Quick Actions**: Schedule call, create task, make offer, hire VA
- **Project Integration**: Link messages to specific projects
- **Professional Tools**: Contract templates, milestone tracking
- **Real-time**: Typing indicators, read receipts, online status

**Message Bubble Design**:
```typescript
// VA Message (left-aligned)
<Animated.View
  entering={FadeInLeft.delay(index * 50)}
  style={{ alignSelf: 'flex-start', maxWidth: '80%' }}
>
  <Card
    backgroundColor="$whiteCoat"
    borderColor="$titanium"
    borderWidth={1}
    borderRadius={18}
    borderBottomLeftRadius={6}
    padding="$4"
    marginVertical="$2"
  >
    <Text fontSize="$4" color="$carbonBlack">
      {message.content}
    </Text>
    
    {message.quickActions && (
      <XStack gap="$2" marginTop="$3" flexWrap="wrap">
        <Button size="$3" variant="outline">
          Schedule Call
        </Button>
        <Button size="$3" backgroundColor="$labPurple">
          Make Offer
        </Button>
      </XStack>
    )}
    
    <Text fontSize="$2" color="$silver" marginTop="$2">
      {formatTime(message.timestamp)}
    </Text>
  </Card>
</Animated.View>

// User Message (right-aligned)  
<Animated.View
  entering={FadeInRight.delay(index * 50)}
  style={{ alignSelf: 'flex-end', maxWidth: '80%' }}
>
  <Card
    backgroundColor="$labPurple"
    borderRadius={18}
    borderBottomRightRadius={6}
    padding="$4"
    marginVertical="$2"
  >
    <Text fontSize="$4" color="$whiteCoat">
      {message.content}
    </Text>
    
    <XStack justifyContent="space-between" alignItems="center" marginTop="$2">
      <Text fontSize="$2" color="rgba(255,255,255,0.8)">
        {formatTime(message.timestamp)}
      </Text>
      {message.readReceipt && (
        <CheckCircle size={16} color="$plasmaGreen" />
      )}
    </XStack>
  </Card>
</Animated.View>
```

### 4.3 ProjectPostingScreen (Enhanced AddScreen)

**Current Status**: Placeholder implementation
**New Design**: Multi-step project creation with modern UX

```typescript
// Step Progress Indicator
┌─────────────────────────────────────────────┐
│ ● ─── ○ ─── ○ ─── ○ ─── ○                  │
│ Type  Details Budget Timeline Review        │
└─────────────────────────────────────────────┘

// Step 1: Project Type Selection
┌─────────────────────────────────────────────┐
│ What type of project do you need help with? │
├─────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐             │
│ │ One-time    │ │ Ongoing     │             │
│ │ Task        │ │ Support     │             │
│ │ [Icon]      │ │ [Icon]      │             │
│ └─────────────┘ └─────────────┘             │
│ ┌─────────────┐ ┌─────────────┐             │
│ │ Full-time   │ │ Specialized │             │
│ │ Assistant   │ │ Project     │             │
│ │ [Icon]      │ │ [Icon]      │             │
│ └─────────────┘ └─────────────┘             │
└─────────────────────────────────────────────┘
```

**Step-by-Step Flow**:

1. **Project Type** - Visual selection cards
2. **Category & Skills** - Multi-select with search
3. **Budget & Timeline** - Range sliders with live estimates
4. **Description** - Rich text editor with templates
5. **Requirements** - Experience level, languages, availability
6. **Review & Post** - Preview with estimated matches

**Budget Slider Component**:
```typescript
<YStack gap="$4">
  <Text fontSize="$5" fontWeight="600" color="$carbonBlack">
    What's your budget?
  </Text>
  
  <Card backgroundColor="$backgroundSoft" padding="$5" borderRadius="$4">
    <YStack gap="$3">
      <XStack justifyContent="space-between">
        <Text fontSize="$3" color="$silver">Hourly Rate</Text>
        <Text fontSize="$4" fontWeight="600" color="$labPurple">
          ${budgetRange[0]} - ${budgetRange[1]}/hr
        </Text>
      </XStack>
      
      {/* Custom dual slider component */}
      <RangeSlider
        min={5}
        max={100}
        step={5}
        values={budgetRange}
        onValuesChange={setBudgetRange}
        trackColor="$titanium"
        thumbColor="$labPurple"
        activeTrackColor="$labPurple"
      />
      
      <Text fontSize="$3" color="$silver" textAlign="center">
        Estimated {estimatedVAs} VAs match this budget
      </Text>
    </YStack>
  </Card>
</YStack>
```

### 4.4 ProjectDashboard

**New Page**: Central hub for project management
**Inspiration**: Blend of Notion and Linear project views

```typescript
// Dashboard Layout
┌─────────────────────────────────────────────┐
│ Header: "Projects" + New Project Button     │
├─────────────────────────────────────────────┤
│ Stats Row                                   │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│ │Active: 3│ │Review: 1│ │Done: 12 │        │
│ └─────────┘ └─────────┘ └─────────┘        │
├─────────────────────────────────────────────┤
│ Filter Tabs: All | Active | Review | Done   │
├─────────────────────────────────────────────┤
│ Project Cards Grid                          │
│ ┌─────────────────────────────────────────┐ │
│ │ Project Card                            │ │
│ │ ├─ Title + Status Badge               │ │
│ │ ├─ Assigned VA(s) + Avatars          │ │
│ │ ├─ Progress Bar + Milestones         │ │
│ │ ├─ Budget Spent / Total              │ │
│ │ └─ Last Updated + Quick Actions      │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

**Project Card Component**:
```typescript
<Card
  backgroundColor="$whiteCoat"
  borderColor="$titanium"
  borderWidth={1}
  borderRadius="$4"
  padding="$5"
  shadowColor="$shadowColor"
  shadowOpacity={0.05}
  shadowRadius={10}
  hoverStyle={{
    borderColor: '$labPurple',
    shadowOpacity: 0.15,
    transform: [{ translateY: -2 }]
  }}
>
  {/* Header */}
  <XStack justifyContent="space-between" alignItems="flex-start" marginBottom="$3">
    <YStack flex={1}>
      <Text fontSize="$5" fontWeight="600" color="$carbonBlack">
        {project.title}
      </Text>
      <Text fontSize="$3" color="$silver" marginTop="$1">
        {project.category}
      </Text>
    </YStack>
    
    <Badge 
      backgroundColor={getStatusColor(project.status)}
      color="$whiteCoat"
      textTransform="uppercase"
      fontSize="$2"
    >
      {project.status}
    </Badge>
  </XStack>
  
  {/* Assigned VAs */}
  <XStack alignItems="center" gap="$2" marginBottom="$3">
    <Text fontSize="$3" color="$silver">Team:</Text>
    <XStack gap="$2">
      {project.assignedVAs.map((va) => (
        <Avatar key={va.id} size="$4" source={{ uri: va.avatar }} />
      ))}
    </XStack>
    <Text fontSize="$3" color="$carbonBlack" fontWeight="500">
      {project.assignedVAs.map(va => va.name).join(', ')}
    </Text>
  </XStack>
  
  {/* Progress */}
  <YStack gap="$2" marginBottom="$3">
    <XStack justifyContent="space-between">
      <Text fontSize="$3" color="$silver">Progress</Text>
      <Text fontSize="$3" color="$carbonBlack" fontWeight="600">
        {project.completedMilestones}/{project.totalMilestones} milestones
      </Text>
    </XStack>
    
    <View backgroundColor="$backgroundSoft" height={8} borderRadius={4}>
      <View
        backgroundColor="$plasmaGreen"
        height={8}
        borderRadius={4}
        width={`${(project.completedMilestones / project.totalMilestones) * 100}%`}
      />
    </View>
  </YStack>
  
  {/* Budget & Timeline */}
  <XStack justifyContent="space-between" marginBottom="$4">
    <YStack>
      <Text fontSize="$3" color="$silver">Budget</Text>
      <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
        ${project.spent} / ${project.budget}
      </Text>
    </YStack>
    
    <YStack alignItems="flex-end">
      <Text fontSize="$3" color="$silver">Due Date</Text>
      <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
        {formatDate(project.dueDate)}
      </Text>
    </YStack>
  </XStack>
  
  {/* Quick Actions */}
  <XStack gap="$2">
    <Button flex={1} variant="outline" size="$3">
      View Details
    </Button>
    <Button flex={1} backgroundColor="$labPurple" size="$3">
      Message Team
    </Button>
  </XStack>
</Card>
```

### 4.5 TeamManagementScreen

**New Page**: Team overview and performance management
**Inspiration**: GitHub contributors view + Slack team directory

```typescript
// Team Layout
┌─────────────────────────────────────────────┐
│ Header: "Your Team" + Invite Button         │
├─────────────────────────────────────────────┤
│ Team Stats                                  │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│ │Active: 5│ │Hours: 120│ │Rating: 4.8│     │
│ └─────────┘ └─────────┘ └─────────┘        │
├─────────────────────────────────────────────┤
│ Filter: All | Active | Past | Favorites     │
├─────────────────────────────────────────────┤
│ VA Cards Grid                               │
│ ┌─────────────────────────────────────────┐ │
│ │ Team Member Card                        │ │
│ │ ├─ Photo + Status + Favorite Star     │ │
│ │ ├─ Name + Role + Rating              │ │
│ │ ├─ Current Projects + Hours           │ │
│ │ ├─ Performance Metrics               │ │
│ │ └─ Actions: Message | Rehire | Rate   │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

**Team Member Card**:
```typescript
<Card
  backgroundColor="$whiteCoat"
  borderColor="$titanium"
  borderWidth={1}
  borderRadius="$4"
  padding="$4"
  hoverStyle={{
    borderColor: '$labPurple',
    shadowColor: '$labPurple',
    shadowOpacity: 0.1,
    shadowRadius: 15
  }}
>
  {/* Header with photo and status */}
  <XStack gap="$3" alignItems="center" marginBottom="$3">
    <YStack position="relative">
      <Avatar size="$8" source={{ uri: member.avatar }} />
      <View
        position="absolute"
        bottom={2}
        right={2}
        width={20}
        height={20}
        borderRadius={10}
        backgroundColor={member.isOnline ? '$plasmaGreen' : '$silver'}
        borderWidth={2}
        borderColor="$background"
      />
    </YStack>
    
    <YStack flex={1}>
      <XStack alignItems="center" justifyContent="space-between">
        <Text fontSize="$5" fontWeight="600" color="$carbonBlack">
          {member.name}
        </Text>
        <Pressable onPress={() => toggleFavorite(member.id)}>
          <Star 
            size={20} 
            color={member.isFavorite ? '$plasmaGreen' : '$silver'}
            fill={member.isFavorite ? '$plasmaGreen' : 'transparent'}
          />
        </Pressable>
      </XStack>
      
      <Text fontSize="$3" color="$silver" marginBottom="$1">
        {member.role}
      </Text>
      
      <XStack alignItems="center" gap="$2">
        <XStack alignItems="center" gap="$1">
          <Star size={16} color="$plasmaGreen" fill="$plasmaGreen" />
          <Text fontSize="$3" fontWeight="600" color="$carbonBlack">
            {member.rating}
          </Text>
        </XStack>
        <Text fontSize="$3" color="$silver">
          ({member.reviewCount} reviews)
        </Text>
      </XStack>
    </YStack>
  </XStack>
  
  {/* Current work */}
  <YStack gap="$2" marginBottom="$3">
    <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
      Current Projects
    </Text>
    {member.currentProjects.map((project) => (
      <XStack key={project.id} justifyContent="space-between" alignItems="center">
        <Text fontSize="$3" color="$carbonBlack">
          {project.title}
        </Text>
        <Badge backgroundColor="$backgroundSoft" color="$labPurple">
          {project.hoursThisWeek}h this week
        </Badge>
      </XStack>
    ))}
  </YStack>
  
  {/* Performance metrics */}
  <Card backgroundColor="$backgroundSoft" padding="$3" marginBottom="$3">
    <XStack justifyContent="space-around">
      <YStack alignItems="center">
        <Text fontSize="$2" color="$silver">Total Hours</Text>
        <Text fontSize="$4" fontWeight="600" color="$labPurple">
          {member.totalHours}
        </Text>
      </YStack>
      <YStack alignItems="center">
        <Text fontSize="$2" color="$silver">Projects</Text>
        <Text fontSize="$4" fontWeight="600" color="$labPurple">
          {member.completedProjects}
        </Text>
      </YStack>
      <YStack alignItems="center">
        <Text fontSize="$2" color="$silver">Response</Text>
        <Text fontSize="$4" fontWeight="600" color="$labPurple">
          {member.avgResponseTime}
        </Text>
      </YStack>
    </XStack>
  </Card>
  
  {/* Actions */}
  <XStack gap="$2">
    <Button flex={1} variant="outline" size="$3">
      <MessageCircle size={16} />
      Message
    </Button>
    <Button flex={1} backgroundColor="$labPurple" size="$3">
      Rehire
    </Button>
  </XStack>
</Card>
```

### 4.6 Enhanced ProfileScreen

**Current Status**: Basic layout exists
**Enhancement Plan**: Comprehensive user dashboard

```typescript
// Profile Layout
┌─────────────────────────────────────────────┐
│ Header: Profile Photo + Basic Info          │
├─────────────────────────────────────────────┤
│ Stats Dashboard                             │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│ │Projects │ │Team Size│ │Spent    │        │
│ └─────────┘ └─────────┘ └─────────┘        │
├─────────────────────────────────────────────┤
│ Quick Actions Grid                          │
│ ┌─────────────┐ ┌─────────────┐            │
│ │Manage Team  │ │View Projects│            │
│ │[Icon]       │ │[Icon]       │            │
│ └─────────────┘ └─────────────┘            │
│ ┌─────────────┐ ┌─────────────┐            │
│ │Billing      │ │Settings     │            │
│ │[Icon]       │ │[Icon]       │            │
│ └─────────────┘ └─────────────┘            │
├─────────────────────────────────────────────┤
│ Recent Activity Feed                        │
│ ┌─────────────────────────────────────────┐ │
│ │Activity Item + Timestamp                │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

**Profile Header**:
```typescript
<Card backgroundColor="$whiteCoat" padding="$6" borderRadius="$4">
  <XStack gap="$4" alignItems="center">
    <YStack position="relative">
      <Avatar size="$12" source={{ uri: user.avatar }} />
      <Pressable
        position="absolute"
        bottom={0}
        right={0}
        backgroundColor="$labPurple"
        borderRadius={20}
        width={40}
        height={40}
        alignItems="center"
        justifyContent="center"
        borderWidth={3}
        borderColor="$background"
      >
        <Camera size={20} color="$whiteCoat" />
      </Pressable>
    </YStack>
    
    <YStack flex={1}>
      <Text fontSize="$7" fontWeight="700" color="$carbonBlack">
        {user.name}
      </Text>
      <Text fontSize="$4" color="$silver" marginBottom="$2">
        {user.company} • {user.role}
      </Text>
      
      <XStack alignItems="center" gap="$3">
        <Badge backgroundColor="$plasmaGreen" color="$carbonBlack">
          ✓ Verified
        </Badge>
        <Text fontSize="$3" color="$silver">
          Member since {formatDate(user.joinDate)}
        </Text>
      </XStack>
    </YStack>
    
    <Button backgroundColor="$labPurple" size="$4">
      Edit Profile
    </Button>
  </XStack>
</Card>
```

### 4.7 BillingScreen

**New Page**: Payment management and billing overview
**Inspiration**: Stripe Dashboard + GitHub billing

```typescript
// Billing Layout
┌─────────────────────────────────────────────┐
│ Header: "Billing" + Add Payment Method      │
├─────────────────────────────────────────────┤
│ Current Balance & Upcoming Payments         │
│ ┌─────────────┐ ┌─────────────┐            │
│ │Balance: $500│ │Due: $120    │            │
│ └─────────────┘ └─────────────┘            │
├─────────────────────────────────────────────┤
│ Payment Methods                             │
│ ┌─────────────────────────────────────────┐ │
│ │ •••• •••• •••• 4242 [Visa] [Default]   │ │
│ │ [Edit] [Remove]                         │ │
│ └─────────────────────────────────────────┘ │
├─────────────────────────────────────────────┤
│ Transaction History                         │
│ ┌─────────────────────────────────────────┐ │
│ │Date | Project | VA | Amount | Status    │ │
│ │07/18| Website | John | $240 | Paid     │ │
│ │07/15| Logo    | Mary | $80  | Pending  │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

**Payment Method Card**:
```typescript
<Card
  backgroundColor="$whiteCoat"
  borderColor="$titanium"
  borderWidth={1}
  borderRadius="$4"
  padding="$4"
>
  <XStack alignItems="center" justifyContent="space-between">
    <XStack alignItems="center" gap="$3">
      <View
        backgroundColor="$backgroundSoft"
        borderRadius="$2"
        padding="$2"
        alignItems="center"
        justifyContent="center"
        width={48}
        height={32}
      >
        <CreditCard size={20} color="$labPurple" />
      </View>
      
      <YStack>
        <XStack alignItems="center" gap="$2">
          <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
            •••• •••• •••• {card.lastFour}
          </Text>
          {card.isDefault && (
            <Badge backgroundColor="$plasmaGreen" color="$carbonBlack" size="$2">
              Default
            </Badge>
          )}
        </XStack>
        <Text fontSize="$3" color="$silver">
          {card.brand.toUpperCase()} • Expires {card.expMonth}/{card.expYear}
        </Text>
      </YStack>
    </XStack>
    
    <XStack gap="$2">
      <Button variant="outline" size="$3">
        Edit
      </Button>
      {!card.isDefault && (
        <Button variant="outline" size="$3" color="$red500">
          Remove
        </Button>
      )}
    </XStack>
  </XStack>
</Card>
```

### 4.8 NotificationsScreen

**New Page**: Notification center with action buttons
**Inspiration**: GitHub notifications + iOS notification center

```typescript
// Notifications Layout
┌─────────────────────────────────────────────┐
│ Header: "Notifications" + Mark All Read     │
├─────────────────────────────────────────────┤
│ Filter Tabs: All | Unread | Messages | Jobs │
├─────────────────────────────────────────────┤
│ Notification Items                          │
│ ┌─────────────────────────────────────────┐ │
│ │🔵 New Message from John                 │ │
│ │   "Hi, I have a question about..."      │ │
│ │   2 hours ago [Reply] [Mark Read]       │ │
│ └─────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────┐ │
│ │📁 Project "Website" Milestone Complete  │ │
│ │   Sarah completed the design phase      │ │
│ │   4 hours ago [View Project]            │ │
│ └─────────────────────────────────────────┘ │
└─────────────────────────────────────────────┘
```

---

## 5. Technical Implementation Plan

### 5.1 Phase 1: Enhanced Messaging (Week 1)

**Priority**: High - Core communication features

**Tasks**:
1. **ConversationsScreen Enhancement**
   - Add search and filtering
   - Implement swipe actions
   - Real-time conversation updates
   - Active chat horizontal scroll

2. **ChatScreen Real-time Features**
   - WebSocket integration for live messaging
   - Typing indicators
   - Read receipts
   - File upload with progress

3. **NotificationsScreen**
   - Push notification handling
   - Rich notification previews
   - Action buttons (Reply, Mark Read, View)

**Technical Requirements**:
```typescript
// WebSocket service
export class MessageService {
  private socket: WebSocket;
  
  connect(userId: string) {
    this.socket = new WebSocket(`wss://api.aiva.com/ws/${userId}`);
    this.setupEventListeners();
  }
  
  sendMessage(conversationId: string, content: string) {
    this.socket.send(JSON.stringify({
      type: 'message',
      conversationId,
      content,
      timestamp: Date.now()
    }));
  }
  
  private setupEventListeners() {
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // Update Redux store with new message
      store.dispatch(messageReceived(data));
    };
  }
}
```

### 5.2 Phase 2: Project Management (Week 2)

**Priority**: High - Core business functionality

**Tasks**:
1. **ProjectPostingScreen (Enhanced AddScreen)**
   - Multi-step form with progress indicator
   - Budget range slider with live VA count
   - Skill selection with search and suggestions
   - Rich text description editor

2. **ProjectDashboard**
   - Project cards with status, progress, team
   - Filter and search functionality
   - Quick actions for each project
   - Stats overview (active, review, completed)

**Key Components**:
```typescript
// Budget Range Slider
export const BudgetSlider = ({ onValueChange, initialRange }) => {
  const [range, setRange] = useState(initialRange);
  
  return (
    <YStack gap="$4">
      <XStack justifyContent="space-between">
        <Text>Budget Range</Text>
        <Text fontWeight="600">${range[0]} - ${range[1]}/hr</Text>
      </XStack>
      
      <MultiSlider
        values={range}
        min={5}
        max={100}
        step={5}
        onValuesChange={(values) => {
          setRange(values);
          onValueChange(values);
        }}
        trackStyle={{ backgroundColor: '$titanium' }}
        selectedStyle={{ backgroundColor: '$labPurple' }}
        markerStyle={{ backgroundColor: '$labPurple' }}
      />
      
      <Text fontSize="$3" color="$silver" textAlign="center">
        ~{estimatedVACount} VAs match this budget
      </Text>
    </YStack>
  );
};
```

### 5.3 Phase 3: Team & Profile Management (Week 3)

**Priority**: Medium - User experience enhancement

**Tasks**:
1. **TeamManagementScreen**
   - Team member cards with performance metrics
   - Favorite/unfavorite functionality
   - Filter by status (active, past, favorites)
   - Quick actions (message, rehire, rate)

2. **Enhanced ProfileScreen**
   - User stats dashboard
   - Recent activity feed
   - Quick action grid
   - Profile photo upload

3. **EditProfileScreen**
   - Form with floating labels
   - Photo upload with crop functionality
   - Skill management
   - Company information

### 5.4 Phase 4: Business Operations (Week 4)

**Priority**: Medium - Business management tools

**Tasks**:
1. **BillingScreen**
   - Payment method management
   - Transaction history with filters
   - Invoice downloads
   - Escrow balance display

2. **Analytics Dashboard** (Future enhancement)
   - Spending analytics
   - Team performance metrics
   - Project success rates

---

## 6. Navigation Structure

### 6.1 Mobile Bottom Navigation

```typescript
// Bottom tab configuration
const BottomTabs = {
  Discover: {
    screen: BrowseScreen,
    icon: Search,
    badge: null
  },
  Projects: {
    screen: ProjectDashboard,
    icon: FolderOpen,
    badge: activeProjectsCount
  },
  'AI Concierge': {
    screen: SearchScreen,
    icon: Sparkles,
    badge: null,
    highlighted: true // Center position, larger
  },
  Messages: {
    screen: ConversationsScreen,
    icon: MessageCircle,
    badge: unreadCount
  },
  Profile: {
    screen: ProfileScreen,
    icon: User,
    badge: null
  }
};
```

### 6.2 Web Top Navigation

```typescript
// Desktop navigation structure
const WebNavigation = {
  Logo: { component: 'AIVALogo' },
  MainNav: [
    { label: 'Discover', screen: BrowseScreen },
    { label: 'Projects', screen: ProjectDashboard },
    { label: 'Team', screen: TeamManagementScreen },
    { label: 'Messages', screen: ConversationsScreen }
  ],
  UserMenu: {
    trigger: 'UserAvatar',
    items: [
      { label: 'Profile', screen: ProfileScreen },
      { label: 'Billing', screen: BillingScreen },
      { label: 'Settings', screen: SettingsScreen },
      { label: 'Help', screen: HelpScreen },
      { label: 'Sign Out', action: 'logout' }
    ]
  },
  CTAButton: {
    label: 'Post Project',
    screen: ProjectPostingScreen,
    variant: 'primary'
  }
};
```

---

## 7. Component Library Extensions

### 7.1 New Reusable Components

**Avatar with Status Ring**:
```typescript
export const StatusAvatar = ({ 
  source, 
  size = '$6', 
  isOnline = false,
  showStatus = true 
}) => (
  <YStack position="relative">
    <Avatar size={size} source={source} />
    {showStatus && (
      <View
        position="absolute"
        bottom={0}
        right={0}
        width={size === '$12' ? 20 : 16}
        height={size === '$12' ? 20 : 16}
        borderRadius={size === '$12' ? 10 : 8}
        backgroundColor={isOnline ? '$plasmaGreen' : '$silver'}
        borderWidth={2}
        borderColor="$background"
      />
    )}
  </YStack>
);
```

**Progress Bar with Animation**:
```typescript
export const ProgressBar = ({ 
  progress, // 0-100
  color = '$plasmaGreen',
  height = 8,
  animated = true 
}) => {
  const animatedWidth = useSharedValue(0);
  
  useEffect(() => {
    animatedWidth.value = animated 
      ? withTiming(progress, { duration: 1000 })
      : progress;
  }, [progress]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value}%`
  }));
  
  return (
    <View 
      backgroundColor="$backgroundSoft" 
      height={height} 
      borderRadius={height / 2}
      overflow="hidden"
    >
      <Animated.View
        style={[
          {
            height: '100%',
            backgroundColor: color,
            borderRadius: height / 2
          },
          animatedStyle
        ]}
      />
    </View>
  );
};
```

**Multi-step Form Progress**:
```typescript
export const StepProgress = ({ 
  steps, 
  currentStep, 
  onStepPress 
}) => (
  <XStack alignItems="center" justifyContent="center" padding="$4">
    {steps.map((step, index) => (
      <React.Fragment key={step.id}>
        <Pressable
          onPress={() => onStepPress?.(index)}
          alignItems="center"
          opacity={index <= currentStep ? 1 : 0.5}
        >
          <View
            width={32}
            height={32}
            borderRadius={16}
            backgroundColor={index <= currentStep ? '$labPurple' : '$titanium'}
            alignItems="center"
            justifyContent="center"
            marginBottom="$2"
          >
            {index < currentStep ? (
              <Check size={16} color="$whiteCoat" />
            ) : (
              <Text 
                color={index <= currentStep ? '$whiteCoat' : '$silver'} 
                fontWeight="600"
                fontSize="$3"
              >
                {index + 1}
              </Text>
            )}
          </View>
          <Text 
            fontSize="$2" 
            color={index <= currentStep ? '$carbonBlack' : '$silver'}
            textAlign="center"
          >
            {step.label}
          </Text>
        </Pressable>
        
        {index < steps.length - 1 && (
          <View
            flex={1}
            height={2}
            backgroundColor={index < currentStep ? '$labPurple' : '$titanium'}
            marginHorizontal="$2"
            marginBottom="$6"
          />
        )}
      </React.Fragment>
    ))}
  </XStack>
);
```

---

## 8. Animation Patterns

### 8.1 Consistent Animation Library

**Page Transitions**:
```typescript
// Standard page entrance
export const pageEnterAnimation = FadeInDown.duration(600).springify();

// Card entrance with stagger
export const cardEnterAnimation = (index: number) => 
  FadeInDown.delay(index * 100).duration(500);

// Modal presentation
export const modalEnterAnimation = SlideInUp.duration(400).springify();
```

**Interaction Feedback**:
```typescript
// Button press animation
export const buttonPressStyle = {
  scale: 0.95,
  backgroundColor: '$primaryPress'
};

// Card hover animation  
export const cardHoverStyle = {
  transform: [{ translateY: -4 }],
  shadowOpacity: 0.15,
  borderColor: '$labPurple'
};
```

### 8.2 Loading States

**Skeleton Components**:
```typescript
export const SkeletonCard = () => (
  <Card padding="$4" backgroundColor="$whiteCoat">
    <YStack gap="$3">
      <SkeletonBox width="100%" height={200} borderRadius="$3" />
      <SkeletonBox width="80%" height={20} />
      <SkeletonBox width="60%" height={16} />
      <XStack gap="$2">
        <SkeletonBox width={60} height={24} borderRadius="$6" />
        <SkeletonBox width={60} height={24} borderRadius="$6" />
      </XStack>
    </YStack>
  </Card>
);

const SkeletonBox = ({ width, height, borderRadius = '$2' }) => (
  <View
    width={width}
    height={height}
    backgroundColor="$backgroundSoft"
    borderRadius={borderRadius}
    opacity={0.7}
  />
);
```

---

## 9. Responsive Design Strategy

### 9.1 Breakpoint System

```typescript
// Responsive breakpoints
export const breakpoints = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
  wide: 1440
};

// Usage in components
const { isDesktop, isTablet, isMobile } = useResponsive();

// Responsive props
<YStack
  flexDirection={isDesktop ? 'row' : 'column'}
  gap={isDesktop ? '$6' : '$4'}
  padding={isDesktop ? '$8' : '$4'}
>
```

### 9.2 Mobile-First Adaptations

**Touch Targets**:
- Minimum 44x44px for all interactive elements
- 8px spacing between touch targets
- Larger buttons on mobile

**Navigation**:
- Bottom tabs on mobile
- Top navigation on desktop
- Floating action button for primary actions

**Content Layout**:
- Single column on mobile
- Multi-column grid on desktop
- Horizontal scroll for card collections

---

## 10. Implementation Timeline

### Week 1: Enhanced Messaging
- **Days 1-2**: ConversationsScreen enhancement
- **Days 3-4**: ChatScreen real-time features  
- **Days 5**: NotificationsScreen implementation

### Week 2: Project Management
- **Days 1-3**: ProjectPostingScreen multi-step form
- **Days 4-5**: ProjectDashboard with filtering

### Week 3: Team & Profile
- **Days 1-2**: TeamManagementScreen
- **Days 3-4**: Enhanced ProfileScreen
- **Day 5**: EditProfileScreen

### Week 4: Business Operations
- **Days 1-3**: BillingScreen
- **Days 4-5**: Testing, refinement, and documentation

---

## 11. Success Metrics

### User Experience Metrics
- **Page Load Time**: < 2 seconds on mobile
- **Animation Smoothness**: 60 FPS on all interactions
- **Touch Response**: < 100ms feedback on all interactions

### Business Metrics
- **Project Posting Completion**: > 80% completion rate
- **Message Response Rate**: Increase by 25%
- **User Retention**: 7-day retention > 70%

### Technical Metrics
- **Bundle Size**: Keep under 2MB
- **Crash Rate**: < 0.1% on production
- **Performance Score**: > 90 on Lighthouse

---

## 12. Future Enhancements

### Phase 2 Features (Post-MVP)
1. **Advanced Analytics**
   - Spending insights dashboard
   - Team performance analytics
   - Project success rate tracking

2. **AI Features**
   - Smart project recommendations
   - Automated VA matching refinement
   - Predictive budget suggestions

3. **Enterprise Features**
   - Multi-team management
   - Advanced permissions
   - White-label options
   - API access

4. **Mobile App Enhancements**
   - Offline mode for messaging
   - Push notification rich actions
   - Biometric authentication

---

This comprehensive design specification provides the complete blueprint for finishing the AIVA Marketplace with modern, cohesive designs that maintain the established laboratory theme while incorporating the best practices from leading tech companies and marketplaces.