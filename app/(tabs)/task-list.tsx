import { useState, useCallback, useMemo } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";

import Header from "@/components/header";
import TaskCard, { TaskItem } from "@/components/taskCard";

import LoadingScreen from "@/components/loader";
import ErrorScreen from "@/components/errorScreen";
import SearchBar from "@/components/searchBar";
import DropdownFilterBar from "@/components/dropdownFilterBar";

const getFutureTime = (hoursAhead: number) => {
  const d = new Date();
  d.setHours(d.getHours() + hoursAhead);
  return d;
};

export default function TaskList() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

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

  const [tasks, setTasks] = useState<TaskItem[]>([]);

  // Fetch tasks
    const fetchTasks = async () => {
      try {
        setLoading(true);
        setRefreshing(true);
        setError("");
  
        const URL = `https://6a204e32e96c1d13b58750a7.mockapi.io/api/remind-me/tasks`;
  
        const response = await fetch(URL);
  
        if (!response.ok) {
          if (response.status === 404) {
            setTasks([]);
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
        if ("all" === "all") return true;
        return t.category === "all";
      });
    }, [tasks, "all"]);
  
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

      <Header title="All Tasks" showBackButton={false}/>

      <SearchBar 
        value={searchQuery} 
        onChangeText={(text) => setSearchQuery(text)} 
      />

      <DropdownFilterBar groups={filterGroups} />
      
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
    flex: 1, // Cleaner than height: "100%"
    paddingHorizontal: 20
  },

  taskListScrollView: {
    flex: 1,
  },

  tasksListContent: {
    paddingBottom: 90,
  }

});