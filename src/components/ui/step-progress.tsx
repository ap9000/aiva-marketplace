import React from 'react';
import { YStack, XStack, Text, View, Pressable } from 'tamagui';
import { Check } from 'lucide-react-native';

interface Step {
  id: string;
  label: string;
}

interface StepProgressProps {
  steps: Step[];
  currentStep: number;
  onStepPress?: (stepIndex: number) => void;
  allowSkip?: boolean;
}

export const StepProgress = ({ 
  steps, 
  currentStep, 
  onStepPress,
  allowSkip = false
}: StepProgressProps) => {
  return (
    <XStack alignItems="center" justifyContent="center" padding="$4">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <Pressable
            onPress={() => {
              if (allowSkip || index <= currentStep) {
                onStepPress?.(index);
              }
            }}
            alignItems="center"
            opacity={index <= currentStep ? 1 : 0.5}
            disabled={!allowSkip && index > currentStep}
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
                <Check size={16} color="#F8FAFC" />
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
              fontWeight={index === currentStep ? '600' : '400'}
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
              maxWidth={60}
            />
          )}
        </React.Fragment>
      ))}
    </XStack>
  );
};

export default StepProgress;