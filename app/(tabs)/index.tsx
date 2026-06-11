import ErrorScreen from "@/components/errorScreen";
import Header from '@/components/home/header';
import MetricCard from '@/components/home/metricCard';
import LoadingScreen from "@/components/loader";
import ScrollablePills, { PillItem } from '@/components/scrollablePills';
import TaskCard, { TaskItem } from '@/components/taskCard';
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useCallback, useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES: PillItem[] = [
  { id: 'all', label: '📊 All'},
  { id: 'personal', label: '🏠 Personal'},
  { id: 'study', label: '🎓 Study'},
  { id: 'work', label: '💼 Work'},
];

export default function Home() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [metricValues, setMetricValues] = useState({completed: 0, pending: 0, urgent: 0})
  const [taskCategory, setTaskCategory] = useState('all');
  const [tasks, setTasks] = useState<TaskItem[]>([]);

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setRefreshing(true);
      setError("");

      const today = new Intl.DateTimeFormat("en-CA", {
        timeZone: "Asia/Kuala_Lumpur",
      }).format(new Date());

      const URL = `https://6a204e32e96c1d13b58750a7.mockapi.io/api/remind-me/tasks?dueAt=${today}`;

      const response = await fetch(URL);

      if (!response.ok) {
        if (response.status === 404) {
          setTasks([]);
          setMetricValues({ completed: 0, pending: 0, urgent: 0 });
          return;
        }
        throw new Error("Request failed");
      }

      const data: TaskItem[] = await response.json();

      const priorityOrder = {
        high: 3,
        medium: 2,
        low: 1,
      };

      data.sort((a, b) => {
        // 1. isCompleted (incomplete first)
        const completedDiff = Number(a.isCompleted) - Number(b.isCompleted);
        if (completedDiff !== 0) return completedDiff;

        // 2. due date
        const aTime = a.dueAt
          ? new Date(a.dueAt).getTime()
          : Number.MAX_SAFE_INTEGER;

        const bTime = b.dueAt
          ? new Date(b.dueAt).getTime()
          : Number.MAX_SAFE_INTEGER;

        const dueDiff = aTime - bTime;
        if (dueDiff !== 0) return dueDiff;

        // 3. priority
        return (
          priorityOrder[b.priority ?? "low"] -
          priorityOrder[a.priority ?? "low"]
        );
      });

      setTasks(data);

      setMetricValues({
        completed: data.filter(t => t.isCompleted).length,
        pending: data.filter(t => !t.isCompleted).length,
        urgent: data.filter(t => t.priority === 'high').length,
      });

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      if (taskCategory === "all") return true;
      return t.category === taskCategory;
    });
  }, [tasks, taskCategory]);

  if (loading) {
    return <LoadingScreen message="Syncing the tasks..." />;
  }

  if (error) {
    return (
      <ErrorScreen
        message="Failed to fetch the tasks."
        onRetry={fetchTasks}
      />
    );
  }

  const handleViewDetails = (id: string) => {
    router.push({
      pathname: '/task-details',
      params: { id }
    });
  };

  const handleToggleComplete = (id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar style="dark" />

      <Header />

      <View style={styles.metricsRow}>
        <MetricCard title="Completed" count={metricValues.completed} iconName="checkmark-circle" iconColor="#019262" countColor="#019262" />
        <MetricCard title="Pending" count={metricValues.pending} iconName="time" iconColor="#c9ab04" countColor="#c9ab04" />
        <MetricCard title="Urgent" count={metricValues.urgent} iconName="alert-circle" iconColor="#EF4444" countColor="#EF4444" />
      </View>

      <Text style={styles.title}>Today's Focus 🎯</Text>

      <ScrollablePills
        data={CATEGORIES}
        selectedId={taskCategory}
        onSelect={setTaskCategory}
        containerStyle={{ marginVertical: 10 }}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPressDetails={handleViewDetails}
            onPressToggleComplete={handleToggleComplete}
          />
        )}
        style={styles.taskListScrollView}
        contentContainerStyle={styles.tasksListContent}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={fetchTasks}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No tasks found 🎉
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "#cae7ff",
    flex: 1,
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
    paddingBottom: 90,
  }
});