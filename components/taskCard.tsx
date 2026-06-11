import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

// 1. Define valid priority levels
export type PriorityLevel = 'high' | 'medium' | 'low';

// 2. Define strict TypeScript props for a single task item
export interface TaskItem {
  id: string;
  title: string;
  description: string;
  dueAt: string;
  createdAt: string;
  priority: PriorityLevel;
  isCompleted: boolean;
  category: string;
}

interface TaskCardProps {
  task: TaskItem;
  onPressDetails: (id: string) => void;
  // 🌟 Removed onPressToggleComplete prop since it's no longer interactive
  containerStyle?: ViewStyle;
}

export default function TaskCard({
  task,
  onPressDetails,
  containerStyle
}: TaskCardProps) {
  
  // 3. Helper function to map priority to theme colors
  const getPriorityColor = (level: PriorityLevel) => {
    switch (level) {
      case 'high': return '#EF4444';   // Vibrant Red
      case 'medium': return '#F59E0B'; // Warm Orange
      case 'low': return '#3B82F6';    // Theme Blue
    }
  };

  // 4. Helper function to compute "hours left" dynamically
  const getHoursLeftString = (dueDate: string) => {
    const now = new Date();
    const due = new Date(dueDate);
    const differenceInMs = due.getTime() - now.getTime();
    const hoursLeft = Math.ceil(differenceInMs / (1000 * 60 * 60));

    if (hoursLeft <= 0) return '⚠️ Overdue';
    if (hoursLeft === 1) return '⏳ 1 hour left';
    return `⏳ ${hoursLeft} hours left`;
  };

  const borderColor = getPriorityColor(task.priority);

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={() => onPressDetails(task.id)} // Pressing anywhere on the card still opens details
      style={[styles.card, { borderLeftColor: borderColor }, containerStyle]}
    >
      <View style={styles.mainRow}>
        
        {/* 🌟 FIXED: Swapped TouchableOpacity with a static View to make it completely unclickable */}
        <View style={styles.checkboxContainer}>
          <Ionicons 
            name={task.isCompleted ? "checkmark-circle" : "ellipse-outline"} 
            size={22} 
            color={task.isCompleted ? "#10B981" : "#94A3B8"} 
          />
        </View>

        {/* Center Content: Title & Text Block */}
        <View style={styles.contentBlock}>
          <Text 
            style={[styles.taskTitle, task.isCompleted && styles.textCompleted]} 
            numberOfLines={1} 
          >
            {task.title}
          </Text>
          
          <Text 
            style={styles.taskDescription} 
            numberOfLines={2} 
          >
            {task.description}
          </Text>
          
          {/* Due Time Display Track */}
          <Text style={styles.timeText}>
            {getHoursLeftString(task.dueAt)}
          </Text>
        </View>

        {/* Right Side: Visual Priority Badge */}
        <View style={[styles.priorityBadge, { backgroundColor: `${borderColor}15` }]}>
          <Text style={[styles.priorityText, { color: borderColor }]}>
            {task.priority}
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 5, 
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 1,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  checkboxContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  contentBlock: {
    flex: 1, 
    paddingRight: 8,
  },
  taskTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  textCompleted: {
    textDecorationLine: 'line-through',
    color: '#94A3B8',
  },
  taskDescription: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 3,
    lineHeight: 18,
  },
  timeText: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '600',
    marginTop: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '700',
  },
});