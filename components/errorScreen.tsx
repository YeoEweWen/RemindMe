import Ionicons from '@expo/vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ErrorScreenProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorScreen({ 
  message = "Something went wrong. Please try again.", 
  onRetry 
}: ErrorScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.errorWrapper}>
        <View style={styles.iconCircle}>
          <Ionicons name="alert-circle" size={54} color="#EF4444" />
        </View>
        
        <Text style={styles.errorTitleText}>Oops!</Text>
        <Text style={styles.errorMessageText}>{message}</Text>
      </View>

      {onRetry ? (
        <View style={styles.footerWrapper}>
          <TouchableOpacity 
            activeOpacity={0.8} 
            style={styles.retryButton} 
            onPress={onRetry}
          >
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : null}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: '#CAE7FF',       
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,                      
    paddingHorizontal: 32,            
  },
  
  errorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,                         
  },

  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FEE2E2',       
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  errorTitleText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F2C59',                 
    marginBottom: 8,
  },

  errorMessageText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#475569',
    textAlign: 'center',
    lineHeight: 22,
  },

  footerWrapper: {
    flex: 1,                          
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 40,
  },

  retryButton: {
    backgroundColor: '#1E3A8A',       
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },

  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});