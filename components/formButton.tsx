import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

interface FormButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'success'; 
  style?: ViewStyle; 
}

export default function FormButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  style 
}: FormButtonProps) {
  
  const getButtonStyles = (): ViewStyle => {
    switch (variant) {
      case 'secondary':
        return styles.btnSecondary;
      case 'danger':
        return styles.btnDanger;
      case 'success': 
        return styles.btnSuccess;
      case 'primary':
      default:
        return styles.btnPrimary;
    }
  };

  const getTextStyles = (): TextStyle => {
    switch (variant) {
      case 'secondary':
        return styles.textSecondary;
      case 'primary':
      case 'danger':
      case 'success':
      default:
        return styles.textWhite;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.baseButton, getButtonStyles(), style]}
      onPress={onPress}
    >
      <Text style={[styles.baseText, getTextStyles()]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
    minWidth: 100,
  },

  baseText: {
    fontSize: 16,
    fontWeight: '700',
  },

  btnPrimary: {
    backgroundColor: '#5aec25', 
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  btnSecondary: {
    backgroundColor: '#E2E8F0', 
    borderWidth: 1,
    borderColor: '#CBD5E1',
  },

  btnDanger: {
    backgroundColor: '#EF4444', 
    shadowColor: '#EF4444',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },

  btnSuccess: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  textWhite: {
    color: '#FFFFFF',
  },

  textSecondary: {
    color: '#475569', 
  },
});