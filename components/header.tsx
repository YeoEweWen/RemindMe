import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

interface HeaderProps {
  title: string;
  showBackButton?: boolean; 
}

export default function Header({ 
  title, 
  showBackButton = true 
}: HeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.headerContainer}>
    
      {showBackButton ? (
        <TouchableOpacity 
          activeOpacity={0.7} 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <Ionicons name="chevron-back" size={24} color="#1E3A8A" />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} /> 
      )}

      
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>

      <View style={styles.spacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    marginHorizontal: -20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1E3A8A',
    borderBottomWidth: 1,
    borderColor: '#1E3A8A',
    marginBottom: 20,
  },

  backButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffff',
    textAlign: 'center',
    flex: 1,
    marginHorizontal: 8,
    marginVertical: 2,
  },

  spacer: {
    width: 40, 
  },
});