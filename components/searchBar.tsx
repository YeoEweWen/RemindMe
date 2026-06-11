import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  onClear?: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  onSubmit, 
  onClear, 
  placeholder = "Search tasks..." 
}: SearchBarProps) {
  
  const handleClear = () => {
    onChangeText(''); 
    if (onClear) {
      onClear(); 
    }
  };

  return (
    <View style={styles.searchContainer}>
      <Ionicons name="search" size={18} color="#64748B" style={styles.searchIcon} />
      
      <TextInput
        style={styles.inputField}
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit} 
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search" 
        clearButtonMode="never" 
      />

      {value.length > 0 && (
        <TouchableOpacity 
          onPress={handleClear} 
          activeOpacity={0.6}
          style={styles.clearButton}
        >
          <Ionicons name="close-circle" size={18} color="#94A3B8" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9', 
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 46,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOpacity: 0.02,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },

  searchIcon: {
    marginRight: 8,
  },

  inputField: {
    flex: 1,
    fontSize: 15,
    color: '#0F172A',
    fontWeight: '500',
    height: '100%',
    paddingVertical: 0, 
  },

  clearButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});