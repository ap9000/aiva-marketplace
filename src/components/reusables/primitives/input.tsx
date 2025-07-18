import * as React from 'react';
import { Input as TamaguiInput, InputProps as TamaguiInputProps } from 'tamagui';

export interface InputProps extends TamaguiInputProps {
  error?: boolean;
}

const Input = React.forwardRef<
  any,
  InputProps
>(({ error, ...props }, ref) => (
  <TamaguiInput
    ref={ref}
    size="$4"
    borderWidth={1}
    borderColor={error ? '$error' : '$borderColor'}
    backgroundColor="$background"
    borderRadius="$3"
    paddingHorizontal="$3"
    fontSize="$3"
    placeholderTextColor="$placeholderColor"
    focusStyle={{
      borderColor: '$labPurple',
      outlineWidth: 0,
    }}
    {...props}
  />
));
Input.displayName = 'Input';

export { Input };