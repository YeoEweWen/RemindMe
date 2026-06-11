import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Ionicons from '@expo/vector-icons/Ionicons';

interface ErrorScreenProps {
  message?: string;
  onRetry?: () => void; // 🌟 Optional action to let users retry a failed operation
}

export default function ErrorScreen({ 
  message = "Something went wrong. Please try again.", 
  onRetry 
}: ErrorScreenProps) {
  return (
    <View style={styles.container}>
      {/* Keeps status bar matching the clean canvas layout */}
      <StatusBar style="dark" />

      {/* ⚠️ ERROR CENTERED ICON & MESSAGING BLOCK */}
      <View style={styles.errorWrapper}>
        <View style={styles.iconCircle}>
          <Ionicons name="alert-circle" size={54} color="#EF4444" />
        </View>
        
        <Text style={styles.errorTitleText}>Oops!</Text>
        <Text style={styles.errorMessageText}>{message}</Text>
      </View>

      {/* 🔄 OPTIONAL ACTION FOOTER TIER */}
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

// =========================================================================
// 🎨 ERROR LAYOUT STYLESHEET
// =========================================================================
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: '#CAE7FF',       // Retains your exact light blue background canvas
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,                      
    paddingHorizontal: 32,            // Prevents long messages from clipping the edges
  },
  errorWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,                          // Centers content beautifully in the upper 75% region
  },
  iconCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#FEE2E2',       // Soft warning pink tint frame backplate
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  errorTitleText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#0F2C59',                 // Matches your brand deep contrast text color
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
    flex: 1,                          // Places button neatly towards the base row structure
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 40,
  },
  retryButton: {
    backgroundColor: '#1E3A8A',       // Signature Royal Blue Button
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