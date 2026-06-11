import React from 'react';
import { StyleSheet, View, Image, ActivityIndicator, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message }: LoadingScreenProps) {
  return (
    <View style={styles.container}>
      
      <StatusBar style="dark" />

      <View style={styles.loaderWrapper}>
        <ActivityIndicator size="large" color="#1E3A8A" style={styles.spinner} />
        {message ? <Text style={styles.loadingMessageText}>{message}</Text> : null}
      </View>

    </View>
  );
}

// =========================================================================
// 🎨 LOADING LAYOUT STYLESHEET
// =========================================================================
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, 
    backgroundColor: '#CAE7FF',      
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,                     
  },
  
  loaderWrapper: {
    flex: 1,                          
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },

  spinner: {
    marginBottom: 12,
  },

  loadingMessageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E3A8A',
    opacity: 0.8,
  },
});