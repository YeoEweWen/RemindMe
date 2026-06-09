import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

// 1. Define the TypeScript interface for a single pill item
export interface PillItem {
  id: string;
  label: string;
}

// 2. Define the props the ScrollablePills component expects
interface ScrollablePillsProps {
  data: PillItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  containerStyle?: ViewStyle; // Allows custom outer spacing from parent
}

export default function ScrollablePills({ 
  data, 
  selectedId, 
  onSelect, 
  containerStyle 
}: ScrollablePillsProps) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false} 
      contentContainerStyle={[styles.scrollContainer, containerStyle]}
    >
      {data.map((item) => {
        const isSelected = item.id === selectedId;
        
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.7}
            onPress={() => onSelect(item.id)}
            style={[
              styles.pill, 
              isSelected ? styles.pillActive : styles.pillInactive
            ]}
          >
            <Text style={[
              styles.pillText, 
              isSelected ? styles.pillTextActive : styles.pillTextInactive
            ]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    scrollContainer: {
      paddingHorizontal: 5, // Extra padding at start/end of scroll track
      gap: 8,                // Clean spacing between pills
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
    },
    pill: {
      paddingHorizontal: 16,
      paddingVertical: 10,
      borderRadius: 20,
      borderWidth: 1,
    },
    pillInactive: {
      backgroundColor: '#f5eeee', // Light slate gray background
      borderColor: '#E2E8F0',
    },
    pillActive: {
      backgroundColor: '#1E3A8A', // Vibrant theme blue
      borderColor: '#1E3A8A',
    },
    pillText: {
      fontSize: 13,
      fontWeight: '600',
    },
    pillTextInactive: {
      color: '#475569',
    },
    pillTextActive: {
      color: '#fff',
    },
});