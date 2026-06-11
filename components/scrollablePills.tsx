import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

export interface PillItem {
  id: string;
  label: string;
}

interface ScrollablePillsProps {
  data: PillItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  containerStyle?: ViewStyle;
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
      style={{flexGrow: 0}}
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
      paddingHorizontal: 5,
      gap: 8,                
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
      backgroundColor: '#f5eeee', 
      borderColor: '#E2E8F0',
    },

    pillActive: {
      backgroundColor: '#1E3A8A', 
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