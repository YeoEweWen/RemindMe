import SearchBar from '@/components/search-bar';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropdownFilterBar from '@/components/dropdown-filter-bar';
import TaskCard, { TaskItem } from '@/components/task-card';

import Header from '@/components/header';

const getFutureTime = (hoursAhead: number) => {
  const d = new Date();
  d.setHours(d.getHours() + hoursAhead);
  return d;
};

const MOCK_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: 'React Native Lab Build',
    description: 'Refactor the core navigation stack files, isolate component architecture modules, and clear the typescript layout errors.',
    dueTime: getFutureTime(3),
    priority: 'High',
    isCompleted: false,
  },
  {
    id: 'task-2',
    title: 'Review System Database Sync Logs',
    description: 'Check table keys for consistency across server endpoints.',
    dueTime: getFutureTime(6),
    priority: 'Medium',
    isCompleted: false,
  },
  {
    id: 'task-3',
    title: 'Update Typography Stylesheet',
    description: 'Clean up styling files.',
    dueTime: getFutureTime(9),
    priority: 'Low',
    isCompleted: true,
  },

  {
    id: 'task-4',
    title: 'React Native Lab Build',
    description: 'Refactor the core navigation stack files, isolate component architecture modules, and clear the typescript layout errors.',
    dueTime: getFutureTime(3),
    priority: 'High',
    isCompleted: false,
  },
  {
    id: 'task-5',
    title: 'Review System Database Sync Logs',
    description: 'Check table keys for consistency across server endpoints.',
    dueTime: getFutureTime(6),
    priority: 'Medium',
    isCompleted: false,
  },
  {
    id: 'task-6',
    title: 'Update Typography Stylesheet',
    description: 'Clean up styling files.',
    dueTime: getFutureTime(9),
    priority: 'Low',
    isCompleted: true,
  },
];

export default function TaskList() {
  const [searchQuery, setSearchQuery] = useState('');

  const [category, setCategory] = useState('all');
  const [priority, setPriority] = useState('all');
  const [status, setStatus] = useState('all');

  // Define options matching your mock exactly
  const filterGroups = [
    {
      key: 'category',
      title: 'Category',
      currentValue: category,
      onSelect: setCategory,
      options: [
        { id: 'all', label: 'All' },
        { id: 'personal', label: '🏠 Personal' },
        { id: 'study', label: '🎓 Study' },
        { id: 'work', label: '💼 Work' },
      ],
    },
    {
      key: 'priority',
      title: 'Priority',
      currentValue: priority,
      onSelect: setPriority,
      options: [
        { id: 'all', label: 'All' },
        { id: 'High', label: 'High', color: '#EF4444' },
        { id: 'Medium', label: 'Medium', color: '#F59E0B' },
        { id: 'Low', label: 'Low', color: '#3B82F6' },
      ],
    },
    {
      key: 'status',
      title: 'Status',
      currentValue: status,
      onSelect: setStatus,
      options: [
        { id: 'all', label: 'All' },
        { id: 'overdue', label: 'Overdue', color: '#EF4444' },
        { id: 'pending', label: 'Pending', color: '#F59E0B' },
        { id: 'completed', label: 'Completed', color: '#0ef740' },
      ],
    },
  ];

  const [tasks, setTasks] = useState<TaskItem[]>(MOCK_TASKS);

  const handleViewDetails = (id: string) => {
    console.log(`Maps to Details Screen for Task ID: ${id}`);
  };

  const handleToggleComplete = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar style="dark" />

      <Header title="All Tasks" showBackButton={false}/>

      <SearchBar 
        value={searchQuery} 
        onChangeText={(text) => setSearchQuery(text)} 
      />

      <DropdownFilterBar groups={filterGroups} />
      
      <ScrollView 
        style={styles.taskListScrollView} 
        contentContainerStyle={styles.tasksListContent}
        showsVerticalScrollIndicator={false}
      >
        {tasks.map((item) => (
          <TaskCard 
            key={item.id}
            task={item}
            onPressDetails={handleViewDetails}
            onPressToggleComplete={handleToggleComplete}
          />
        ))}
      </ScrollView>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "#cae7ff",
    flex: 1, // Cleaner than height: "100%"
    paddingHorizontal: 20
  },

  taskListScrollView: {
    flex: 1,
  },

  tasksListContent: {
    paddingBottom: 50,
  }

});