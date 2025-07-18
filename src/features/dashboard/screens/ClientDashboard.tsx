import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/reusables/primitives/card';
import { Button } from '../../../components/reusables/primitives/button';
import { TalentCard } from '../../../components/reusables/laboratory/talent-card';
import { ExperimentButton } from '../../../components/reusables/laboratory/experiment-button';
import { cn } from '../../../lib/utils';

// Mock data
const mockStats = {
  activeProjects: 3,
  monthlySpend: '$2,450',
  teamMembers: 8,
  pendingReviews: 2,
};

const mockTeam = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Executive Assistant',
    rating: 4.9,
    reviewCount: 127,
    price: '$35/hr',
    image: 'https://i.pravatar.cc/150?img=1',
    skills: ['Calendar Management', 'Email Handling', 'Travel Planning'],
    verified: true,
    available: true,
    performance: 98,
  },
  {
    id: '2',
    name: 'Mike Chen',
    role: 'Social Media Manager',
    rating: 4.8,
    reviewCount: 89,
    price: '$45/hr',
    image: 'https://i.pravatar.cc/150?img=3',
    skills: ['Content Creation', 'Analytics', 'Strategy'],
    verified: true,
    available: false,
    performance: 95,
  },
  {
    id: '3',
    name: 'Emma Davis',
    role: 'Data Analyst',
    rating: 5.0,
    reviewCount: 64,
    price: '$55/hr',
    image: 'https://i.pravatar.cc/150?img=5',
    skills: ['Python', 'SQL', 'Visualization'],
    verified: true,
    available: true,
    performance: 100,
  },
];

const mockProjects = [
  {
    id: '1',
    name: 'Q4 Marketing Campaign',
    assignedTo: 'Mike Chen',
    status: 'In Progress',
    progress: 65,
    dueDate: 'Dec 15, 2025',
  },
  {
    id: '2',
    name: 'Financial Report Analysis',
    assignedTo: 'Emma Davis',
    status: 'In Review',
    progress: 90,
    dueDate: 'Dec 10, 2025',
  },
  {
    id: '3',
    name: 'Executive Calendar Setup',
    assignedTo: 'Sarah Johnson',
    status: 'Active',
    progress: 100,
    dueDate: 'Ongoing',
  },
];

export function ClientDashboard() {
  const navigation = useNavigation();

  const renderStatCard = (title: string, value: string, icon: string, color: string) => (
    <Card className="flex-1 min-w-[140px]">
      <CardContent className="p-4">
        <View className="flex-row items-center justify-between mb-2">
          <View className={cn(
            "w-10 h-10 rounded-lg items-center justify-center",
            color
          )}>
            <Ionicons name={icon as any} size={20} color="white" />
          </View>
          <Text className="text-xs text-gray-500">This month</Text>
        </View>
        <Text className="text-2xl font-bold text-gray-900 dark:text-white">{value}</Text>
        <Text className="text-sm text-gray-600 dark:text-gray-400">{title}</Text>
      </CardContent>
    </Card>
  );

  const renderTeamMember = (member: typeof mockTeam[0]) => (
    <View key={member.id} className="mr-4 w-[280px]">
      <Card className="overflow-hidden">
        <CardContent className="p-4">
          <View className="flex-row items-start gap-3">
            <Image 
              source={{ uri: member.image }} 
              className="w-16 h-16 rounded-full"
            />
            <View className="flex-1">
              <View className="flex-row items-center gap-2">
                <Text className="font-semibold text-gray-900 dark:text-white">
                  {member.name}
                </Text>
                {member.available ? (
                  <View className="w-2 h-2 bg-green-500 rounded-full" />
                ) : (
                  <View className="w-2 h-2 bg-gray-400 rounded-full" />
                )}
              </View>
              <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {member.role}
              </Text>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center gap-1">
                  <Text className="text-xs text-gray-500">Performance:</Text>
                  <Text className="text-xs font-semibold text-lab-purple">
                    {member.performance}%
                  </Text>
                </View>
                <Pressable className="p-1">
                  <Ionicons name="chatbubble-outline" size={16} color="#6B46E5" />
                </Pressable>
              </View>
            </View>
          </View>
        </CardContent>
      </Card>
    </View>
  );

  const renderProject = (project: typeof mockProjects[0]) => (
    <View key={project.id} className="mb-3 bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <View className="flex-row items-center justify-between mb-2">
        <Text className="font-semibold text-gray-900 dark:text-white flex-1">
          {project.name}
        </Text>
        <View className={cn(
          "px-2 py-1 rounded-full",
          project.status === 'In Progress' && "bg-blue-100",
          project.status === 'In Review' && "bg-yellow-100",
          project.status === 'Active' && "bg-green-100"
        )}>
          <Text className={cn(
            "text-xs font-medium",
            project.status === 'In Progress' && "text-blue-800",
            project.status === 'In Review' && "text-yellow-800",
            project.status === 'Active' && "text-green-800"
          )}>
            {project.status}
          </Text>
        </View>
      </View>
      <Text className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        Assigned to: {project.assignedTo}
      </Text>
      <View className="mb-2">
        <View className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <View 
            className="h-full bg-lab-purple rounded-full"
            style={{ width: `${project.progress}%` }}
          />
        </View>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="text-xs text-gray-500">{project.progress}% complete</Text>
        <Text className="text-xs text-gray-500">Due: {project.dueDate}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <View className="p-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back! 🧪
          </Text>
          <Text className="text-gray-600 dark:text-gray-400">
            Your AI-powered team is ready for new experiments
          </Text>
        </View>

        {/* Stats Grid */}
        <View className="mb-8">
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="flex-row gap-4"
          >
            {renderStatCard('Active Projects', mockStats.activeProjects.toString(), 'flask-outline', 'bg-lab-purple')}
            {renderStatCard('Monthly Spend', mockStats.monthlySpend, 'cash-outline', 'bg-plasma-green')}
            {renderStatCard('Team Members', mockStats.teamMembers.toString(), 'people-outline', 'bg-blue-500')}
            {renderStatCard('Pending Reviews', mockStats.pendingReviews.toString(), 'star-outline', 'bg-yellow-500')}
          </ScrollView>
        </View>

        {/* Your Laboratory (Team Section) */}
        <Card className="mb-8">
          <CardHeader>
            <View className="flex-row items-center justify-between">
              <CardTitle className="text-xl">Your Laboratory 🔬</CardTitle>
              <Pressable onPress={() => navigation.navigate('Team' as never)}>
                <Text className="text-sm text-lab-purple font-medium">View All</Text>
              </Pressable>
            </View>
          </CardHeader>
          <CardContent>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              className="mx-[-16px] px-4"
            >
              {mockTeam.map(renderTeamMember)}
            </ScrollView>
          </CardContent>
        </Card>

        {/* Project Management */}
        <Card className="mb-8">
          <CardHeader>
            <View className="flex-row items-center justify-between">
              <CardTitle className="text-xl">Active Experiments 🧪</CardTitle>
              <Pressable onPress={() => navigation.navigate('Projects' as never)}>
                <Text className="text-sm text-lab-purple font-medium">Manage</Text>
              </Pressable>
            </View>
          </CardHeader>
          <CardContent>
            {mockProjects.map(renderProject)}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </Text>
          <View className="flex-row flex-wrap gap-4">
            <ExperimentButton
              label="Start New Experiment"
              glowing={true}
              onPress={() => navigation.navigate('PostProject' as never)}
              className="flex-1 min-w-[160px]"
            />
            <Button
              label="Browse Talent Pool"
              variant="secondary"
              onPress={() => navigation.navigate('Browse' as never)}
              className="flex-1 min-w-[160px]"
            />
            <Button
              label="AI Concierge"
              variant="outline"
              onPress={() => navigation.navigate('AIConcierge' as never)}
              className="flex-1 min-w-[160px]"
            />
          </View>
        </View>

        {/* Recommended VAs */}
        <View className="mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recommended Specimens 💎
          </Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mx-[-24px] px-6"
          >
            {[
              {
                id: '4',
                name: 'David Wilson',
                role: 'Content Writer',
                rating: 4.7,
                reviewCount: 156,
                price: '$40/hr',
                skills: ['Blog Writing', 'SEO', 'Research'],
                verified: true,
                available: true,
              },
              {
                id: '5',
                name: 'Lisa Anderson',
                role: 'Graphic Designer',
                rating: 4.9,
                reviewCount: 203,
                price: '$50/hr',
                skills: ['UI Design', 'Branding', 'Adobe Suite'],
                verified: true,
                available: true,
              },
            ].map((va) => (
              <View key={va.id} className="w-[300px] mr-4">
                <TalentCard 
                  va={va} 
                  onPress={() => navigation.navigate('VAProfile', { id: va.id } as never)}
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}