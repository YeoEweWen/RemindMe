import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface FilterOption {
  id: string;
  label: string;
  icon?: string;
  color?: string;
}

interface FilterGroup {
  key: string;
  title: string;
  currentValue: string;
  options: FilterOption[];
  onSelect: (optionId: string) => void;
}

interface DropdownFilterBarProps {
  groups: FilterGroup[];
}

export default function DropdownFilterBar({ groups }: DropdownFilterBarProps) {
  const [activeGroup, setActiveGroup] = useState<FilterGroup | null>(null);

  return (
    <View style={styles.mainWrapper}>
      <View style={styles.barContainer}>
        {groups.map((group, index) => {
          const currentOption = group.options.find(o => o.id === group.currentValue);

          return (
            <React.Fragment key={group.key}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setActiveGroup(group)}
                style={styles.filterSegment}
              >
                <Text style={styles.segmentTitle}>{group.title}</Text>
                <View style={styles.valueRow}>
                  {currentOption?.color && (
                    <View style={[styles.statusDot, { backgroundColor: currentOption.color }]} />
                  )}
                  <Text style={styles.segmentValue} numberOfLines={1}>
                    {currentOption ? currentOption.label : 'All'}
                  </Text>
                  <Ionicons name="chevron-down" size={14} color="#64748B" style={styles.chevron} />
                </View>
              </TouchableOpacity>

              {index < groups.length - 1 && <View style={styles.verticalDivider} />}
            </React.Fragment>
          );
        })}
      </View>

      <Modal
        visible={activeGroup !== null}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setActiveGroup(null)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setActiveGroup(null)}>
          <View style={styles.sheetContainer}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Filter by {activeGroup?.title}</Text>
              <TouchableOpacity onPress={() => setActiveGroup(null)}>
                <Ionicons name="close-circle" size={24} color="#CBD5E1" />
              </TouchableOpacity>
            </View>

            {activeGroup && (
              <FlatList
                data={activeGroup.options}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const isSelected = item.id === activeGroup.currentValue;
                  return (
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={[styles.optionRow, isSelected && styles.optionRowSelected]}
                      onPress={() => {
                        activeGroup.onSelect(item.id);
                        setActiveGroup(null);
                      }}
                    >
                      <View style={styles.optionLeftBlock}>
                        {item.color && (
                          <View style={[styles.statusDot, { backgroundColor: item.color, marginRight: 10 }]} />
                        )}
                        <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                          {item.label}
                        </Text>
                      </View>
                      {isSelected && <Ionicons name="checkmark-circle" size={20} color="#1E3A8A" />}
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: {
    marginVertical: 12,
  },
  
  barContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    height: 58,
  },

  filterSegment: {
    flex: 1,
    paddingHorizontal: 12,
    justifyContent: 'center',
  },

  verticalDivider: {
    width: 1,
    height: '60%',
    backgroundColor: '#E2E8F0',
  },

  segmentTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94A3B8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },

  valueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },

  segmentValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    flex: 1,
  },

  chevron: {
    marginLeft: 4,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.3)', 
    justifyContent: 'flex-end',
  },

  sheetContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 34,
    maxHeight: '50%',
  },

  sheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },

  sheetTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },

  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#F8FAFC',
  },

  optionRowSelected: {
    backgroundColor: '#F0F5FF',
  },

  optionLeftBlock: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  optionLabel: {
    fontSize: 15,
    color: '#334155',
    fontWeight: '500',
  },

  optionLabelSelected: {
    color: '#1E3A8A',
    fontWeight: '700',
  },
});