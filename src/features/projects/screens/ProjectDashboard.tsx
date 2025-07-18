import React, { useState } from 'react';
import { ScrollView, Pressable } from 'react-native';
import { YStack, XStack, Text, H1, H2, H3, View } from 'tamagui';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { StatusAvatar } from '../../../components/ui/status-avatar';
import { ProgressBar } from '../../../components/ui/progress-bar';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { useNavigation } from '@react-navigation/native';
import { 
  Plus,
  Filter,
  Search,
  FolderOpen,
  Clock,
  DollarSign,
  Users,
  MessageCircle,
  Calendar,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Eye,
  MoreHorizontal
} from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight
} from 'react-native-reanimated';

interface Project {
  id: string;
  title: string;
  category: string;
  status: 'active' | 'review' | 'completed' | 'paused';
  assignedVAs: {
    id: string;
    name: string;
    avatar?: string;
  }[];
  progress: number;
  completedMilestones: number;
  totalMilestones: number;
  budget: number;
  spent: number;
  dueDate: Date;
  lastUpdate: Date;
  priority: 'low' | 'medium' | 'high';
  description: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Website Redesign',
    category: 'Web Development',
    status: 'active',
    assignedVAs: [
      { id: '1', name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: '2', name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/150?img=2' }
    ],
    progress: 75,
    completedMilestones: 3,
    totalMilestones: 4,
    budget: 5000,
    spent: 3200,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    lastUpdate: new Date(Date.now() - 2 * 60 * 60 * 1000),
    priority: 'high',
    description: 'Complete redesign of company website with modern UI/UX'
  },
  {
    id: '2',
    title: 'Content Marketing Campaign',
    category: 'Content Writing',
    status: 'review',
    assignedVAs: [
      { id: '3', name: 'Lisa Rodriguez', avatar: 'https://i.pravatar.cc/150?img=3' }
    ],
    progress: 90,
    completedMilestones: 4,
    totalMilestones: 5,
    budget: 2500,
    spent: 2100,
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    lastUpdate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    priority: 'medium',
    description: 'Q4 content strategy and blog post creation'
  },
  {
    id: '3',
    title: 'Social Media Management',
    category: 'Social Media',
    status: 'active',
    assignedVAs: [
      { id: '4', name: 'David Kim', avatar: 'https://i.pravatar.cc/150?img=4' }
    ],
    progress: 45,
    completedMilestones: 2,
    totalMilestones: 6,
    budget: 1800,
    spent: 800,
    dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    lastUpdate: new Date(Date.now() - 4 * 60 * 60 * 1000),
    priority: 'low',
    description: 'Ongoing social media management and engagement'
  },
  {
    id: '4',
    title: 'Data Analysis Report',
    category: 'Data Analysis',
    status: 'completed',
    assignedVAs: [
      { id: '5', name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?img=5' }
    ],
    progress: 100,
    completedMilestones: 3,
    totalMilestones: 3,
    budget: 1200,
    spent: 1150,
    dueDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    lastUpdate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    priority: 'medium',
    description: 'Quarterly business performance analysis'
  }
];

const getStatusColor = (status: Project['status']) => {
  switch (status) {
    case 'active': return '#10F4B1';
    case 'review': return '#F59E0B';
    case 'completed': return '#10B981';
    case 'paused': return '#6B7280';
    default: return '#6B7280';
  }
};

const getPriorityColor = (priority: Project['priority']) => {
  switch (priority) {
    case 'high': return '#EF4444';
    case 'medium': return '#F59E0B';
    case 'low': return '#10B981';
    default: return '#6B7280';
  }
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
  });
};

const formatTimeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

export default function ProjectDashboard() {
  const navigation = useNavigation();
  const { isDesktop } = useResponsive();
  const [filter, setFilter] = useState<'all' | 'active' | 'review' | 'completed'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = mockProjects.filter(project => {
    const matchesFilter = filter === 'all' || project.status === filter;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    active: mockProjects.filter(p => p.status === 'active').length,
    review: mockProjects.filter(p => p.status === 'review').length,
    completed: mockProjects.filter(p => p.status === 'completed').length,
    totalBudget: mockProjects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: mockProjects.reduce((sum, p) => sum + p.spent, 0),
    activeVAs: new Set(mockProjects.flatMap(p => p.assignedVAs.map(va => va.id))).size
  };

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color,
    subtitle,
    delay = 0
  }: {
    title: string;
    value: string | number;
    icon: React.ComponentType<any>;
    color: string;
    subtitle?: string;
    delay?: number;
  }) => (
    <Animated.View entering={FadeInDown.delay(delay).duration(600)}>
      <Card
        backgroundColor="$whiteCoat"
        borderColor="$titanium"
        borderWidth={1}
        padding="$4"
        borderRadius="$3"
        flex={1}
        hoverStyle={{
          borderColor: color,
          shadowColor: color,
          shadowOpacity: 0.1,
          shadowRadius: 8
        }}
        animation="quick"
      >
        <XStack alignItems="center" gap="$3">
          <View
            width={32}
            height={32}
            borderRadius={16}
            backgroundColor={`${color}15`}
            alignItems="center"
            justifyContent="center"
          >
            <Icon size={16} color={color} />
          </View>
          
          <YStack flex={1}>
            <Text fontSize="$2" color="$silver" textTransform="uppercase" letterSpacing={1}>
              {title}
            </Text>
            <Text fontSize="$5" fontWeight="700" color="$carbonBlack">
              {value}
            </Text>
            {subtitle && (
              <Text fontSize="$2" color="$silver">
                {subtitle}
              </Text>
            )}
          </YStack>
        </XStack>
      </Card>
    </Animated.View>
  );

  const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(500)}>
      <Card
        backgroundColor="$whiteCoat"
        borderColor="$titanium"
        borderWidth={1}
        borderRadius="$3"
        padding="$4"
        marginBottom="$4"
        hoverStyle={{
          borderColor: '$labPurple',
          shadowColor: '$labPurple',
          shadowOpacity: 0.1,
          shadowRadius: 15,
          transform: [{ translateY: -2 }]
        }}
        animation="quick"
        pressStyle={{ backgroundColor: '$backgroundSoft' }}
      >
        {/* Header */}
        <XStack justifyContent="space-between" alignItems="flex-start" marginBottom="$4">
          <YStack flex={1}>
            <XStack alignItems="center" gap="$2" marginBottom="$2">
              <Text fontSize="$5" fontWeight="600" color="$carbonBlack">
                {project.title}
              </Text>
              <View
                width={8}
                height={8}
                borderRadius={4}
                backgroundColor={getPriorityColor(project.priority)}
              />
            </XStack>
            <Text fontSize="$3" color="$silver">
              {project.category}
            </Text>
          </YStack>
          
          <XStack alignItems="center" gap="$3">
            <Badge 
              backgroundColor={getStatusColor(project.status)}
              color="$whiteCoat"
              textTransform="uppercase"
              fontSize="$1"
              fontWeight="600"
            >
              {project.status}
            </Badge>
            <Pressable
              style={{
                padding: 8,
                borderRadius: 16,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <MoreHorizontal size={16} color="#6B7280" />
            </Pressable>
          </XStack>
        </XStack>
        
        {/* Assigned VAs */}
        <XStack alignItems="center" gap="$3" marginBottom="$4">
          <Text fontSize="$3" color="$silver">Team:</Text>
          <XStack gap="$2">
            {project.assignedVAs.slice(0, 3).map((va) => (
              <StatusAvatar 
                key={va.id} 
                name={va.name}
                source={va.avatar ? { uri: va.avatar } : null}
                size={32} 
                showStatus={false}
              />
            ))}
            {project.assignedVAs.length > 3 && (
              <View
                width={32}
                height={32}
                borderRadius={16}
                backgroundColor="$backgroundSoft"
                borderColor="$titanium"
                borderWidth={1}
                alignItems="center"
                justifyContent="center"
              >
                <Text fontSize="$2" color="$silver" fontWeight="600">
                  +{project.assignedVAs.length - 3}
                </Text>
              </View>
            )}
          </XStack>
          <Text fontSize="$3" color="$carbonBlack" fontWeight="500">
            {project.assignedVAs.slice(0, 2).map(va => va.name.split(' ')[0]).join(', ')}
            {project.assignedVAs.length > 2 && ` +${project.assignedVAs.length - 2} more`}
          </Text>
        </XStack>
        
        {/* Progress */}
        <YStack gap="$2" marginBottom="$4">
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$3" color="$silver">Progress</Text>
            <Text fontSize="$3" color="$carbonBlack" fontWeight="600">
              {project.completedMilestones}/{project.totalMilestones} milestones
            </Text>
          </XStack>
          
          <ProgressBar
            progress={project.progress}
            color={getStatusColor(project.status)}
            height={8}
          />
        </YStack>
        
        {/* Budget & Timeline */}
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
          <YStack>
            <Text fontSize="$3" color="$silver">Budget</Text>
            <XStack alignItems="center" gap="$2">
              <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                ${project.spent.toLocaleString()}
              </Text>
              <Text fontSize="$3" color="$silver">
                / ${project.budget.toLocaleString()}
              </Text>
            </XStack>
          </YStack>
          
          <YStack alignItems="flex-end">
            <Text fontSize="$3" color="$silver">Due Date</Text>
            <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
              {formatDate(project.dueDate)}
            </Text>
          </YStack>
        </XStack>
        
        {/* Last Update */}
        <XStack justifyContent="space-between" alignItems="center" marginBottom="$4">
          <Text fontSize="$3" color="$silver">
            Last updated {formatTimeAgo(project.lastUpdate)}
          </Text>
          <XStack alignItems="center" gap="$2">
            <Clock size={16} color="#6B7280" />
            <Text fontSize="$3" color="$silver">
              {project.status === 'active' ? 'In progress' : 
               project.status === 'review' ? 'Pending review' :
               project.status === 'completed' ? 'Completed' : 'Paused'}
            </Text>
          </XStack>
        </XStack>
        
        {/* Quick Actions */}
        <XStack gap="$3">
          <Button flex={1} variant="outline" size="$3" borderColor="$titanium">
            <Eye size={16} />
            View Details
          </Button>
          <Button flex={1} backgroundColor="$labPurple" size="$3">
            <MessageCircle size={16} />
            Message Team
          </Button>
        </XStack>
      </Card>
    </Animated.View>
  );

  return (
    <YStack flex={1} backgroundColor="$backgroundSoft">
      {/* Header */}
      <YStack
        backgroundColor="$background"
        paddingHorizontal={isDesktop ? '$6' : '$4'}
        paddingTop={isDesktop ? '$6' : '$4'}
        paddingBottom="$4"
      >
        <Animated.View entering={FadeIn.duration(600)}>
          <XStack alignItems="center" justifyContent="space-between" marginBottom="$4">
            <H1 fontSize={isDesktop ? '$8' : '$6'} color="$carbonBlack">
              Projects
            </H1>
            <Button
              backgroundColor="$labPurple"
              color="$whiteCoat"
              size="$4"
              borderRadius="$4"
              onPress={() => navigation.navigate('ProjectPosting' as never)}
            >
              <Plus size={20} />
              New Project
            </Button>
          </XStack>
        </Animated.View>
      </YStack>

      {/* Stats Dashboard */}
      <YStack paddingHorizontal={isDesktop ? '$6' : '$4'} marginBottom="$5">
        <Animated.View entering={FadeInDown.delay(200).duration(600)}>
          <H3 fontSize="$5" color="$carbonBlack" marginBottom="$4">
            Overview
          </H3>
        </Animated.View>
        
        <XStack flexWrap="wrap" gap="$4" marginBottom="$5">
          <YStack flex={isDesktop ? 0.24 : 0.48} minWidth={isDesktop ? 150 : 120}>
            <StatCard
              title="Active"
              value={stats.active}
              icon={FolderOpen}
              color="#10F4B1"
              delay={100}
            />
          </YStack>
          
          <YStack flex={isDesktop ? 0.24 : 0.48} minWidth={isDesktop ? 150 : 120}>
            <StatCard
              title="In Review"
              value={stats.review}
              icon={AlertCircle}
              color="#F59E0B"
              delay={200}
            />
          </YStack>
          
          <YStack flex={isDesktop ? 0.24 : 0.48} minWidth={isDesktop ? 150 : 120}>
            <StatCard
              title="Completed"
              value={stats.completed}
              icon={CheckCircle}
              color="#10B981"
              delay={300}
            />
          </YStack>
          
          <YStack flex={isDesktop ? 0.24 : 0.48} minWidth={isDesktop ? 150 : 120}>
            <StatCard
              title="Team Size"
              value={stats.activeVAs}
              icon={Users}
              color="#6B46E5"
              subtitle="Active VAs"
              delay={400}
            />
          </YStack>
        </XStack>
      </YStack>

      {/* Filters */}
      <YStack paddingHorizontal={isDesktop ? '$6' : '$4'} marginBottom="$5">
        <Animated.View entering={FadeInDown.delay(600).duration(600)}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack gap="$2" paddingHorizontal="$2">
              {[
                { key: 'all', label: 'All', count: mockProjects.length },
                { key: 'active', label: 'Active', count: stats.active },
                { key: 'review', label: 'Review', count: stats.review },
                { key: 'completed', label: 'Completed', count: stats.completed }
              ].map((filterOption) => (
                <Pressable
                  key={filterOption.key}
                  onPress={() => setFilter(filterOption.key as any)}
                  style={{
                    paddingHorizontal: 16,
                    paddingVertical: 8,
                    borderRadius: 16,
                    backgroundColor: filter === filterOption.key ? '#6B46E5' : '#FFFFFF',
                    borderWidth: 1,
                    borderColor: filter === filterOption.key ? '#6B46E5' : '#E1E8ED',
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8
                  }}
                >
                  <Text 
                    fontSize="$3" 
                    color={filter === filterOption.key ? '$whiteCoat' : '$carbonBlack'}
                    fontWeight="500"
                  >
                    {filterOption.label}
                  </Text>
                  {filterOption.count > 0 && (
                    <Badge
                      backgroundColor={filter === filterOption.key ? 'rgba(255,255,255,0.3)' : '$labPurple'}
                      color="$whiteCoat"
                      fontSize="$1"
                      paddingHorizontal="$1.5"
                      paddingVertical="$0.5"
                    >
                      {filterOption.count}
                    </Badge>
                  )}
                </Pressable>
              ))}
            </XStack>
          </ScrollView>
        </Animated.View>
      </YStack>

      {/* Projects List */}
      <ScrollView
        flex={1}
        paddingHorizontal={isDesktop ? '$6' : '$4'}
        showsVerticalScrollIndicator={false}
      >
        <YStack paddingBottom="$6">
          {filteredProjects.length === 0 ? (
            <Animated.View entering={FadeIn.duration(600)}>
              <Card
                backgroundColor="$whiteCoat"
                padding="$6"
                borderRadius="$3"
                alignItems="center"
              >
                <FolderOpen size={48} color="#6B7280" />
                <Text fontSize="$5" fontWeight="600" color="$carbonBlack" marginTop="$4">
                  No projects found
                </Text>
                <Text fontSize="$3" color="$silver" textAlign="center" marginTop="$2">
                  {filter === 'all' 
                    ? "You haven't created any projects yet" 
                    : `No ${filter} projects at the moment`
                  }
                </Text>
                {filter === 'all' && (
                  <Button
                    backgroundColor="$labPurple"
                    color="$whiteCoat"
                    marginTop="$4"
                    onPress={() => navigation.navigate('ProjectPosting' as never)}
                  >
                    <Plus size={20} />
                    Create Your First Project
                  </Button>
                )}
              </Card>
            </Animated.View>
          ) : (
            filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))
          )}
        </YStack>
      </ScrollView>
    </YStack>
  );
}