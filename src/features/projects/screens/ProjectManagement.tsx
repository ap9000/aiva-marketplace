import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
  TextInput,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Card, CardContent } from '../../../components/reusables/primitives/card';
import { Button } from '../../../components/reusables/primitives/button';
import { DataChamberInput } from '../../../components/reusables/laboratory/data-chamber-input';
import { cn } from '../../../lib/utils';

type ProjectStatus = 'all' | 'active' | 'in-progress' | 'completed' | 'paused';

interface Project {
  id: string;
  name: string;
  description: string;
  assignedVAs: {
    id: string;
    name: string;
    avatar: string;
  }[];
  status: 'active' | 'in-progress' | 'completed' | 'paused';
  progress: number;
  startDate: string;
  dueDate: string;
  budget: string;
  spent: string;
  milestones: {
    completed: number;
    total: number;
  };
  lastActivity: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Q4 Marketing Campaign',
    description: 'Complete social media strategy and content calendar for Q4',
    assignedVAs: [
      { id: '1', name: 'Mike Chen', avatar: 'https://i.pravatar.cc/150?img=3' },
      { id: '2', name: 'Lisa Anderson', avatar: 'https://i.pravatar.cc/150?img=5' },
    ],
    status: 'in-progress',
    progress: 65,
    startDate: 'Oct 15, 2025',
    dueDate: 'Dec 15, 2025',
    budget: '$5,000',
    spent: '$3,250',
    milestones: { completed: 4, total: 6 },
    lastActivity: '2 hours ago',
  },
  {
    id: '2',
    name: 'Financial Report Analysis',
    description: 'Quarterly financial analysis and reporting dashboard',
    assignedVAs: [
      { id: '3', name: 'Emma Davis', avatar: 'https://i.pravatar.cc/150?img=8' },
    ],
    status: 'active',
    progress: 90,
    startDate: 'Nov 1, 2025',
    dueDate: 'Dec 10, 2025',
    budget: '$2,500',
    spent: '$2,250',
    milestones: { completed: 8, total: 9 },
    lastActivity: '5 hours ago',
  },
  {
    id: '3',
    name: 'Executive Calendar Management',
    description: 'Ongoing executive assistant support and calendar management',
    assignedVAs: [
      { id: '4', name: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=1' },
    ],
    status: 'active',
    progress: 100,
    startDate: 'Sep 1, 2025',
    dueDate: 'Ongoing',
    budget: '$3,000/mo',
    spent: '$9,000',
    milestones: { completed: 12, total: 12 },
    lastActivity: '1 hour ago',
  },
  {
    id: '4',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with new branding',
    assignedVAs: [
      { id: '5', name: 'Alex Turner', avatar: 'https://i.pravatar.cc/150?img=12' },
      { id: '6', name: 'Rachel Green', avatar: 'https://i.pravatar.cc/150?img=16' },
    ],
    status: 'completed',
    progress: 100,
    startDate: 'Aug 1, 2025',
    dueDate: 'Oct 30, 2025',
    budget: '$8,000',
    spent: '$7,850',
    milestones: { completed: 10, total: 10 },
    lastActivity: '1 week ago',
  },
  {
    id: '5',
    name: 'Product Launch Support',
    description: 'Marketing and operational support for new product launch',
    assignedVAs: [
      { id: '7', name: 'James Wilson', avatar: 'https://i.pravatar.cc/150?img=18' },
    ],
    status: 'paused',
    progress: 30,
    startDate: 'Oct 20, 2025',
    dueDate: 'Jan 15, 2026',
    budget: '$4,000',
    spent: '$1,200',
    milestones: { completed: 2, total: 8 },
    lastActivity: '3 days ago',
  },
];

export function ProjectManagement() {
  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState<ProjectStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'active':
        return { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' };
      case 'in-progress':
        return { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' };
      case 'completed':
        return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' };
      case 'paused':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-200' };
    }
  };

  const filteredProjects = mockProjects.filter(project => {
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusCounts = {
    all: mockProjects.length,
    active: mockProjects.filter(p => p.status === 'active').length,
    'in-progress': mockProjects.filter(p => p.status === 'in-progress').length,
    completed: mockProjects.filter(p => p.status === 'completed').length,
    paused: mockProjects.filter(p => p.status === 'paused').length,
  };

  const renderProject = (project: Project) => {
    const statusColors = getStatusColor(project.status);
    
    return (
      <Card key={project.id} className="mb-4 overflow-hidden">
        <Pressable
          onPress={() => navigation.navigate('ProjectDetail', { id: project.id } as never)}
          className="active:opacity-95"
        >
          <CardContent className="p-0">
            {/* Header */}
            <View className="p-4 border-b border-gray-100 dark:border-gray-800">
              <View className="flex-row items-start justify-between mb-2">
                <View className="flex-1 mr-4">
                  <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {project.name}
                  </Text>
                  <Text className="text-sm text-gray-600 dark:text-gray-400">
                    {project.description}
                  </Text>
                </View>
                <View className={cn(
                  "px-3 py-1 rounded-full border",
                  statusColors.bg,
                  statusColors.border
                )}>
                  <Text className={cn("text-xs font-medium capitalize", statusColors.text)}>
                    {project.status.replace('-', ' ')}
                  </Text>
                </View>
              </View>

              {/* Assigned VAs */}
              <View className="flex-row items-center mt-3">
                <Text className="text-xs text-gray-500 mr-2">Assigned to:</Text>
                <View className="flex-row -space-x-2">
                  {project.assignedVAs.slice(0, 3).map((va, index) => (
                    <Image
                      key={va.id}
                      source={{ uri: va.avatar }}
                      className={cn(
                        "w-6 h-6 rounded-full border-2 border-white",
                        index > 0 && "-ml-2"
                      )}
                      style={{ zIndex: project.assignedVAs.length - index }}
                    />
                  ))}
                  {project.assignedVAs.length > 3 && (
                    <View className="w-6 h-6 rounded-full bg-gray-200 border-2 border-white -ml-2 items-center justify-center">
                      <Text className="text-[10px] font-medium text-gray-600">
                        +{project.assignedVAs.length - 3}
                      </Text>
                    </View>
                  )}
                </View>
                <Text className="text-xs text-gray-500 ml-2">
                  ({project.assignedVAs.map(va => va.name).join(', ')})
                </Text>
              </View>
            </View>

            {/* Progress Section */}
            <View className="p-4 bg-gray-50 dark:bg-gray-800/50">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Progress
                </Text>
                <Text className="text-sm font-semibold text-lab-purple">
                  {project.progress}%
                </Text>
              </View>
              <View className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
                <View 
                  className="h-full bg-gradient-to-r from-lab-purple to-indigo-600 rounded-full"
                  style={{ width: `${project.progress}%` }}
                />
              </View>

              {/* Metrics */}
              <View className="flex-row justify-between">
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 mb-1">Milestones</Text>
                  <Text className="text-sm font-medium text-gray-900 dark:text-white">
                    {project.milestones.completed}/{project.milestones.total}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 mb-1">Budget Used</Text>
                  <Text className="text-sm font-medium text-gray-900 dark:text-white">
                    {project.spent} / {project.budget}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-xs text-gray-500 mb-1">Due Date</Text>
                  <Text className="text-sm font-medium text-gray-900 dark:text-white">
                    {project.dueDate}
                  </Text>
                </View>
              </View>
            </View>

            {/* Actions */}
            <View className="flex-row items-center justify-between p-4 bg-white dark:bg-gray-900">
              <Text className="text-xs text-gray-500">
                Last activity: {project.lastActivity}
              </Text>
              <View className="flex-row gap-2">
                <Pressable className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Ionicons name="chatbubble-outline" size={16} color="#6B46E5" />
                </Pressable>
                <Pressable className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Ionicons name="document-text-outline" size={16} color="#6B46E5" />
                </Pressable>
                <Pressable className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Ionicons name="ellipsis-horizontal" size={16} color="#6B46E5" />
                </Pressable>
              </View>
            </View>
          </CardContent>
        </Pressable>
      </Card>
    );
  };

  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">
            Experiment Management 🧪
          </Text>
          <Button
            label="New Project"
            variant="default"
            size="sm"
            onPress={() => navigation.navigate('CreateProject' as never)}
          />
        </View>

        {/* Search */}
        <View className="mb-4">
          <DataChamberInput
            placeholder="Search projects..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            icon="search"
          />
        </View>

        {/* Status Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="flex-row gap-2"
        >
          {(['all', 'active', 'in-progress', 'completed', 'paused'] as ProjectStatus[]).map((status) => (
            <Pressable
              key={status}
              onPress={() => setSelectedStatus(status)}
              className={cn(
                "px-4 py-2 rounded-full border transition-colors",
                selectedStatus === status
                  ? "bg-lab-purple border-lab-purple"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              )}
            >
              <View className="flex-row items-center gap-1">
                <Text className={cn(
                  "text-sm font-medium capitalize",
                  selectedStatus === status
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300"
                )}>
                  {status.replace('-', ' ')}
                </Text>
                <View className={cn(
                  "px-1.5 py-0.5 rounded-full",
                  selectedStatus === status
                    ? "bg-white/20"
                    : "bg-gray-100 dark:bg-gray-700"
                )}>
                  <Text className={cn(
                    "text-xs font-medium",
                    selectedStatus === status
                      ? "text-white"
                      : "text-gray-600 dark:text-gray-400"
                  )}>
                    {statusCounts[status]}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Projects List */}
      <ScrollView className="flex-1 px-6 py-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(renderProject)
        ) : (
          <View className="flex-1 items-center justify-center py-20">
            <View className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full items-center justify-center mb-4">
              <Ionicons name="flask-outline" size={40} color="#6B7280" />
            </View>
            <Text className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No projects found
            </Text>
            <Text className="text-sm text-gray-500 text-center max-w-xs">
              {searchQuery 
                ? "Try adjusting your search terms"
                : "Start a new experiment to see it here"}
            </Text>
          </View>
        )}

        {/* Summary Stats */}
        {filteredProjects.length > 0 && (
          <Card className="mt-6 mb-8">
            <CardContent className="p-6">
              <Text className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Portfolio Summary
              </Text>
              <View className="flex-row flex-wrap gap-4">
                <View className="flex-1 min-w-[120px]">
                  <Text className="text-xs text-gray-500 mb-1">Total Budget</Text>
                  <Text className="text-xl font-bold text-gray-900 dark:text-white">
                    $22,500
                  </Text>
                </View>
                <View className="flex-1 min-w-[120px]">
                  <Text className="text-xs text-gray-500 mb-1">Total Spent</Text>
                  <Text className="text-xl font-bold text-lab-purple">
                    $23,550
                  </Text>
                </View>
                <View className="flex-1 min-w-[120px]">
                  <Text className="text-xs text-gray-500 mb-1">Active VAs</Text>
                  <Text className="text-xl font-bold text-gray-900 dark:text-white">
                    12
                  </Text>
                </View>
                <View className="flex-1 min-w-[120px]">
                  <Text className="text-xs text-gray-500 mb-1">Avg Completion</Text>
                  <Text className="text-xl font-bold text-green-600">
                    78%
                  </Text>
                </View>
              </View>
            </CardContent>
          </Card>
        )}
      </ScrollView>
    </View>
  );
}