import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

interface MetricCardProps {
  title: string;
  count: number | string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  countColor?: string;
  containerStyle?: ViewStyle;
}

export default function MetricCard({
  title,
  count,
  iconName,
  iconColor = '#1E3A8A',
  countColor = '#0F172A',
  containerStyle,
}: MetricCardProps) {
  return (
    <View style={[styles.card, containerStyle]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.metricNumber, { color: countColor }]}>{count}</Text>
        <Ionicons name={iconName} size={28} color={iconColor} />
      </View>
      
      <Text style={styles.metricLabel}>{title.toUpperCase()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1, 
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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