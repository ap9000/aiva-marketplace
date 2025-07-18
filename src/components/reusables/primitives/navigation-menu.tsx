import * as React from 'react';
import { YStack, XStack, Text, Button } from 'tamagui';
import * as Slot from '@rn-primitives/slot';

const NavigationMenu = React.forwardRef<any, any>(
  ({ children, ...props }, ref) => (
    <YStack ref={ref} position="relative" {...props}>
      {children}
    </YStack>
  )
);
NavigationMenu.displayName = 'NavigationMenu';

const NavigationMenuList = React.forwardRef<any, any>(
  ({ ...props }, ref) => (
    <XStack
      ref={ref}
      alignItems="center"
      justifyContent="center"
      gap="$1"
      {...props}
    />
  )
);
NavigationMenuList.displayName = 'NavigationMenuList';

const NavigationMenuItem = React.forwardRef<any, any>(
  ({ ...props }, ref) => (
    <YStack ref={ref} position="relative" {...props} />
  )
);
NavigationMenuItem.displayName = 'NavigationMenuItem';

interface NavigationMenuTriggerProps {
  asChild?: boolean;
  children?: React.ReactNode;
  onPress?: () => void;
}

const NavigationMenuTrigger = React.forwardRef<any, NavigationMenuTriggerProps>(
  ({ asChild = false, children, onPress, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Button;
    return (
      <Component
        ref={ref}
        variant="ghost"
        size="$3"
        onPress={onPress}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

const NavigationMenuContent = React.forwardRef<any, any>(
  ({ children, ...props }, ref) => (
    <YStack
      ref={ref}
      position="absolute"
      top="100%"
      left={0}
      zIndex={50}
      minWidth={160}
      backgroundColor="$background"
      borderRadius="$3"
      borderWidth={1}
      borderColor="$borderColor"
      shadowColor="$shadowColor"
      shadowOpacity={0.1}
      shadowRadius={8}
      padding="$2"
      {...props}
    >
      {children}
    </YStack>
  )
);
NavigationMenuContent.displayName = 'NavigationMenuContent';

const NavigationMenuLink = React.forwardRef<any, any>(
  ({ asChild = false, children, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Button;
    return (
      <Component
        ref={ref}
        variant="ghost"
        justifyContent="flex-start"
        width="100%"
        {...props}
      >
        {children}
      </Component>
    );
  }
);
NavigationMenuLink.displayName = 'NavigationMenuLink';

const NavigationMenuIndicator = React.forwardRef<any, any>(
  ({ ...props }, ref) => (
    <YStack
      ref={ref}
      position="absolute"
      top="100%"
      height={2}
      backgroundColor="$labPurple"
      animation="quick"
      {...props}
    />
  )
);
NavigationMenuIndicator.displayName = 'NavigationMenuIndicator';

const NavigationMenuViewport = React.forwardRef<any, any>(
  ({ ...props }, ref) => (
    <YStack
      ref={ref}
      position="relative"
      marginTop="$2"
      overflow="hidden"
      {...props}
    />
  )
);
NavigationMenuViewport.displayName = 'NavigationMenuViewport';

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};