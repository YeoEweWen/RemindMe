import FormButton from '@/components/formButton';
import { CategorySelector, FormDatePicker, FormInput, PrioritySelector } from '@/components/taskForm';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '@/components/header';

const getInitialDueDate = () => {
    const timeTracker = new Date();
    timeTracker.setHours(timeTracker.getHours() + 3);
    return timeTracker;
  };

export default function AddTasks() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState<Date>(getInitialDueDate());

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar style="dark" />

      <Header title="Add Task" showBackButton={false}/>

      <FormInput label="Title" value={title} onChangeText={setTitle} placeholder="Enter task name..." />

      <FormInput label="Description" value={description} onChangeText={setDescription} placeholder="Add details..." isMultiline />

      <CategorySelector label="Select Category" selectedValue={category} onSelect={setCategory} />

      <PrioritySelector label="Select Priority" selectedValue={priority} onSelect={setPriority} />

      <FormDatePicker 
        label="Select Due Date & Time" 
        selectedDate={dueDate} 
        onDateChange={setDueDate} 
      />

      <View style={styles.buttonRow}>
        <FormButton 
          title="Clear" 
          variant="danger" 
          style={{ flex: 1 }} 
          onPress={() => console.log('Wipe inputs...')} 
        />
        <FormButton 
          title="Add Task" 
          variant="primary" 
          style={{ flex: 2 }} // Takes up more room intentionally for primary emphasis
          onPress={() => console.log('Submit record...')} 
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "#cae7ff",
    flex: 1, // Cleaner than height: "100%"
    paddingHorizontal: 20
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 12,        // Places a perfect gap between the buttons
    width: '100%',
    marginTop: 20,
  }

});