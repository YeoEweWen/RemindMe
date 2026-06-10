import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  placeholder = "Search tasks..." 
}: SearchBarProps) {
  
  const handleClear = () => {
    onChangeText('');
  };

  return (
    <View style={styles.searchContainer}>
      {/* Search Lens Icon */}
      <Ionicons name="search" size={18} color="#64748B" style={styles.searchIcon} />
      
      {/* Input Field */}
      <TextInput
        style={styles.inputField}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        clearButtonMode="never" // Hidden natively so we can use our custom styled cross icon
      />

      {/* 🌟 Dynamic Clear Button: Only shows up when text is actively present */}
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
    backgroundColor: '#F1F5F9', // Clean light gray pill background matching the screenshot
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
    paddingVertical: 0, // Eliminates Android default text padding issues
  },
  clearButton: {
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});