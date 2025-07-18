import React, { useState } from 'react';
import { ScrollView, View, Pressable, useWindowDimensions } from 'react-native';
import { YStack, XStack, Text, H1, H2, H3, Paragraph } from 'tamagui';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { useNavigation } from '@react-navigation/native';
import { useResponsive } from '../../../shared/hooks/useResponsive';
import { 
  CreditCard, 
  Download, 
  Plus, 
  MoreHorizontal,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  Shield,
  AlertCircle,
  TrendingUp,
  Filter
} from 'lucide-react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  SlideInRight,
} from 'react-native-reanimated';

interface PaymentMethod {
  id: string;
  type: 'card' | 'bank' | 'paypal';
  name: string;
  last4: string;
  expiryDate?: string;
  isDefault: boolean;
  brand?: string;
}

interface Transaction {
  id: string;
  type: 'payment' | 'refund' | 'fee' | 'deposit';
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  paymentMethod: string;
  invoice?: string;
  vaName?: string;
  projectName?: string;
}

interface EscrowItem {
  id: string;
  projectName: string;
  vaName: string;
  amount: number;
  milestoneTitle: string;
  dueDate: string;
  status: 'pending' | 'released' | 'disputed';
}

const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'card',
    name: 'Business Visa',
    last4: '4242',
    expiryDate: '12/25',
    isDefault: true,
    brand: 'Visa',
  },
  {
    id: '2',
    type: 'card',
    name: 'Personal MasterCard',
    last4: '5555',
    expiryDate: '08/26',
    isDefault: false,
    brand: 'Mastercard',
  },
  {
    id: '3',
    type: 'bank',
    name: 'Chase Business Account',
    last4: '1234',
    isDefault: false,
  },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'payment',
    description: 'Payment to Sarah Johnson',
    amount: -875.00,
    date: '2025-01-15',
    status: 'completed',
    paymentMethod: 'Visa ****4242',
    invoice: 'INV-2025-001',
    vaName: 'Sarah Johnson',
    projectName: 'Q4 Marketing Campaign',
  },
  {
    id: '2',
    type: 'deposit',
    description: 'Account funding',
    amount: 2000.00,
    date: '2025-01-14',
    status: 'completed',
    paymentMethod: 'Chase ****1234',
  },
  {
    id: '3',
    type: 'payment',
    description: 'Payment to Mike Chen',
    amount: -540.00,
    date: '2025-01-12',
    status: 'completed',
    paymentMethod: 'Visa ****4242',
    invoice: 'INV-2025-002',
    vaName: 'Mike Chen',
    projectName: 'Social Media Overhaul',
  },
  {
    id: '4',
    type: 'fee',
    description: 'Platform service fee',
    amount: -27.00,
    date: '2025-01-12',
    status: 'completed',
    paymentMethod: 'Visa ****4242',
  },
  {
    id: '5',
    type: 'payment',
    description: 'Payment to Emma Davis',
    amount: -725.00,
    date: '2025-01-10',
    status: 'pending',
    paymentMethod: 'Visa ****4242',
    invoice: 'INV-2025-003',
    vaName: 'Emma Davis',
    projectName: 'Data Analysis Project',
  },
];

const mockEscrowItems: EscrowItem[] = [
  {
    id: '1',
    projectName: 'Q4 Marketing Campaign',
    vaName: 'Sarah Johnson',
    amount: 1250.00,
    milestoneTitle: 'Content Calendar Completion',
    dueDate: '2025-01-20',
    status: 'pending',
  },
  {
    id: '2',
    projectName: 'Website Redesign',
    vaName: 'Alex Turner',
    amount: 800.00,
    milestoneTitle: 'Design Mockups',
    dueDate: '2025-01-18',
    status: 'pending',
  },
];

const PaymentMethodCard = ({ method }: { method: PaymentMethod }) => {
  const getIcon = () => {
    switch (method.type) {
      case 'card':
        return <CreditCard size={24} color="#6B46E5" />;
      case 'bank':
        return <DollarSign size={24} color="#6B46E5" />;
      case 'paypal':
        return <Shield size={24} color="#6B46E5" />;
      default:
        return <CreditCard size={24} color="#6B46E5" />;
    }
  };

  return (
    <Card
      backgroundColor="$whiteCoat"
      borderColor={method.isDefault ? '$labPurple' : '$titanium'}
      borderWidth={method.isDefault ? 2 : 1}
      padding="$4"
      hoverStyle={{
        borderColor: '$labPurple',
        shadowColor: '$labPurple',
        shadowOpacity: 0.1,
        shadowRadius: 8,
      }}
      animation="quick"
    >
      <CardContent>
        <XStack alignItems="center" justifyContent="space-between">
          <XStack alignItems="center" gap="$3">
            {getIcon()}
            <YStack>
              <XStack alignItems="center" gap="$2">
                <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                  {method.name}
                </Text>
                {method.isDefault && (
                  <Badge variant="secondary" size="sm">Default</Badge>
                )}
              </XStack>
              <Text fontSize="$3" color="$silver">
                {method.type === 'card' && method.brand} ****{method.last4}
                {method.expiryDate && ` • Expires ${method.expiryDate}`}
              </Text>
            </YStack>
          </XStack>
          <Pressable style={{ padding: 8 }}>
            <MoreHorizontal size={20} color="#6B7280" />
          </Pressable>
        </XStack>
      </CardContent>
    </Card>
  );
};

const TransactionRow = ({ transaction, index }: { transaction: Transaction; index: number }) => {
  const getStatusColor = (status: Transaction['status']) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'pending': return '#F59E0B';
      case 'failed': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTypeIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'payment': return <CreditCard size={20} color="#EF4444" />;
      case 'deposit': return <TrendingUp size={20} color="#10B981" />;
      case 'refund': return <TrendingUp size={20} color="#10B981" />;
      case 'fee': return <DollarSign size={20} color="#F59E0B" />;
      default: return <CreditCard size={20} color="#6B7280" />;
    }
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 50).duration(400)}>
      <XStack
        alignItems="center"
        paddingVertical="$4"
        paddingHorizontal="$4"
        borderBottomWidth={1}
        borderBottomColor="$titanium"
        hoverStyle={{ backgroundColor: '$backgroundSoft' }}
      >
        <XStack alignItems="center" gap="$3" flex={1}>
          {getTypeIcon(transaction.type)}
          <YStack flex={1}>
            <Text fontSize="$4" fontWeight="500" color="$carbonBlack">
              {transaction.description}
            </Text>
            <XStack alignItems="center" gap="$2">
              <Text fontSize="$3" color="$silver">
                {new Date(transaction.date).toLocaleDateString()}
              </Text>
              <Text color="$silver">•</Text>
              <Text fontSize="$3" color="$silver">
                {transaction.paymentMethod}
              </Text>
            </XStack>
          </YStack>
        </XStack>

        <XStack alignItems="center" gap="$4">
          <Text
            fontSize="$4"
            fontWeight="600"
            color={transaction.amount > 0 ? '$success' : '$carbonBlack'}
          >
            {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
          </Text>
          <Badge
            backgroundColor={getStatusColor(transaction.status)}
            color="$whiteCoat"
            size="sm"
          >
            {transaction.status}
          </Badge>
          {transaction.invoice && (
            <Button variant="ghost" size="sm">
              <Download size={16} color="#6B46E5" />
            </Button>
          )}
        </XStack>
      </XStack>
    </Animated.View>
  );
};

const EscrowItemCard = ({ item, index }: { item: EscrowItem; index: number }) => {
  const getStatusColor = (status: EscrowItem['status']) => {
    switch (status) {
      case 'pending': return '#F59E0B';
      case 'released': return '#10B981';
      case 'disputed': return '#EF4444';
      default: return '#6B7280';
    }
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 100).duration(600)}>
      <Card backgroundColor="$whiteCoat" marginBottom="$3">
        <CardContent padding="$4">
          <XStack alignItems="center" justifyContent="space-between" marginBottom="$3">
            <YStack flex={1}>
              <Text fontSize="$4" fontWeight="600" color="$carbonBlack">
                {item.projectName}
              </Text>
              <Text fontSize="$3" color="$silver">
                {item.vaName} • {item.milestoneTitle}
              </Text>
            </YStack>
            <Badge
              backgroundColor={getStatusColor(item.status)}
              color="$whiteCoat"
              size="sm"
            >
              {item.status}
            </Badge>
          </XStack>

          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center" gap="$2">
              <Calendar size={16} color="#6B7280" />
              <Text fontSize="$3" color="$silver">
                Due: {new Date(item.dueDate).toLocaleDateString()}
              </Text>
            </XStack>
            <Text fontSize="$5" fontWeight="bold" color="$labPurple">
              ${item.amount.toFixed(2)}
            </Text>
          </XStack>

          {item.status === 'pending' && (
            <XStack gap="$2" marginTop="$3">
              <Button variant="outline" size="sm" flex={1}>
                Release Payment
              </Button>
              <Button variant="ghost" size="sm">
                Dispute
              </Button>
            </XStack>
          )}
        </CardContent>
      </Card>
    </Animated.View>
  );
};

export default function BillingScreen() {
  const navigation = useNavigation();
  const { isDesktop } = useResponsive();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'transactions' | 'methods' | 'escrow'>('overview');

  const currentBalance = 3420.50;
  const pendingPayments = 1975.00;
  const monthlySpent = 4250.00;
  const totalEscrow = mockEscrowItems.reduce((sum, item) => sum + item.amount, 0);

  const renderContent = () => {
    switch (selectedTab) {
      case 'overview':
        return (
          <YStack gap="$6">
            {/* Balance Cards */}
            <XStack gap="$4" flexWrap="wrap">
              <Card flex={1} minWidth={200} backgroundColor="$whiteCoat" padding="$5">
                <CardContent>
                  <XStack alignItems="center" gap="$3">
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: '#6B46E5',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <DollarSign size={24} color="#FFFFFF" />
                    </View>
                    <YStack>
                      <Text fontSize="$6" fontWeight="bold" color="$carbonBlack">
                        ${currentBalance.toLocaleString()}
                      </Text>
                      <Text fontSize="$3" color="$silver">Current Balance</Text>
                    </YStack>
                  </XStack>
                </CardContent>
              </Card>

              <Card flex={1} minWidth={200} backgroundColor="$whiteCoat" padding="$5">
                <CardContent>
                  <XStack alignItems="center" gap="$3">
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: '#F59E0B',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Clock size={24} color="#FFFFFF" />
                    </View>
                    <YStack>
                      <Text fontSize="$6" fontWeight="bold" color="$warning">
                        ${pendingPayments.toLocaleString()}
                      </Text>
                      <Text fontSize="$3" color="$silver">Pending Payments</Text>
                    </YStack>
                  </XStack>
                </CardContent>
              </Card>

              <Card flex={1} minWidth={200} backgroundColor="$whiteCoat" padding="$5">
                <CardContent>
                  <XStack alignItems="center" gap="$3">
                    <View
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 24,
                        backgroundColor: '#10F4B1',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <TrendingUp size={24} color="#0A0E1A" />
                    </View>
                    <YStack>
                      <Text fontSize="$6" fontWeight="bold" color="$plasmaGreen">
                        ${monthlySpent.toLocaleString()}
                      </Text>
                      <Text fontSize="$3" color="$silver">This Month</Text>
                    </YStack>
                  </XStack>
                </CardContent>
              </Card>
            </XStack>

            {/* Recent Transactions */}
            <Card backgroundColor="$whiteCoat">
              <CardHeader padding="$5" paddingBottom="$3">
                <XStack alignItems="center" justifyContent="space-between">
                  <CardTitle fontSize="$5" color="$carbonBlack">
                    Recent Transactions
                  </CardTitle>
                  <Button variant="ghost" size="sm">
                    View All
                  </Button>
                </XStack>
              </CardHeader>
              <CardContent padding="$0">
                {mockTransactions.slice(0, 5).map((transaction, index) => (
                  <TransactionRow key={transaction.id} transaction={transaction} index={index} />
                ))}
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card backgroundColor="$whiteCoat">
              <CardHeader padding="$5" paddingBottom="$3">
                <XStack alignItems="center" justifyContent="space-between">
                  <CardTitle fontSize="$5" color="$carbonBlack">
                    Payment Methods
                  </CardTitle>
                  <Button size="sm" backgroundColor="$labPurple">
                    <Plus size={16} color="#FFFFFF" />
                    Add Method
                  </Button>
                </XStack>
              </CardHeader>
              <CardContent padding="$5" paddingTop="$0">
                <YStack gap="$3">
                  {mockPaymentMethods.slice(0, 2).map((method) => (
                    <PaymentMethodCard key={method.id} method={method} />
                  ))}
                </YStack>
              </CardContent>
            </Card>
          </YStack>
        );

      case 'transactions':
        return (
          <Card backgroundColor="$whiteCoat">
            <CardHeader padding="$5">
              <XStack alignItems="center" justifyContent="space-between">
                <CardTitle fontSize="$5" color="$carbonBlack">
                  All Transactions
                </CardTitle>
                <XStack gap="$2">
                  <Button variant="outline" size="sm">
                    <Filter size={16} color="#6B46E5" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download size={16} color="#6B46E5" />
                    Export
                  </Button>
                </XStack>
              </XStack>
            </CardHeader>
            <CardContent padding="$0">
              {mockTransactions.map((transaction, index) => (
                <TransactionRow key={transaction.id} transaction={transaction} index={index} />
              ))}
            </CardContent>
          </Card>
        );

      case 'methods':
        return (
          <YStack gap="$4">
            <XStack alignItems="center" justifyContent="between">
              <H3 fontSize="$5" color="$carbonBlack">Payment Methods</H3>
              <Button size="sm" backgroundColor="$labPurple">
                <Plus size={16} color="#FFFFFF" />
                Add New Method
              </Button>
            </XStack>
            {mockPaymentMethods.map((method) => (
              <PaymentMethodCard key={method.id} method={method} />
            ))}
          </YStack>
        );

      case 'escrow':
        return (
          <YStack gap="$4">
            <XStack alignItems="center" justifyContent="between">
              <YStack>
                <H3 fontSize="$5" color="$carbonBlack">Escrow Payments</H3>
                <Text fontSize="$3" color="$silver">
                  Total in escrow: ${totalEscrow.toFixed(2)}
                </Text>
              </YStack>
            </XStack>
            {mockEscrowItems.map((item, index) => (
              <EscrowItemCard key={item.id} item={item} index={index} />
            ))}
          </YStack>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#F8FAFC' }}>
      <YStack flex={1} paddingBottom="$8">
        {/* Header */}
        <YStack
          backgroundColor="$background"
          paddingHorizontal={isDesktop ? '$8' : '$4'}
          paddingTop="$6"
          paddingBottom="$6"
        >
          <Animated.View entering={FadeIn.duration(600)}>
            <XStack alignItems="center" justifyContent="space-between" marginBottom="$6">
              <YStack>
                <H1 fontSize={isDesktop ? '$8' : '$6'} color="$carbonBlack">
                  Billing & Payments 💳
                </H1>
                <Paragraph fontSize="$4" color="$silver">
                  Manage your payments, billing, and financial transactions
                </Paragraph>
              </YStack>
              <Button
                backgroundColor="$labPurple"
                color="$whiteCoat"
                onPress={() => {/* Handle add funds */}}
              >
                Add Funds
              </Button>
            </XStack>

            {/* Tabs */}
            <XStack gap="$2" marginBottom="$6">
              {([
                { key: 'overview', label: 'Overview' },
                { key: 'transactions', label: 'Transactions' },
                { key: 'methods', label: 'Payment Methods' },
                { key: 'escrow', label: 'Escrow' },
              ] as const).map((tab) => (
                <Pressable
                  key={tab.key}
                  onPress={() => setSelectedTab(tab.key)}
                  style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderRadius: 25,
                    backgroundColor: selectedTab === tab.key ? '#6B46E5' : '#FFFFFF',
                    borderWidth: 1,
                    borderColor: selectedTab === tab.key ? '#6B46E5' : '#E1E8ED',
                  }}
                >
                  <Text
                    fontSize="$3"
                    color={selectedTab === tab.key ? '$whiteCoat' : '$silver'}
                    fontWeight="500"
                  >
                    {tab.label}
                  </Text>
                </Pressable>
              ))}
            </XStack>
          </Animated.View>
        </YStack>

        {/* Content */}
        <YStack paddingHorizontal={isDesktop ? '$8' : '$4'}>
          <Animated.View entering={FadeInDown.delay(200).duration(600)}>
            {renderContent()}
          </Animated.View>
        </YStack>
      </YStack>
    </ScrollView>
  );
}