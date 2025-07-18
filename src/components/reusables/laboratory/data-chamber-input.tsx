import React from 'react';
import { Animated } from 'react-native';
import { YStack, Text } from 'tamagui';
import { Input, InputProps } from '../primitives/input';

interface DataChamberInputProps extends InputProps {
  label?: string;
  helperText?: string;
}

export function DataChamberInput({ 
  label,
  helperText,
  error,
  ...props 
}: DataChamberInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const labelAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(labelAnim, {
      toValue: isFocused || props.value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isFocused, props.value]);

  return (
    <YStack position="relative">
      {label && (
        <Animated.View
          style={{
            position: 'absolute',
            left: 12,
            backgroundColor: 'white',
            paddingHorizontal: 4,
            zIndex: 1,
            top: labelAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [10, -8],
            }),
          }}
        >
          <Animated.Text
            style={{
              fontSize: labelAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 12],
              }),
              color: error ? '#EF4444' : isFocused ? '#6B46E5' : '#6B7280',
            }}
          >
            {label}
          </Animated.Text>
        </Animated.View>
      )}
      
      <Input
        borderWidth={2}
        borderColor={error ? '$error' : isFocused ? '$labPurple' : '$borderColor'}
        focusStyle={{
          borderColor: '$labPurple',
          shadowColor: '$labPurple',
          shadowOpacity: 0.2,
          shadowRadius: 4,
        }}
        onFocus={() => {
          setIsFocused(true);
          props.onFocus?.();
        }}
        onBlur={() => {
          setIsFocused(false);
          props.onBlur?.();
        }}
        error={error}
        {...props}
      />
      
      {helperText && (
        <Text 
          fontSize="$2" 
          marginTop="$1" 
          marginLeft="$1"
          color={error ? "$error" : "$silver"}
        >
          {helperText}
        </Text>
      )}
    </YStack>
  );
}