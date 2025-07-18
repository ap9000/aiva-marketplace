import React, { useEffect } from 'react';
import { YStack, Text, View } from 'tamagui';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from 'react-native-reanimated';

interface ProgressBarProps {
  progress: number; // 0-100
  color?: string;
  backgroundColor?: string;
  height?: number;
  animated?: boolean;
  showLabel?: boolean;
  label?: string;
  borderRadius?: number;
}

export const ProgressBar = ({ 
  progress,
  color = '#6B46E5', // $labPurple
  backgroundColor = '#F8FAFC', // $backgroundSoft
  height = 8,
  animated = true,
  showLabel = false,
  label,
  borderRadius
}: ProgressBarProps) => {
  const animatedWidth = useSharedValue(0);
  
  useEffect(() => {
    if (animated) {
      animatedWidth.value = withTiming(progress, { 
        duration: 1000, 
        easing: Easing.out(Easing.cubic) 
      });
    } else {
      animatedWidth.value = progress;
    }
  }, [progress, animated]);
  
  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedWidth.value}%`
  }));
  
  const radius = borderRadius ?? height / 2;
  
  return (
    <YStack gap="$2">
      {showLabel && (
        <Text fontSize="$3" color="$silver">
          {label || `${Math.round(progress)}% complete`}
        </Text>
      )}
      
      <View 
        backgroundColor={backgroundColor}
        height={height} 
        borderRadius={radius}
        overflow="hidden"
        width="100%"
      >
        <Animated.View
          style={[
            {
              height: '100%',
              backgroundColor: color,
              borderRadius: radius
            },
            animatedStyle
          ]}
        />
      </View>
    </YStack>
  );
};

interface CircularProgressProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
  showLabel?: boolean;
  children?: React.ReactNode;
}

export const CircularProgress = ({
  progress,
  size = 48,
  strokeWidth = 4,
  color = '#6B46E5',
  backgroundColor = '#F8FAFC',
  showLabel = false,
  children
}: CircularProgressProps) => {
  const animatedProgress = useSharedValue(0);
  
  useEffect(() => {
    animatedProgress.value = withTiming(progress, { 
      duration: 1000, 
      easing: Easing.out(Easing.cubic) 
    });
  }, [progress]);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  const animatedStyle = useAnimatedStyle(() => {
    const strokeDashoffset = circumference - (animatedProgress.value / 100) * circumference;
    return {
      strokeDashoffset
    };
  });
  
  return (
    <YStack alignItems="center" justifyContent="center" position="relative">
      <svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        
        {/* Progress circle */}
        <Animated.View>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeLinecap="round"
            style={animatedStyle}
          />
        </Animated.View>
      </svg>
      
      {/* Center content */}
      <YStack
        position="absolute"
        alignItems="center"
        justifyContent="center"
        width={size}
        height={size}
      >
        {children || (showLabel && (
          <Text fontSize="$3" fontWeight="600" color="$carbonBlack">
            {Math.round(progress)}%
          </Text>
        ))}
      </YStack>
    </YStack>
  );
};

export default ProgressBar;