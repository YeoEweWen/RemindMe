import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

// 1. Define strict TypeScript props for the card
interface MetricCardProps {
  title: string;
  count: number | string;
  iconName: keyof typeof Ionicons.glyphMap; // Ensures only valid Ionicons can be passed
  iconColor?: string;
  countColor?: string;
  containerStyle?: ViewStyle;
}

export default function MetricCard({
  title,
  count,
  iconName,
  iconColor = '#1E3A8A', // default theme blue
  countColor = '#0F172A', // default slate dark
  containerStyle,
}: MetricCardProps) {
  return (
    <View style={[styles.card, containerStyle]}>
      {/* Top Header Row: Holds the live count number and its descriptor icon */}
      <View style={styles.cardHeader}>
        <Text style={[styles.metricNumber, { color: countColor }]}>{count}</Text>
        <Ionicons name={iconName} size={28} color={iconColor} />
      </View>
      
      {/* Bottom Descriptor Label */}
      <Text style={styles.metricLabel}>{title.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1, // Standardizes equal layout distribution when placed side-by-side in a row
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    // Clean, micro shadow polish
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  metricLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '700',
    marginTop: 6,
    letterSpacing: 0.3,
  },
});