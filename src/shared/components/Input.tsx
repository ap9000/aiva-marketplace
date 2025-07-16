import React, { useState, forwardRef } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ViewStyle,
  TextInputProps,
  Platform,
  Pressable,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../../theme/ThemeContext';
import { theme } from '../../theme';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  showPassword?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(({
  label,
  error,
  helperText,
  icon,
  containerStyle,
  inputStyle,
  secureTextEntry,
  showPassword: showPasswordProp,
  ...props
}, ref) => {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const styles = createStyles(isDark);

  const inputContainerStyle = [
    styles.inputContainer,
    isFocused && styles.inputContainerFocused,
    error && styles.inputContainerError,
  ];

  const textInputStyle = [
    styles.input,
    icon && styles.inputWithIcon,
    inputStyle,
  ];

  const isPasswordField = secureTextEntry || showPasswordProp !== undefined;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={inputContainerStyle}>
        {icon && (
          <MaterialIcons
            name={icon}
            size={20}
            color={error ? theme.colors.error : 
                   isFocused ? theme.colors.primary.main : 
                   theme.colors.gray[500]}
            style={styles.icon}
          />
        )}
        
        <TextInput
          ref={ref}
          style={textInputStyle}
          placeholderTextColor={theme.colors.gray[500]}
          selectionColor={theme.colors.primary.main}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPasswordField && !showPassword}
          {...props}
        />
        
        {isPasswordField && (
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.passwordToggle}
          >
            <MaterialIcons
              name={showPassword ? 'visibility' : 'visibility-off'}
              size={20}
              color={theme.colors.gray[500]}
            />
          </Pressable>
        )}
      </View>
      
      {(error || helperText) && (
        <Text style={[styles.helperText, error && styles.errorText]}>
          {error || helperText}
        </Text>
      )}
    </View>
  );
});

const createStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    marginBottom: theme.spacing[2],
  },
  
  label: {
    fontSize: theme.fontSize.sm,
    fontWeight: theme.fontWeight.medium,
    color: isDark ? theme.colors.white : theme.colors.gray[700],
    marginBottom: theme.spacing[1],
  },
  
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: isDark ? theme.colors.dark.border : theme.colors.gray[300],
    borderRadius: theme.borderRadius.md,
    backgroundColor: isDark ? theme.colors.dark.surface : theme.colors.white,
    height: theme.layout.inputHeight,
  },
  
  inputContainerFocused: {
    borderColor: theme.colors.primary.main,
    borderWidth: 2,
  },
  
  inputContainerError: {
    borderColor: theme.colors.error,
  },
  
  icon: {
    marginLeft: theme.spacing[2],
  },
  
  input: {
    flex: 1,
    paddingHorizontal: theme.spacing[2],
    fontSize: theme.fontSize.base,
    color: isDark ? theme.colors.white : theme.colors.gray[900],
    fontFamily: theme.fontFamily.primary,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  
  inputWithIcon: {
    paddingLeft: theme.spacing[1],
  },
  
  passwordToggle: {
    padding: theme.spacing[2],
  },
  
  helperText: {
    fontSize: theme.fontSize.xs,
    color: theme.colors.gray[500],
    marginTop: theme.spacing[1],
  },
  
  errorText: {
    color: theme.colors.error,
  },
});

Input.displayName = 'Input';