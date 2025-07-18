import React from 'react';
import { TextInput, View, Text, TextInputProps, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../../theme/colors';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: 'default' | 'error';
  size?: 'default' | 'sm' | 'lg';
  containerStyle?: ViewStyle;
}

export const Input = React.forwardRef<TextInput, InputProps>(
  (
    {
      label,
      error,
      helperText,
      variant = 'default',
      size = 'default',
      style,
      containerStyle,
      ...props
    },
    ref
  ) => {
    const inputVariant = error ? 'error' : variant;
    const variantStyle = getVariantStyles(inputVariant);
    const sizeStyle = getSizeStyles(size);

    return (
      <View style={[styles.container, containerStyle]}>
        {label && (
          <Text style={styles.label}>
            {label}
          </Text>
        )}
        <TextInput
          ref={ref}
          style={[
            styles.input,
            variantStyle,
            sizeStyle,
            style as TextStyle
          ]}
          placeholderTextColor={colors.gray[400]}
          {...props}
        />
        {error && (
          <Text style={styles.error}>{error}</Text>
        )}
        {helperText && !error && (
          <Text style={styles.helperText}>{helperText}</Text>
        )}
      </View>
    );
  }
);

Input.displayName = 'Input';

const getVariantStyles = (variant: 'default' | 'error') => {
  const variants = {
    default: {
      borderColor: colors.gray[300],
    },
    error: {
      borderColor: colors.error,
    },
  };
  
  return variants[variant];
};

const getSizeStyles = (size: InputProps['size']) => {
  const sizes = {
    default: {
      height: 48,
      fontSize: 16,
    },
    sm: {
      height: 36,
      fontSize: 14,
    },
    lg: {
      height: 56,
      fontSize: 18,
    },
  };
  
  return sizes[size || 'default'];
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[700],
  },
  input: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: colors.gray[900],
    backgroundColor: colors.white,
  },
  error: {
    marginTop: 4,
    fontSize: 14,
    color: colors.error,
  },
  helperText: {
    marginTop: 4,
    fontSize: 14,
    color: colors.gray[500],
  },
});