import React, { useState, forwardRef } from 'react';
import {
  TextInputProps,
  Pressable,
} from 'react-native';
import { YStack, XStack, Text, Input as TamaguiInput, InputProps as TamaguiInputProps } from 'tamagui';
import { MaterialIcons } from '@expo/vector-icons';

export interface InputProps extends Omit<TamaguiInputProps, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  size?: 'sm' | 'md' | 'lg';
  showPassword?: boolean;
}

export const Input = forwardRef<any, InputProps>(({
  label,
  error,
  helperText,
  icon,
  secureTextEntry,
  showPassword: showPasswordProp,
  size = 'md',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = secureTextEntry || showPasswordProp !== undefined;
  const borderColor = error ? '$error' : isFocused ? '$labPurple' : '$borderColor';

  const sizeStyles = {
    sm: { height: 36 },
    md: { height: 44 },
    lg: { height: 52 },
  };

  return (
    <YStack marginBottom="$2">
      {label && (
        <Text fontSize="$3" fontWeight="500" color="$color" marginBottom="$1">
          {label}
        </Text>
      )}
      
      <XStack
        borderWidth={isFocused ? 2 : 1}
        borderColor={borderColor}
        borderRadius="$3"
        backgroundColor="$background"
        alignItems="center"
        height={sizeStyles[size].height}
        hoverStyle={{ borderColor: '$colorHover' }}
      >
        {icon && (
          <MaterialIcons
            name={icon}
            size={20}
            color={error ? '#EF4444' : isFocused ? '#6B46E5' : '#6B7280'}
            style={{ marginLeft: 8 }}
          />
        )}
        
        <TamaguiInput
          ref={ref}
          flex={1}
          paddingHorizontal="$2"
          paddingLeft={icon ? "$1" : "$2"}
          fontSize="$4"
          color="$color"
          placeholderTextColor="$placeholderColor"
          borderWidth={0}
          backgroundColor="transparent"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPasswordField && !showPassword}
          {...props}
        />
        
        {isPasswordField && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={{ padding: 8 }}
          >
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color="#6B7280"
            />
          </Pressable>
        )}
      </XStack>
      
      {(error || helperText) && (
        <Text 
          fontSize="$2" 
          marginTop="$1"
          color={error ? "$error" : "$colorHover"}
        >
          {error || helperText}
        </Text>
      )}
    </YStack>
  );
});

Input.displayName = 'Input';