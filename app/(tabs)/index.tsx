import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import GreetingCard from '@/components/greeting-card';
import ScrollablePills, { PillItem } from '@/components/scrollablePills';

const CATEGORIES: PillItem[] = [
  { id: 'all', label: '📊 All'},
  { id: 'personal', label: '🏠 Personal'},
  { id: 'study', label: '🎓 Study'},
  { id: 'work', label: '💼 Work'},
];

export default function Home() {
  // Setup state tracking to know which filter is currently active
  const [taskCategory, setTaskCategory] = useState('all');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <Stack.Screen options={{ headerShown: false }} />

      <GreetingCard></GreetingCard>

      <ScrollablePills 
        data={CATEGORIES}
        selectedId={taskCategory}
        onSelect={(id) => {
          setTaskCategory(id);
          console.log(`Pressed ID: ${id}`) // Replace with function for change the list 
        }}
        containerStyle={{ marginVertical: 16 }} // Adds quick outer spacing
      />



    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#cae7ff",
    height: "100%",
    paddingHorizontal: 15
  },
});
