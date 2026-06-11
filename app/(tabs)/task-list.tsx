import DropdownFilterBar from "@/components/dropdownFilterBar";
import ErrorScreen from "@/components/errorScreen";
import Header from "@/components/header";
import LoadingScreen from "@/components/loader";
import SearchBar from "@/components/searchBar";
import TaskCard, { TaskItem } from "@/components/taskCard";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useMemo, useState } from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TaskList() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState('');

  const [category, setCategory] = useState('all');
  const [priority, setPriority] = useState('all');
  const [status, setStatus] = useState('all');

  // Configuration for Filters
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

  const [tasks, setTasks] = useState<TaskItem[]>([]);

  // Fetch Tasks
  const fetchTasks = async (queryOverride?: string) => {
    try {
      setLoading(true);
      setRefreshing(true);
      setError("");

      const activeSearchQuery = queryOverride !== undefined ? queryOverride : searchQuery;

      const URL = `https://6a204e32e96c1d13b58750a7.mockapi.io/api/remind-me/tasks?search=${activeSearchQuery}`;

      const response = await fetch(URL);

      if (!response.ok) {
        if (response.status === 404) {
          // No task found.
          setTasks([]);
          return;
        }
        throw new Error("Request failed");
      }

      const data: TaskItem[] = await response.json();

      const priorityOrder: { [key: string]: number } = {
        high: 3,
        medium: 2,
        low: 1,
      };

      data.sort((a, b) => {
        // Prioritize the incomplete task first. 
        const completedDiff = Number(a.isCompleted) - Number(b.isCompleted);
        if (completedDiff !== 0) return completedDiff;

        // Sort by the nearest due date.
        const aTime = a.dueAt ? new Date(a.dueAt).getTime() : Number.MAX_SAFE_INTEGER;
        const bTime = b.dueAt ? new Date(b.dueAt).getTime() : Number.MAX_SAFE_INTEGER;

        const dueDiff = aTime - bTime;
        if (dueDiff !== 0) return dueDiff;

        // Sort by priority
        const aPriority = (a.priority ?? "low").toLowerCase();
        const bPriority = (b.priority ?? "low").toLowerCase();

        return priorityOrder[bPriority] - priorityOrder[aPriority];
      });

      setTasks(data);

    } 
    catch (err: any) {
      setError(err.message);
    } 
    finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  // Dynamic filter processing matrix monitoring dropdown items change events
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // Category Filter
      const matchesCategory = category === 'all' || task.category?.toLowerCase() === category.toLowerCase();

      // Priority Filter
      const matchesPriority = priority === 'all' || task.priority?.toLowerCase() === priority.toLowerCase();

      // Status Filter
      let matchesStatus = true;
      if (status !== 'all') {
        const now = new Date();
        const isOverdue = task.dueAt && new Date(task.dueAt) < now && !task.isCompleted;

        if (status === 'completed') {
          matchesStatus = !!task.isCompleted;
        } else if (status === 'overdue') {
          matchesStatus = !!isOverdue;
        } else if (status === 'pending') {
          matchesStatus = !task.isCompleted && !isOverdue;
        }
      }

      return matchesCategory && matchesPriority && matchesStatus;
    });
  }, [tasks, category, priority, status]);

  if (loading) {
    return <LoadingScreen message="Syncing the tasks..." />;
  }

  if (error) {
    return (
      <ErrorScreen
        message="Failed to fetch the tasks."
        onRetry={() => fetchTasks()}
      />
    );
  }

  const handleViewDetails = (id: string) => {
    router.push({
      pathname: '/task-details',
      params: { id }
    });
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar style="dark" />

      <Header title="All Tasks" showBackButton={false}/>

      <SearchBar 
        value={searchQuery} 
        onChangeText={(text) => setSearchQuery(text)} 
        onSubmit={() => fetchTasks()} 
        onClear={() => {
          setSearchQuery(''); 
          fetchTasks(''); 
        }}
      />

      <DropdownFilterBar groups={filterGroups} />
      
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPressDetails={handleViewDetails}
          />
        )}
        style={styles.taskListScrollView}
        contentContainerStyle={styles.tasksListContent}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={() => fetchTasks()}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            No tasks found.
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
  
  taskListScrollView: {
    flex: 1,
  },

  tasksListContent: {
    paddingBottom: 90,
  }
});