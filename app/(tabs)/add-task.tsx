import FormButton from '@/components/formButton';
import { CategorySelector, FormDatePicker, FormInput, PrioritySelector } from '@/components/taskForm';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '@/components/header';

const getInitialDueDate = () => {
  const timeTracker = new Date();
  timeTracker.setHours(timeTracker.getHours() + 3);
  return timeTracker;
};

export default function AddTasks() {
  // Form Field States
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState<Date>(getInitialDueDate());

  // Loading State for Network Requests
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to reset the form inputs back to defaults
  const handleClearForm = () => {
    setTitle('');
    setDescription('');
    setCategory('personal');
    setPriority('low');
    setDueDate(getInitialDueDate());
  };

  // Core function to push record data to your MockAPI endpoint
  const handleAddTask = async () => {
    // Validation Matrix: Enforce both Title and Description
    if (!title.trim() && !description.trim()) {
      Alert.alert("Missing Information", "Please enter both a task title and description.");
      return;
    }
    
    if (!title.trim()) {
      Alert.alert("Required Field", "Please enter a task title before submitting.");
      return;
    }

    if (!description.trim()) {
      Alert.alert("Required Field", "Please enter a description for your task.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Format Payload to match the data schema structure your app expects
      const taskPayload = {
        title: title.trim(),
        description: description.trim(),
        category: category,
        priority: priority,
        dueAt: dueDate.toISOString(), 
        isCompleted: false,           
      };

      // Fire Post Network Request Matrix 
      const URL = `https://6a204e32e96c1d13b58750a7.mockapi.io/api/remind-me/tasks`;
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskPayload),
      });

      if (!response.ok) {
        throw new Error("Failed to write task item record to database.");
      }

      // 🌟 Success UI Handling Matrix: Clears form fields but stays on page
      Alert.alert("Success 🎉", "Task added successfully!", [
        {
          text: "OK",
          onPress: () => {
            handleClearForm(); // Form resets instantly here, ready for the next entry
          }
        }
      ]);

    } catch (error: any) {
      Alert.alert("Error", error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar style="dark" />

      <Header title="Add Task" showBackButton={false} />

      <FormInput 
        label="Title *" 
        value={title} 
        onChangeText={setTitle} 
        placeholder="Enter task name..." 
        editable={!isSubmitting} 
      />

      <FormInput 
        label="Description *" 
        value={description} 
        onChangeText={setDescription} 
        placeholder="Add details..." 
        isMultiline 
        editable={!isSubmitting}
      />

      <CategorySelector label="Select Category" selectedValue={category} onSelect={setCategory} />

      <PrioritySelector label="Select Priority" selectedValue={priority} onSelect={setPriority} />

      <FormDatePicker 
        label="Select Due Date & Time" 
        selectedDate={dueDate} 
        onDateChange={setDueDate} 
      />

      {isSubmitting ? (
        <ActivityIndicator size="large" color="#0F172A" style={styles.spinnerSpacing} />
      ) : (
        <View style={styles.buttonRow}>
          <FormButton 
            title="Clear" 
            variant="danger" 
            style={{ flex: 1 }} 
            onPress={handleClearForm} 
          />
          <FormButton 
            title="Add Task" 
            variant="primary" 
            style={{ flex: 2 }} 
            onPress={handleAddTask} 
          />
        </View>
      )}

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "#cae7ff",
    flex: 1, 
    paddingHorizontal: 20
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,        
    width: '100%',
    marginTop: 20,
  },
  spinnerSpacing: {
    marginTop: 26,
  }
});