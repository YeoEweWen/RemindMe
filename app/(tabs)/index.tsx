import ErrorScreen from "@/components/error-screen";
import Header from '@/components/home/header';
import MetricCard from '@/components/home/metric-card';
import LoadingScreen from "@/components/loader";
import ScrollablePills, { PillItem } from '@/components/scrollable-pills';
import TaskCard, { TaskItem } from '@/components/task-card';
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES: PillItem[] = [
  { id: 'all', label: '📊 All'},
  { id: 'personal', label: '🏠 Personal'},
  { id: 'study', label: '🎓 Study'},
  { id: 'work', label: '💼 Work'},
];

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

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [taskCategory, setTaskCategory] = useState('all');
  const [tasks, setTasks] = useState<TaskItem[]>(MOCK_TASKS);

  // Fetch the tasks list
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setRefreshing(true);
      setError("");

      const URL = "https://6a204e32e96c1d13b58750a7.mockapi.io/api/remind-me/tasks";

      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error("Failed to fetch the tasks.");
      }

      const data = await response.json();

      //setPosts(data);
      console.log(data);
    } 
    catch (err: any) {
      setError(err.message);
    } 
    finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Run once when component loads
  useEffect(() => {
    fetchTasks();
  }, []);

  // Run when the screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  // Loading Screen
  if (loading) {
    return (
      <LoadingScreen message="Syncing the tasks..."/>
    );
  }

  // Error Screen
  if (error) {
    return (
      <ErrorScreen message="Failed to fetch the tasks." onRetry={() => {console.log("Retry")}}/>
    );
  }

  const handleViewDetails = (id: string) => {
    console.log(`Maps to Details Screen for Task ID: ${id}`);
    router.push({
      pathname: '/task-details',
      params: { id: id } // 🌟 Sent over to the form page
    });
  };

  const handleToggleComplete = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  
  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar style="dark" />

      <Header/>

      <View style={styles.metricsRow}>
        <MetricCard 
          title="Completed" 
          count={10} 
          iconName="checkmark-circle" 
          iconColor="#019262" 
          countColor="#019262" 
        />
        <MetricCard 
          title="Pending" 
          count={12} 
          iconName="time" 
          iconColor="#c9ab04" 
          countColor="#c9ab04" 
        />
        <MetricCard 
          title="Urgent" 
          count={2} 
          iconName="alert-circle" 
          iconColor="#EF4444" 
          countColor="#EF4444" 
        />
      </View>

      <Text style={styles.title}>Today's Focus 🎯</Text>

      <ScrollablePills 
        data={CATEGORIES}
        selectedId={taskCategory}
        onSelect={(id) => {
          setTaskCategory(id);
          console.log(`Pressed ID: ${id}`)
        }}
        containerStyle={{ marginVertical: 10 }} 
      />

      {/* 🌟 Fixed the duplicate style bug here */}
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

  metricsRow: {
    marginTop: 15,
    flexDirection: 'row',
    gap: 10,
  },

  title: {
    marginTop: 15,
    marginLeft: 10,
    fontSize: 28,
    fontWeight: 'bold',
  },

  taskListScrollView: {
    flex: 1,
  },

  tasksListContent: {
    paddingBottom: 50,
  }
});