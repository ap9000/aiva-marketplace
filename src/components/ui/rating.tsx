import React from 'react';
import { View, Text, Pressable, StyleSheet, ViewStyle } from 'react-native';
import { Star } from 'lucide-react-native';
import { colors } from '../../theme/colors';

interface RatingProps {
  value: number;
  maxValue?: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  showValue?: boolean;
  onChange?: (rating: number) => void;
  style?: ViewStyle;
}

const sizeMap = {
  sm: 16,
  md: 20,
  lg: 24,
};

export const Rating: React.FC<RatingProps> = ({
  value,
  maxValue = 5,
  size = 'md',
  readonly = true,
  showValue = false,
  onChange,
  style,
}) => {
  const starSize = sizeMap[size];
  const stars = Array.from({ length: maxValue }, (_, i) => i + 1);

  const handleStarPress = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  return (
    <View style={[styles.container, style]}>
      {stars.map((star) => {
        const isFilled = star <= value;
        const isHalfFilled = star === Math.ceil(value) && value % 1 !== 0;

        return (
          <Pressable
            key={star}
            onPress={() => handleStarPress(star)}
            disabled={readonly}
            style={styles.star}
          >
            <Star
              size={starSize}
              color={colors.warning}
              fill={isFilled ? colors.warning : 'transparent'}
            />
          </Pressable>
        );
      })}
      {showValue && (
        <Text style={styles.value}>
          {value.toFixed(1)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: 2,
  },
  value: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: colors.gray[700],
  },
});