import ErrorScreen from '@/components/errorScreen';
import FormButton from '@/components/formButton';
import Header from '@/components/header';
import LoadingScreen from '@/components/loader';
import { TaskItem } from '@/components/taskCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type PriorityLevel = 'High' | 'Medium' | 'Low';
export type TaskStatus = 'overdue' | 'pending' | 'completed';

export default function TaskDetails() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();

  const [task, setTask] = useState<TaskItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false); 
  const [error, setError] = useState("");

  const BASE_URL = `https://6a204e32e96c1d13b58750a7.mockapi.io/api/remind-me/tasks`;

  // Fetch task details
  const fetchTaskDetails = async () => {
    if (!id) {
      // Not a valid ID
      setError("No Task ID was provided.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await fetch(`${BASE_URL}/${id}`);
      
      if (!response.ok) {
        throw new Error("Unable to locate task details.");
      }

      const data: TaskItem = await response.json();
      setTask(data);
    } 
    catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaskDetails();
  }, [id]);

  // Update status from incomplete to completed (Mark As Completed)
  const handleMarkAsCompleted = async () => {
    if (!task) return;
    try {
      setUpdating(true);
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: true }),
      });

      if (!response.ok) throw new Error("Could not modify record status.");

      Alert.alert("Task Updated! 🎉", "This item has been flagged completed.", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } 
    catch (err: any) {
      Alert.alert("Update Failure", err.message);
    } 
    finally {
      setUpdating(false);
    }
  };

  // Update status from completed to incompleted (Mark As Incomplete)
  const handleMarkAsIncomplete = async () => {
    if (!task) return;

    try {
      setUpdating(true);
      const response = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isCompleted: false }), // Resetting to false
      });

      if (!response.ok) throw new Error("Could not modify record status.");

      Alert.alert("Task Reopened! ↩️", "This item has been marked as incomplete.", [
        { text: "OK", onPress: () => router.back() }
      ]);
    } 
    catch (err: any) {
      Alert.alert("Update Failure", err.message);
    } 
    finally {
      setUpdating(false);
    }
  };

  // Delete Task
  const handleDeleteTask = () => {
    Alert.alert(
      "Confirm Deletion",
      "Are you absolutely sure you want to drop this task card?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              setUpdating(true);
              const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
              if (!response.ok) throw new Error("Could not eliminate item.");

              Alert.alert("Destroyed", "Task record removed successfully.", [
                { text: "OK", onPress: () => router.back() }
              ]);
            } 
            catch (err: any) {
              Alert.alert("Action Interrupted", err.message);
            } 
            finally {
              setUpdating(false);
            }
          }
        }
      ]
    );
  };

  // Get the status badge based on completion and due date
  const getComputedStatusDetails = () => {
    if (!task) return { label: 'Pending', bgColor: '#FEF3C7', textColor: '#D97706', borderLeftColor: '#E2E8F0' };
    
    if (task.isCompleted) {
      return { label: 'Completed', bgColor: '#DCFCE7', textColor: '#16A34A', borderLeftColor: '#16A34A' };
    }

    const now = new Date();
    const isOverdue = task.dueAt && new Date(task.dueAt) < now;
    if (isOverdue) {
      return { label: 'Overdue', bgColor: '#FEE2E2', textColor: '#DC2626', borderLeftColor: '#DC2626' };
    }

    return { label: 'Pending', bgColor: '#FEF3C7', textColor: '#D97706', borderLeftColor: '#F59E0B' };
  };

  // Date format
  const formatDateTimeString = (dateInput?: string) => {
    if (!dateInput) return "No time specified";
    return new Date(dateInput).toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading || updating) return <LoadingScreen message={updating ? "Updating records..." : "Gathering details..."} />;
  if (error || !task) return <ErrorScreen message={error || "Task not found."} onRetry={fetchTaskDetails} />;

  const statusDetails = getComputedStatusDetails();

  const getCategoryEmoji = (category?: string) => {
    switch (category?.toLowerCase()) {
      case 'work': return '💼 Work';
      case 'study': return '🎓 Study';
      case 'personal': return '🏠 Personal';
      default: return `📋 ${category || 'General'}`;
    }
  };

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar style="dark" />

      <Header title="Task Details" showBackButton={true}/>

      <View style={[styles.cardContainer, { borderLeftColor: statusDetails.borderLeftColor }]}>
        
        <View style={styles.badgeRow}>
          <View style={[styles.priorityBadge, { backgroundColor: task.priority?.toLowerCase() === 'high' ? '#FEE2E2' : '#E0F2FE' }]}>
            <Text style={[styles.priorityText, { color: task.priority?.toLowerCase() === 'high' ? '#EF4444' : '#0284C7' }]}>
              {task.priority ? `${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority` : 'Low Priority'}
            </Text>
          </View>
        </View>

        <Text style={styles.cardTitle}>{task.title}</Text>

        <View style={styles.categoryBadgeRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{getCategoryEmoji(task.category)}</Text>
          </View>

          <View style={[styles.statusBadge, { backgroundColor: statusDetails.bgColor }]}>
            <Text style={[styles.statusText, { color: statusDetails.textColor }]}>
              {statusDetails.label}
            </Text>
          </View>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.bodyLabel}>Description:</Text>
          <Text style={[styles.bodyContentText, { textAlign: 'justify' }]}>
            {task.description || "No description provided for this task."}
          </Text>
        </View>

        <View style={styles.sectionBlock}>
          <Text style={styles.bodyLabel}>Due Date:</Text>
          <View style={styles.inlineDateRow}>
            <Ionicons name="time-outline" size={18} color="#64748B" style={styles.clockIcon} />
            <Text style={styles.bodyContentText}>{formatDateTimeString(task.dueAt)}</Text>
          </View>
        </View>

        <Text style={styles.footerTimestampText}>Created at system epoch: {formatDateTimeString(task.createdAt)}</Text>

      </View>

      <View style={styles.footerActionWrapper}>
        
        {task.isCompleted ? (
          <FormButton 
            title="Mark As Incomplete" 
            variant="primary"
            style={{ marginBottom: 10 }}
            onPress={handleMarkAsIncomplete} 
          />
        ) : (
          <FormButton 
            title="Mark As Completed" 
            variant="success" 
            style={{ marginBottom: 10 }}
            onPress={handleMarkAsCompleted} 
          />
        )}
        
        <FormButton 
          title="Delete" 
          variant="danger" 
          style={{ marginBottom: 10 }}
          onPress={handleDeleteTask} 
        />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: "#cae7ff",
    flex: 1, 
    paddingHorizontal: 20
  },

  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderLeftWidth: 6, 
    padding: 16,
    width: '100%',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    marginTop: 12,
  },

  badgeRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },

  priorityText: {
    fontSize: 14,
    fontWeight: '700',
  },

  cardTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#000000',
    lineHeight: 28,
    marginBottom: 10,
  },

  categoryBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8, 
  },

  categoryBadge: {
    backgroundColor: '#E2E8F0', 
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },

  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },

  statusText: {
    fontSize: 14,
    fontWeight: '700',
  },

  sectionBlock: {
    marginBottom: 12,
  },

  bodyLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },

  bodyContentText: {
    fontSize: 15,
    color: '#334155',
    lineHeight: 21,
  },

  inlineDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },

  clockIcon: {
    marginRight: 6,
  },

  footerTimestampText: {
    fontSize: 13,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 4,
  },

  footerActionWrapper: {
    flex: 1,
    justifyContent: 'flex-end', 
    marginBottom: 12,
  }
});