import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';

export type PriorityLevel = 'high' | 'medium' | 'low';

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
  containerStyle?: ViewStyle;
}

export default function TaskCard({
  task,
  onPressDetails,
  containerStyle
}: TaskCardProps) {
  
  const getPriorityColor = (level: PriorityLevel) => {
    switch (level) {
      case 'high': return '#EF4444';   
      case 'medium': return '#F59E0B'; 
      case 'low': return '#3B82F6';
    }
  };

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
      onPress={() => onPressDetails(task.id)}
      style={[styles.card, { borderLeftColor: borderColor }, containerStyle]}
    >
      <View style={styles.mainRow}>
        
        <View style={styles.checkboxContainer}>
          <Ionicons 
            name={task.isCompleted ? "checkmark-circle" : "ellipse-outline"} 
            size={22} 
            color={task.isCompleted ? "#10B981" : "#94A3B8"} 
          />
        </View>

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
          
          <Text style={styles.timeText}>
            {getHoursLeftString(task.dueAt)}
          </Text>
        </View>

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