import React, { useState } from 'react';
import { ScrollView, Pressable, TextInput } from 'react-native';
import { YStack, XStack, Text, H1, H2, H3, View } from 'tamagui';
import { Card, CardContent } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { StepProgress } from '../../../components/ui/step-progress';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { useNavigation } from '@react-navigation/native';
import { 
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Clock,
  DollarSign,
  Users,
  Zap,
  Target,
  FileText,
  Globe,
  Calendar,
  CheckCircle
} from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInRight,
  SlideOutLeft
} from 'react-native-reanimated';

const steps = [
  { id: 'type', label: 'Type' },
  { id: 'details', label: 'Details' },
  { id: 'budget', label: 'Budget' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'review', label: 'Review' }
];

const projectTypes = [
  {
    id: 'one-time',
    title: 'One-time Task',
    description: 'A specific task with clear deliverables',
    icon: Target,
    color: '#6B46E5'
  },
  {
    id: 'ongoing',
    title: 'Ongoing Support',
    description: 'Regular assistance with recurring work',
    icon: Clock,
    color: '#10F4B1'
  },
  {
    id: 'full-time',
    title: 'Full-time Assistant',
    description: 'Dedicated VA for comprehensive support',
    icon: Users,
    color: '#F59E0B'
  },
  {
    id: 'specialized',
    title: 'Specialized Project',
    description: 'Expert-level work requiring specific skills',
    icon: Zap,
    color: '#8B5CF6'
  }
];

const categories = [
  'Administrative Support',
  'Content Writing',
  'Social Media Management',
  'Customer Service',
  'Data Entry',
  'Graphic Design',
  'Web Development',
  'Digital Marketing',
  'Research',
  'Email Management',
  'Project Management',
  'Translation',
  'Virtual Reception',
  'E-commerce Support',
  'Other'
];

const skillSuggestions = [
  'Microsoft Office', 'Google Workspace', 'WordPress', 'Shopify', 'HubSpot',
  'Mailchimp', 'Canva', 'Adobe Creative Suite', 'Social Media Advertising',
  'SEO', 'Content Writing', 'Customer Support', 'Data Analysis', 'CRM Management'
];

export default function ProjectPostingScreen() {
  const navigation = useNavigation();
  const { isDesktop } = useResponsive();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form state
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    category: '',
    description: '',
    skills: [] as string[],
    budgetType: 'hourly', // 'hourly' | 'fixed'
    budgetRange: [20, 50] as [number, number],
    fixedBudget: 1000,
    timeline: '',
    urgency: 'normal', // 'urgent' | 'normal' | 'flexible'
    experienceLevel: 'intermediate', // 'entry' | 'intermediate' | 'expert'
    languages: [] as string[],
    availability: ''
  });

  const updateFormData = (updates: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return formData.type !== '';
      case 1: return formData.title && formData.category && formData.description;
      case 2: return true; // Budget step always valid
      case 3: return formData.timeline !== '';
      case 4: return true; // Review step
      default: return false;
    }
  };

  const estimatedVAs = Math.floor(Math.random() * 50) + 20; // Mock estimation

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Animated.View entering={FadeIn.duration(400)}>
            <YStack gap="$6">
              <YStack gap="$3">
                <H2 fontSize="$7" fontWeight="700" color="$carbonBlack" textAlign="center">
                  What type of project do you need help with?
                </H2>
                <Text fontSize="$4" color="$silver" textAlign="center">
                  Choose the option that best describes your project
                </Text>
              </YStack>
              
              <YStack gap="$4">
                {projectTypes.map((type, index) => (
                  <Animated.View key={type.id} entering={FadeInDown.delay(index * 100).duration(500)}>
                    <Pressable
                      onPress={() => updateFormData({ type: type.id })}
                    >
                      <Card
                        backgroundColor={formData.type === type.id ? 'rgba(107, 70, 229, 0.1)' : '$whiteCoat'}
                        borderColor={formData.type === type.id ? '$labPurple' : '$titanium'}
                        borderWidth={2}
                        padding="$5"
                        borderRadius="$4"
                        pressStyle={{ backgroundColor: '$backgroundSoft' }}
                        hoverStyle={{
                          borderColor: '$labPurple',
                          shadowColor: '$labPurple',
                          shadowOpacity: 0.1,
                          shadowRadius: 10
                        }}
                      >
                        <XStack alignItems="center" gap="$4">
                          <View
                            width={56}
                            height={56}
                            borderRadius={28}
                            backgroundColor={`${type.color}15`}
                            alignItems="center"
                            justifyContent="center"
                          >
                            <type.icon size={28} color={type.color} />
                          </View>
                          
                          <YStack flex={1}>
                            <Text fontSize="$5" fontWeight="600" color="$carbonBlack" marginBottom="$1">
                              {type.title}
                            </Text>
                            <Text fontSize="$3" color="$silver">
                              {type.description}
                            </Text>
                          </YStack>
                          
                          {formData.type === type.id && (
                            <CheckCircle size={24} color="#6B46E5" />
                          )}
                        </XStack>
                      </Card>
                    </Pressable>
                  </Animated.View>
                ))}
              </YStack>
            </YStack>
          </Animated.View>
        );

      case 1:
        return (
          <Animated.View entering={FadeIn.duration(400)}>
            <YStack gap="$6">
              <YStack gap="$3">
                <H2 fontSize="$7" fontWeight="700" color="$carbonBlack" textAlign="center">
                  Project Details
                </H2>
                <Text fontSize="$4" color="$silver" textAlign="center">
                  Tell us about your project requirements
                </Text>
              </YStack>
              
              <YStack gap="$4">
                {/* Project Title */}
                <YStack gap="$2">
                  <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                    Project Title
                  </Text>
                  <Card backgroundColor="$whiteCoat" borderColor="$titanium" borderWidth={1} borderRadius="$3">
                    <TextInput
                      style={{
                        padding: 16,
                        fontSize: 16,
                        color: '#0A0E1A',
                        outlineStyle: 'none'
                      }}
                      placeholder="e.g., Website redesign for tech startup"
                      placeholderTextColor="#6B7280"
                      value={formData.title}
                      onChangeText={(text) => updateFormData({ title: text })}
                    />
                  </Card>
                </YStack>

                {/* Category */}
                <YStack gap="$2">
                  <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                    Category
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <XStack gap="$2" paddingHorizontal="$1">
                      {categories.map((category) => (
                        <Pressable
                          key={category}
                          onPress={() => updateFormData({ category })}
                        >
                          <Badge
                            backgroundColor={formData.category === category ? '$labPurple' : '$backgroundSoft'}
                            color={formData.category === category ? '$whiteCoat' : '$carbonBlack'}
                            paddingHorizontal="$3"
                            paddingVertical="$2"
                            borderRadius="$6"
                            borderWidth={1}
                            borderColor={formData.category === category ? '$labPurple' : '$titanium'}
                          >
                            {category}
                          </Badge>
                        </Pressable>
                      ))}
                    </XStack>
                  </ScrollView>
                </YStack>

                {/* Description */}
                <YStack gap="$2">
                  <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                    Project Description
                  </Text>
                  <Card backgroundColor="$whiteCoat" borderColor="$titanium" borderWidth={1} borderRadius="$3">
                    <TextInput
                      style={{
                        padding: 16,
                        fontSize: 16,
                        color: '#0A0E1A',
                        minHeight: 120,
                        textAlignVertical: 'top',
                        outlineStyle: 'none'
                      }}
                      placeholder="Describe your project, goals, and specific requirements..."
                      placeholderTextColor="#6B7280"
                      value={formData.description}
                      onChangeText={(text) => updateFormData({ description: text })}
                      multiline
                      numberOfLines={6}
                    />
                  </Card>
                </YStack>

                {/* Skills */}
                <YStack gap="$2">
                  <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                    Required Skills
                  </Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <XStack gap="$2" paddingHorizontal="$1">
                      {skillSuggestions.map((skill) => (
                        <Pressable
                          key={skill}
                          onPress={() => {
                            const isSelected = formData.skills.includes(skill);
                            if (isSelected) {
                              updateFormData({ 
                                skills: formData.skills.filter(s => s !== skill) 
                              });
                            } else {
                              updateFormData({ 
                                skills: [...formData.skills, skill] 
                              });
                            }
                          }}
                        >
                          <Badge
                            backgroundColor={formData.skills.includes(skill) ? '$plasmaGreen' : '$backgroundSoft'}
                            color={formData.skills.includes(skill) ? '$carbonBlack' : '$carbonBlack'}
                            paddingHorizontal="$3"
                            paddingVertical="$2"
                            borderRadius="$6"
                            borderWidth={1}
                            borderColor={formData.skills.includes(skill) ? '$plasmaGreen' : '$titanium'}
                          >
                            {skill}
                          </Badge>
                        </Pressable>
                      ))}
                    </XStack>
                  </ScrollView>
                </YStack>
              </YStack>
            </YStack>
          </Animated.View>
        );

      case 2:
        return (
          <Animated.View entering={FadeIn.duration(400)}>
            <YStack gap="$6">
              <YStack gap="$3">
                <H2 fontSize="$7" fontWeight="700" color="$carbonBlack" textAlign="center">
                  Budget & Payment
                </H2>
                <Text fontSize="$4" color="$silver" textAlign="center">
                  Set your budget for this project
                </Text>
              </YStack>
              
              <YStack gap="$4">
                {/* Budget Type */}
                <YStack gap="$3">
                  <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                    How would you like to pay?
                  </Text>
                  <XStack gap="$3">
                    <Pressable
                      flex={1}
                      onPress={() => updateFormData({ budgetType: 'hourly' })}
                    >
                      <Card
                        backgroundColor={formData.budgetType === 'hourly' ? 'rgba(107, 70, 229, 0.1)' : '$whiteCoat'}
                        borderColor={formData.budgetType === 'hourly' ? '$labPurple' : '$titanium'}
                        borderWidth={2}
                        padding="$4"
                        borderRadius="$3"
                        alignItems="center"
                      >
                        <Clock size={24} color={formData.budgetType === 'hourly' ? '#6B46E5' : '#6B7280'} />
                        <Text 
                          fontSize="$4" 
                          fontWeight="600" 
                          color={formData.budgetType === 'hourly' ? '$labPurple' : '$carbonBlack'}
                          marginTop="$2"
                        >
                          Hourly Rate
                        </Text>
                        <Text fontSize="$3" color="$silver" textAlign="center">
                          Pay for hours worked
                        </Text>
                      </Card>
                    </Pressable>
                    
                    <Pressable
                      flex={1}
                      onPress={() => updateFormData({ budgetType: 'fixed' })}
                    >
                      <Card
                        backgroundColor={formData.budgetType === 'fixed' ? 'rgba(107, 70, 229, 0.1)' : '$whiteCoat'}
                        borderColor={formData.budgetType === 'fixed' ? '$labPurple' : '$titanium'}
                        borderWidth={2}
                        padding="$4"
                        borderRadius="$3"
                        alignItems="center"
                      >
                        <DollarSign size={24} color={formData.budgetType === 'fixed' ? '#6B46E5' : '#6B7280'} />
                        <Text 
                          fontSize="$4" 
                          fontWeight="600" 
                          color={formData.budgetType === 'fixed' ? '$labPurple' : '$carbonBlack'}
                          marginTop="$2"
                        >
                          Fixed Price
                        </Text>
                        <Text fontSize="$3" color="$silver" textAlign="center">
                          One-time payment
                        </Text>
                      </Card>
                    </Pressable>
                  </XStack>
                </YStack>

                {/* Budget Range/Amount */}
                <Card backgroundColor="$backgroundSoft" padding="$5" borderRadius="$4">
                  <YStack gap="$3">
                    {formData.budgetType === 'hourly' ? (
                      <>
                        <XStack justifyContent="space-between" alignItems="center">
                          <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                            Hourly Rate Range
                          </Text>
                          <Text fontSize="$5" fontWeight="700" color="$labPurple">
                            ${formData.budgetRange[0]} - ${formData.budgetRange[1]}/hr
                          </Text>
                        </XStack>
                        
                        {/* Budget range selectors */}
                        <YStack gap="$2">
                          {[
                            [10, 25, 'Entry Level'],
                            [20, 50, 'Intermediate'],
                            [40, 80, 'Expert'],
                            [60, 100, 'Specialized']
                          ].map(([min, max, label]) => (
                            <Pressable
                              key={label}
                              onPress={() => updateFormData({ budgetRange: [min, max] as [number, number] })}
                            >
                              <Card
                                backgroundColor={
                                  formData.budgetRange[0] === min && formData.budgetRange[1] === max
                                    ? '$labPurple'
                                    : '$whiteCoat'
                                }
                                padding="$3"
                                borderRadius="$3"
                              >
                                <XStack justifyContent="space-between" alignItems="center">
                                  <Text 
                                    fontSize="$3" 
                                    fontWeight="500"
                                    color={
                                      formData.budgetRange[0] === min && formData.budgetRange[1] === max
                                        ? '$whiteCoat'
                                        : '$carbonBlack'
                                    }
                                  >
                                    {label}
                                  </Text>
                                  <Text 
                                    fontSize="$3" 
                                    fontWeight="600"
                                    color={
                                      formData.budgetRange[0] === min && formData.budgetRange[1] === max
                                        ? '$whiteCoat'
                                        : '$labPurple'
                                    }
                                  >
                                    ${min} - ${max}/hr
                                  </Text>
                                </XStack>
                              </Card>
                            </Pressable>
                          ))}
                        </YStack>
                      </>
                    ) : (
                      <>
                        <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                          Fixed Project Budget
                        </Text>
                        <Card backgroundColor="$whiteCoat" borderColor="$titanium" borderWidth={1} borderRadius="$3">
                          <XStack alignItems="center" paddingHorizontal="$4">
                            <Text fontSize="$4" color="$silver">$</Text>
                            <TextInput
                              style={{
                                flex: 1,
                                padding: 16,
                                fontSize: 18,
                                fontWeight: '600',
                                color: '#6B46E5',
                                outlineStyle: 'none'
                              }}
                              placeholder="1000"
                              placeholderTextColor="#6B7280"
                              value={formData.fixedBudget.toString()}
                              onChangeText={(text) => {
                                const num = parseInt(text) || 0;
                                updateFormData({ fixedBudget: num });
                              }}
                              keyboardType="numeric"
                            />
                          </XStack>
                        </Card>
                      </>
                    )}
                    
                    <Text fontSize="$3" color="$silver" textAlign="center">
                      Estimated {estimatedVAs} VAs match this budget
                    </Text>
                  </YStack>
                </Card>
              </YStack>
            </YStack>
          </Animated.View>
        );

      case 3:
        return (
          <Animated.View entering={FadeIn.duration(400)}>
            <YStack gap="$6">
              <YStack gap="$3">
                <H2 fontSize="$7" fontWeight="700" color="$carbonBlack" textAlign="center">
                  Timeline & Requirements
                </H2>
                <Text fontSize="$4" color="$silver" textAlign="center">
                  When do you need this completed?
                </Text>
              </YStack>
              
              <YStack gap="$4">
                {/* Timeline */}
                <YStack gap="$3">
                  <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                    Project Timeline
                  </Text>
                  <YStack gap="$2">
                    {[
                      'Less than 1 week',
                      '1-2 weeks',
                      '2-4 weeks',
                      '1-3 months',
                      'More than 3 months',
                      'Ongoing/No deadline'
                    ].map((timeline) => (
                      <Pressable
                        key={timeline}
                        onPress={() => updateFormData({ timeline })}
                      >
                        <Card
                          backgroundColor={formData.timeline === timeline ? '$labPurple' : '$whiteCoat'}
                          borderColor={formData.timeline === timeline ? '$labPurple' : '$titanium'}
                          borderWidth={1}
                          padding="$4"
                          borderRadius="$3"
                        >
                          <XStack justifyContent="space-between" alignItems="center">
                            <Text 
                              fontSize="$4" 
                              color={formData.timeline === timeline ? '$whiteCoat' : '$carbonBlack'}
                            >
                              {timeline}
                            </Text>
                            {formData.timeline === timeline && (
                              <CheckCircle size={20} color="#F8FAFC" />
                            )}
                          </XStack>
                        </Card>
                      </Pressable>
                    ))}
                  </YStack>
                </YStack>

                {/* Experience Level */}
                <YStack gap="$3">
                  <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                    Experience Level Required
                  </Text>
                  <XStack gap="$3">
                    {[
                      { id: 'entry', label: 'Entry Level', desc: 'New to the field' },
                      { id: 'intermediate', label: 'Intermediate', desc: '2-5 years experience' },
                      { id: 'expert', label: 'Expert', desc: '5+ years experience' }
                    ].map((level) => (
                      <Pressable
                        key={level.id}
                        flex={1}
                        onPress={() => updateFormData({ experienceLevel: level.id as any })}
                      >
                        <Card
                          backgroundColor={formData.experienceLevel === level.id ? 'rgba(107, 70, 229, 0.1)' : '$whiteCoat'}
                          borderColor={formData.experienceLevel === level.id ? '$labPurple' : '$titanium'}
                          borderWidth={2}
                          padding="$4"
                          borderRadius="$3"
                          alignItems="center"
                        >
                          <Text 
                            fontSize="$4" 
                            fontWeight="600" 
                            color={formData.experienceLevel === level.id ? '$labPurple' : '$carbonBlack'}
                            marginBottom="$1"
                          >
                            {level.label}
                          </Text>
                          <Text fontSize="$2" color="$silver" textAlign="center">
                            {level.desc}
                          </Text>
                        </Card>
                      </Pressable>
                    ))}
                  </XStack>
                </YStack>
              </YStack>
            </YStack>
          </Animated.View>
        );

      case 4:
        return (
          <Animated.View entering={FadeIn.duration(400)}>
            <YStack gap="$6">
              <YStack gap="$3">
                <H2 fontSize="$7" fontWeight="700" color="$carbonBlack" textAlign="center">
                  Review Your Project
                </H2>
                <Text fontSize="$4" color="$silver" textAlign="center">
                  Review your project details before posting
                </Text>
              </YStack>
              
              <YStack gap="$4">
                {/* Project Summary */}
                <Card backgroundColor="$whiteCoat" padding="$5" borderRadius="$4">
                  <YStack gap="$4">
                    <YStack>
                      <Text fontSize="$5" fontWeight="700" color="$carbonBlack">
                        {formData.title}
                      </Text>
                      <Text fontSize="$3" color="$labPurple" fontWeight="500">
                        {formData.category}
                      </Text>
                    </YStack>
                    
                    <Text fontSize="$4" color="$carbonBlack" lineHeight="$6">
                      {formData.description}
                    </Text>
                    
                    {formData.skills.length > 0 && (
                      <XStack flexWrap="wrap" gap="$2">
                        {formData.skills.map((skill) => (
                          <Badge
                            key={skill}
                            backgroundColor="$backgroundSoft"
                            color="$labPurple"
                            size="sm"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </XStack>
                    )}
                  </YStack>
                </Card>

                {/* Budget & Timeline */}
                <XStack gap="$3">
                  <Card flex={1} backgroundColor="$whiteCoat" padding="$4" borderRadius="$4">
                    <YStack alignItems="center">
                      <DollarSign size={24} color="#6B46E5" />
                      <Text fontSize="$5" fontWeight="700" color="$labPurple" marginTop="$2">
                        {formData.budgetType === 'hourly' 
                          ? `$${formData.budgetRange[0]}-${formData.budgetRange[1]}/hr`
                          : `$${formData.fixedBudget}`
                        }
                      </Text>
                      <Text fontSize="$3" color="$silver">
                        {formData.budgetType === 'hourly' ? 'Hourly Rate' : 'Fixed Budget'}
                      </Text>
                    </YStack>
                  </Card>
                  
                  <Card flex={1} backgroundColor="$whiteCoat" padding="$4" borderRadius="$4">
                    <YStack alignItems="center">
                      <Calendar size={24} color="#10F4B1" />
                      <Text fontSize="$4" fontWeight="600" color="$carbonBlack" marginTop="$2" textAlign="center">
                        {formData.timeline}
                      </Text>
                      <Text fontSize="$3" color="$silver">
                        Timeline
                      </Text>
                    </YStack>
                  </Card>
                </XStack>

                {/* Expected Results */}
                <Card backgroundColor="rgba(16, 244, 177, 0.1)" padding="$4" borderRadius="$4" borderColor="$plasmaGreen" borderWidth={1}>
                  <XStack alignItems="center" gap="$3">
                    <View
                      width={48}
                      height={48}
                      borderRadius={24}
                      backgroundColor="$plasmaGreen"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Users size={24} color="#0A0E1A" />
                    </View>
                    <YStack flex={1}>
                      <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                        Expected {estimatedVAs} qualified applications
                      </Text>
                      <Text fontSize="$3" color="$silver">
                        Based on your budget and requirements
                      </Text>
                    </YStack>
                  </XStack>
                </Card>
              </YStack>
            </YStack>
          </Animated.View>
        );

      default:
        return null;
    }
  };

  return (
    <YStack flex={1} backgroundColor="$backgroundSoft">
      {/* Header */}
      <YStack
        backgroundColor="$background"
        paddingHorizontal={isDesktop ? '$8' : '$4'}
        paddingTop="$6"
        paddingBottom="$4"
        borderBottomWidth={1}
        borderBottomColor="$titanium"
      >
        <XStack alignItems="center" justifyContent="space-between" marginBottom="$4">
          <Pressable
            onPress={() => navigation.goBack()}
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: '#F8FAFC',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 2,
              borderColor: '#E1E8ED',
            }}
          >
            <ArrowLeft size={20} color="#6B46E5" />
          </Pressable>
          
          <H1 fontSize={isDesktop ? '$8' : '$6'} color="$carbonBlack">
            Post a Project
          </H1>
          
          <View width={44} /> {/* Spacer */}
        </XStack>

        <StepProgress
          steps={steps}
          currentStep={currentStep}
          onStepPress={(stepIndex) => {
            if (stepIndex <= currentStep) {
              setCurrentStep(stepIndex);
            }
          }}
        />
      </YStack>

      {/* Content */}
      <ScrollView flex={1} paddingHorizontal={isDesktop ? '$8' : '$4'} paddingVertical="$6">
        {renderStepContent()}
      </ScrollView>

      {/* Navigation Footer */}
      <YStack
        backgroundColor="$background"
        paddingHorizontal={isDesktop ? '$8' : '$4'}
        paddingVertical="$4"
        borderTopWidth={1}
        borderTopColor="$titanium"
      >
        <XStack justifyContent="space-between" alignItems="center">
          <Button
            variant="outline"
            borderColor="$titanium"
            color="$carbonBlack"
            onPress={prevStep}
            disabled={currentStep === 0}
            opacity={currentStep === 0 ? 0.5 : 1}
          >
            <ArrowLeft size={20} />
            Back
          </Button>

          <Text fontSize="$3" color="$silver">
            Step {currentStep + 1} of {steps.length}
          </Text>

          <Button
            backgroundColor={currentStep === steps.length - 1 ? '$plasmaGreen' : '$labPurple'}
            color={currentStep === steps.length - 1 ? '$carbonBlack' : '$whiteCoat'}
            onPress={() => {
              if (currentStep === steps.length - 1) {
                // Submit project
                console.log('Submitting project:', formData);
                navigation.goBack();
              } else {
                nextStep();
              }
            }}
            disabled={!canProceed()}
            opacity={canProceed() ? 1 : 0.5}
          >
            {currentStep === steps.length - 1 ? 'Post Project' : 'Next'}
            {currentStep !== steps.length - 1 && <ArrowRight size={20} />}
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
}