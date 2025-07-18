import * as React from 'react';
import { Card as TamaguiCard, XStack, YStack, Text, CardProps as TamaguiCardProps, XStackProps, YStackProps, TextProps } from 'tamagui';

const Card = React.forwardRef<
  HTMLElement,
  TamaguiCardProps
>((props, ref) => (
  <TamaguiCard
    ref={ref}
    elevate
    borderRadius="$4"
    borderColor="$borderColor"
    backgroundColor="$background"
    shadowColor="$shadowColor"
    shadowOpacity={0.1}
    shadowRadius={4}
    {...props}
  />
));
Card.displayName = 'Card';

const CardHeader = React.forwardRef<
  HTMLElement,
  YStackProps
>((props, ref) => (
  <YStack
    ref={ref}
    gap="$2"
    padding="$4"
    {...props}
  />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<
  HTMLElement,
  TextProps
>((props, ref) => (
  <Text
    ref={ref}
    fontSize="$7"
    fontWeight="600"
    color="$color"
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLElement,
  TextProps
>((props, ref) => (
  <Text
    ref={ref}
    fontSize="$3"
    color="$colorHover"
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<
  HTMLElement,
  YStackProps
>((props, ref) => (
  <YStack 
    ref={ref} 
    padding="$4" 
    paddingTop="$0"
    {...props} 
  />
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<
  HTMLElement,
  XStackProps
>((props, ref) => (
  <XStack
    ref={ref}
    alignItems="center"
    padding="$4"
    paddingTop="$0"
    {...props}
  />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };