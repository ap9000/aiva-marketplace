import React from 'react';
import { Animated } from 'react-native';
import { YStack } from 'tamagui';
import { Button, ButtonProps } from '../primitives/button';

interface ExperimentButtonProps extends ButtonProps {
  glowing?: boolean;
}

export function ExperimentButton({ 
  glowing = false,
  ...props 
}: ExperimentButtonProps) {
  const glowAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (glowing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [glowing]);

  return (
    <YStack position="relative">
      {glowing && (
        <Animated.View 
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: 'rgba(16, 244, 177, 0.3)',
            borderRadius: 8,
            opacity: glowAnim,
            transform: [{
              scale: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.05],
              }),
            }],
          }}
        />
      )}
      <Button
        backgroundColor="$labPurple"
        backgroundImage="linear-gradient(to right, $labPurple, $primary)"
        pressStyle={{ scale: 0.95 }}
        animation="quick"
        {...props}
      />
    </YStack>
  );
}