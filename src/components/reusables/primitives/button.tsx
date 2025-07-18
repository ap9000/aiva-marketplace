import * as React from 'react';
import { Button as TamaguiButton, ButtonProps as TamaguiButtonProps } from 'tamagui';
import * as Slot from '@rn-primitives/slot';

export interface ButtonProps extends Omit<TamaguiButtonProps, 'variant'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  asChild?: boolean;
  label?: string;
}

const Button = React.forwardRef<
  any,
  ButtonProps
>(({ variant = 'default', size = '$4', asChild = false, label, children, ...props }, ref) => {
  const Component = asChild ? Slot.Pressable : TamaguiButton;
  
  const variantStyles = {
    default: {
      backgroundColor: '$labPurple',
      color: '$whiteCoat',
      hoverStyle: { backgroundColor: '$primaryHover' },
      pressStyle: { backgroundColor: '$primaryPress' },
    },
    destructive: {
      backgroundColor: '$error',
      color: '$whiteCoat',
      hoverStyle: { backgroundColor: '$red10' },
      pressStyle: { backgroundColor: '$red11' },
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: '$borderColor',
      color: '$color',
      hoverStyle: { backgroundColor: '$backgroundSoft' },
      pressStyle: { backgroundColor: '$backgroundSoft' },
    },
    secondary: {
      backgroundColor: '$backgroundSoft',
      color: '$color',
      hoverStyle: { backgroundColor: '$gray4' },
      pressStyle: { backgroundColor: '$gray5' },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '$color',
      hoverStyle: { backgroundColor: '$backgroundSoft' },
      pressStyle: { backgroundColor: '$backgroundSoft' },
    },
    link: {
      backgroundColor: 'transparent',
      color: '$labPurple',
      textDecorationLine: 'underline',
      hoverStyle: { opacity: 0.8 },
      pressStyle: { opacity: 0.7 },
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <Component
      ref={ref}
      size={size}
      {...currentVariant}
      {...props}
    >
      {label || children}
    </Component>
  );
});

Button.displayName = 'Button';

export { Button };