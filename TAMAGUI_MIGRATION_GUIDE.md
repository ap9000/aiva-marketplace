# Tamagui Migration Guide

## Overview
This guide helps you migrate from Nativewind (Tailwind CSS classes) to Tamagui's prop-based styling system.

## Key Differences

### 1. Styling Approach
- **Nativewind**: Uses className with Tailwind CSS classes
- **Tamagui**: Uses style props directly on components

### 2. Layout Components
- **Nativewind**: `<View className="flex-row">` 
- **Tamagui**: `<XStack>` (horizontal) or `<YStack>` (vertical)

### 3. Spacing
- **Nativewind**: `className="p-4 m-2"`
- **Tamagui**: `padding="$4" margin="$2"`

## Common Conversions

### Layout
```tsx
// Nativewind
<View className="flex-row items-center justify-between p-4">

// Tamagui
<XStack alignItems="center" justifyContent="space-between" padding="$4">
```

### Flexbox
```tsx
// Nativewind
<View className="flex-1">

// Tamagui
<YStack flex={1}>
```

### Colors
```tsx
// Nativewind
<Text className="text-gray-500 bg-purple-500">

// Tamagui
<Text color="$colorHover" backgroundColor="$labPurple">
```

### Sizing
```tsx
// Nativewind
<View className="w-16 h-16">

// Tamagui
<YStack width={64} height={64}>
```

### Border & Radius
```tsx
// Nativewind
<View className="border border-gray-300 rounded-lg">

// Tamagui
<YStack borderWidth={1} borderColor="$borderColor" borderRadius="$4">
```

### Typography
```tsx
// Nativewind
<Text className="text-lg font-semibold">

// Tamagui
<Text fontSize="$5" fontWeight="600">
```

## Component Migration Examples

### Button Migration
```tsx
// Before (Nativewind)
<Pressable className="bg-purple-500 px-4 py-2 rounded-md">
  <Text className="text-white">Click me</Text>
</Pressable>

// After (Tamagui)
<Button variant="default">Click me</Button>
```

### Card Migration
```tsx
// Before (Nativewind)
<View className="bg-white rounded-lg shadow-sm p-4">
  <Text className="text-xl font-bold">Title</Text>
  <Text className="text-gray-500">Description</Text>
</View>

// After (Tamagui)
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
</Card>
```

### Input Migration
```tsx
// Before (Nativewind)
<TextInput 
  className="border border-gray-300 rounded-md px-3 py-2"
  placeholder="Enter text"
/>

// After (Tamagui)
<Input 
  placeholder="Enter text"
/>
```

## Tokens Reference

### Spacing Tokens
- `$0.5` = 2px
- `$1` = 4px
- `$2` = 8px
- `$3` = 12px
- `$4` = 16px
- `$5` = 20px
- `$6` = 24px

### Font Size Tokens
- `$1` = 11px
- `$2` = 12px
- `$3` = 13px
- `$4` = 14px
- `$5` = 16px
- `$6` = 18px
- `$7` = 20px
- `$8` = 23px
- `$9` = 30px

### Color Tokens (Custom)
- `$labPurple` = #6B46E5
- `$plasmaGreen` = #10F4B1
- `$whiteCoat` = #F8FAFC
- `$titanium` = #E1E8ED
- `$carbonBlack` = #0A0E1A
- `$silver` = #6B7280

### Theme Colors
- `$background` = Background color
- `$color` = Text color
- `$borderColor` = Border color
- `$primary` = Primary brand color
- `$error` = Error/danger color
- `$success` = Success color
- `$warning` = Warning color

## Migration Steps

1. **Update imports**: Replace React Native components with Tamagui equivalents
2. **Convert className to props**: Map Tailwind classes to Tamagui props
3. **Use layout components**: Replace View with XStack/YStack
4. **Apply tokens**: Use $ prefixed tokens for consistent spacing/colors
5. **Test responsiveness**: Ensure layouts work across different screen sizes

## Tips

1. **Use TypeScript**: Tamagui has excellent TypeScript support
2. **Leverage animations**: Tamagui has built-in animation support
3. **Theme-aware**: Components automatically adapt to light/dark themes
4. **Performance**: Tamagui optimizes styles at build time

## Need Help?

- Check the example in `/src/components/examples/TamaguiExample.tsx`
- Tamagui docs: https://tamagui.dev
- Look at converted components in `/src/components/reusables/primitives/`