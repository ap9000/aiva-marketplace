import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Rating } from '../ui/rating';
import { ThumbsUp, MessageCircle, CheckCircle } from 'lucide-react-native';
import { colors } from '../../theme/colors';

interface ReviewCardProps {
  review: {
    id: string;
    author: {
      name: string;
      avatar: string;
      isVerified: boolean;
    };
    rating: number;
    date: string;
    content: string;
    serviceName?: string;
    isVerifiedPurchase: boolean;
    helpfulCount: number;
    hasVAResponse: boolean;
    images?: string[];
  };
  onHelpful?: () => void;
  onReply?: () => void;
  onImagePress?: (imageIndex: number) => void;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onHelpful,
  onReply,
  onImagePress,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <Card variant="default" style={styles.card}>
      <CardContent style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={{ uri: review.author.avatar }}
            style={styles.avatar}
          />
          <View style={styles.headerInfo}>
            <View style={styles.authorRow}>
              <Text style={styles.authorName}>{review.author.name}</Text>
              {review.author.isVerified && (
                <CheckCircle size={14} color={colors.success} style={styles.verifiedIcon} />
              )}
            </View>
            <View style={styles.ratingRow}>
              <Rating value={review.rating} size="sm" />
              <Text style={styles.date}>• {formatDate(review.date)}</Text>
            </View>
          </View>
        </View>

        {/* Badges */}
        <View style={styles.badges}>
          {review.isVerifiedPurchase && (
            <Badge variant="success" size="sm">
              Verified Purchase
            </Badge>
          )}
          {review.serviceName && (
            <Badge variant="secondary" size="sm" style={styles.badge}>
              {review.serviceName}
            </Badge>
          )}
        </View>

        {/* Review Content */}
        <Text style={styles.reviewText}>
          {review.content}
        </Text>

        {/* Images */}
        {review.images && review.images.length > 0 && (
          <View style={styles.imagesContainer}>
            {review.images.map((image, index) => (
              <Pressable
                key={index}
                onPress={() => onImagePress?.(index)}
                style={styles.imageWrapper}
              >
                <Image
                  source={{ uri: image }}
                  style={styles.reviewImage}
                  resizeMode="cover"
                />
              </Pressable>
            ))}
          </View>
        )}

        {/* Actions */}
        <View style={styles.actions}>
          <Pressable
            onPress={onHelpful}
            style={styles.actionButton}
          >
            <ThumbsUp size={16} color={colors.gray[600]} />
            <Text style={styles.actionText}>
              Helpful ({review.helpfulCount})
            </Text>
          </Pressable>

          {review.hasVAResponse && (
            <View style={styles.actionButton}>
              <MessageCircle size={16} color={colors.primary.main} />
              <Text style={styles.vaResponseText}>
                VA responded
              </Text>
            </View>
          )}

          {onReply && (
            <Pressable
              onPress={onReply}
              style={styles.actionButton}
            >
              <MessageCircle size={16} color={colors.gray[600]} />
              <Text style={styles.actionText}>
                Reply
              </Text>
            </Pressable>
          )}
        </View>
      </CardContent>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[200],
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorName: {
    fontWeight: '600',
    color: colors.gray[900],
  },
  verifiedIcon: {
    marginLeft: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    color: colors.gray[500],
    marginLeft: 8,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  badge: {
    marginLeft: 8,
  },
  reviewText: {
    color: colors.gray[700],
    lineHeight: 20,
    marginBottom: 12,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  imageWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  reviewImage: {
    width: 80,
    height: 80,
    backgroundColor: colors.gray[200],
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: colors.gray[600],
    marginLeft: 4,
  },
  vaResponseText: {
    fontSize: 14,
    color: colors.primary.main,
    marginLeft: 4,
  },
});