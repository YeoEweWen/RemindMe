import FormButton from '@/components/form-button';
import Header from '@/components/header';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export type PriorityLevel = 'High' | 'Medium' | 'Low';
export type TaskStatus = 'overdue' | 'pending' | 'completed'; // 🌟 Added Status Type

const getInitialDueDate = () => {
  const timeTracker = new Date();
  timeTracker.setHours(timeTracker.getHours() + 3);
  return timeTracker;
};

// =========================================================================
// 📦 FIXED CARD DATA FROM THE IMAGE
// =========================================================================
const FIXED_TASK_DATA = {
  title: "Complete React Native Lab",
  category: "💼 Work",
  status: "overdue" as TaskStatus, // 🌟 Added dynamic status string ('overdue', 'pending', or 'completed')
  priorityLabel: "High Priority",
  description: "Submit finalized code files via the student portal. Include the README and project structure documentation. Double-check all components for PascalCase naming. Ensure the ActivityIndicator is implemented for loading states.",
  dueDateStr: "Monday, June 8, 2026, 5:00 PM (Today)",
  createdAtStr: "Friday, June 5, 2026, 5:00 PM"
};

export default function TaskDetails() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  console.log(`Open ${id}`);

  // 🎨 Helper to resolve dynamic status badge styling based on value
  const getStatusDetails = () => {
    switch (FIXED_TASK_DATA.status) {
      case 'completed':
        return { label: 'Completed', bgColor: '#DCFCE7', textColor: '#16A34A' }; // Soft Green
      case 'pending':
        return { label: 'Pending', bgColor: '#FEF3C7', textColor: '#D97706' };   // Soft Amber
      case 'overdue':
      default:
        return { label: 'Overdue', bgColor: '#FEE2E2', textColor: '#DC2626' };   // Soft Red
    }
  };

  const statusDetails = getStatusDetails();

  return (
    <SafeAreaView style={styles.rootContainer}>
      <StatusBar style="dark" />

      <Header title="Task Details" showBackButton={true}/>

      {/* 🌟 SCALABLE TASK DATA OVERVIEW CONTAINER CARD */}
      <View style={styles.cardContainer}>
        
        {/* 🔴 Priority Tag Badge Row */}
        <View style={styles.badgeRow}>
          <View style={styles.priorityBadge}>
            <Text style={styles.priorityText}>
              {FIXED_TASK_DATA.priorityLabel}
            </Text>
          </View>
        </View>

        {/* 📝 Title Text Header */}
        <Text style={styles.cardTitle}>{FIXED_TASK_DATA.title}</Text>

        {/* 💼 🌟 Category & Status Inline Badge Row */}
        <View style={styles.categoryBadgeRow}>
          {/* Category Badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{FIXED_TASK_DATA.category}</Text>
          </View>

          {/* Status Badge */}
          <View style={[styles.statusBadge, { backgroundColor: statusDetails.bgColor }]}>
            <Text style={[styles.statusText, { color: statusDetails.textColor }]}>
              {statusDetails.label}
            </Text>
          </View>
        </View>

        {/* 📄 Description Text Block */}
        <View style={styles.sectionBlock}>
          <Text style={styles.bodyLabel}>Description:</Text>
          <Text style={[styles.bodyContentText, {textAlign: 'justify'}]}>{FIXED_TASK_DATA.description}</Text>
        </View>

        {/* 📅 Due Date Display Row */}
        <View style={styles.sectionBlock}>
          <Text style={styles.bodyLabel}>Due Date:</Text>
          <View style={styles.inlineDateRow}>
            <Ionicons name="time-outline" size={18} color="#64748B" style={styles.clockIcon} />
            <Text style={styles.bodyContentText}>{FIXED_TASK_DATA.dueDateStr}</Text>
          </View>
        </View>

        {/* 🗓️ Creation Metadata Timestamp Footer */}
        <Text style={styles.footerTimestampText}>Created: {FIXED_TASK_DATA.createdAtStr}.</Text>

      </View>

      {/* Action Buttons Footer block elements */}
      <View style={styles.footerActionWrapper}>
        <FormButton 
          title="Mark As Completed" 
          variant="success" 
          style={{ marginBottom: 10 }}
          onPress={() => console.log('Mark as Completed...')} 
        />
        <View style={styles.buttonRow}>
          <FormButton 
            title="Edit" 
            variant="primary" 
            style={{ flex: 1 }}
            onPress={() => console.log('Update...')} 
          />
          <FormButton 
            title="Delete" 
            variant="danger" 
            style={{ flex: 1 }}
            onPress={() => console.log('Delete...')} 
          />
        </View>
      </View>

    </SafeAreaView>
  );
}

// =========================================================================
// 🎨 SCREEN STYLESHEET
// =========================================================================
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
    borderLeftColor: '#DC2626', 
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
    backgroundColor: '#FEE2E2', 
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4444',
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
    gap: 8, // 🌟 Generates clean padding between adjacent badges
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
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
    marginTop: 4,
  },
  footerActionWrapper: {
    flex: 1,
    justifyContent: 'flex-end', 
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,        
    width: '100%',
    marginBottom: 10,
  }
});