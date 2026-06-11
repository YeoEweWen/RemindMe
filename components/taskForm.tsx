import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View
} from 'react-native';

// =========================================================================
// 📝 1. FORM INPUT FIELD COMPONENT
// =========================================================================
interface FormInputProps extends TextInputProps {
  label: string;
  isMultiline?: boolean;
}

export function FormInput({
  label,
  value,
  onChangeText,
  placeholder,
  isMultiline = false,
  ...restProps
}: FormInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.textInput, isMultiline ? styles.textInputMulti : styles.textInputSingle]}
        placeholder={placeholder}
        placeholderTextColor="#94A3B8"
        value={value}
        onChangeText={onChangeText}
        multiline={isMultiline}
        textAlignVertical={isMultiline ? "top" : "center"}
        {...restProps}
      />
    </View>
  );
}

// =========================================================================
// 💼 2. CATEGORY SELECTOR COMPONENT (🌟 Order: Personal, Study, Work)
// =========================================================================
interface CategorySelectorProps {
  label: string;
  selectedValue: string;
  onSelect: (id: string) => void;
}

const BUILT_IN_CATEGORIES = [
  { id: 'personal', label: '🏠 Personal' },
  { id: 'study', label: '🎓 Study' },
  { id: 'work', label: '💼 Work' },
];

export function CategorySelector({ label, selectedValue, onSelect }: CategorySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.segmentedTrack}>
        {BUILT_IN_CATEGORIES.map((item, index) => {
          const isSelected = item.id === selectedValue;
          return (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.segmentBtn, isSelected && styles.segmentBtnSelected]}
                onPress={() => onSelect(item.id)}
              >
                <Text style={styles.segmentText}>{item.label}</Text>
              </TouchableOpacity>
              {index < BUILT_IN_CATEGORIES.length - 1 && !isSelected && BUILT_IN_CATEGORIES[index + 1].id !== selectedValue && (
                <View style={styles.innerDivider} />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

// =========================================================================
// 🔴 3. PRIORITY SELECTOR COMPONENT (🌟 Updated: Continuous Track, No Gaps)
// =========================================================================
interface PrioritySelectorProps {
  label: string;
  selectedValue: string;
  onSelect: (id: string) => void;
}

const BUILT_IN_PRIORITIES = [
  { id: 'low', label: 'Low', activeBgColor: '#86EFAC' },     // Soft Mint Green
  { id: 'medium', label: 'Medium', activeBgColor: '#FDE047' },  // Soft Yellow
  { id: 'high', label: 'High', activeBgColor: '#F87171' },    // Soft Red
];

export function PrioritySelector({ label, selectedValue, onSelect }: PrioritySelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.segmentedTrack}>
        {BUILT_IN_PRIORITIES.map((item, index) => {
          const isSelected = item.id === selectedValue;
          return (
            <React.Fragment key={item.id}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[
                  styles.segmentBtn, 
                  isSelected && { backgroundColor: item.activeBgColor, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 }
                ]}
                onPress={() => onSelect(item.id)}
              >
                <Text style={[styles.segmentText, isSelected && { color: '#0F172A', fontWeight: '700' }]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
              {index < BUILT_IN_PRIORITIES.length - 1 && !isSelected && BUILT_IN_PRIORITIES[index + 1].id !== selectedValue && (
                <View style={styles.innerDivider} />
              )}
            </React.Fragment>
          );
        })}
      </View>
    </View>
  );
}

// =========================================================================
// 📅 4. FORM DATE & TIME PICKER COMPONENT
// =========================================================================
interface FormDatePickerProps {
  label: string;
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export function FormDatePicker({ label, selectedDate, onDateChange }: FormDatePickerProps) {
  const [pickerMode, setPickerMode] = useState<'date' | 'time'>('date');
  const [showAndroid, setShowAndroid] = useState(false);

  const getMinimumAllowedDate = () => {
    const minLimit = new Date();
    minLimit.setHours(minLimit.getHours() + 3);
    return minLimit;
  };

  const handlePickerChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowAndroid(false);
    }
    
    if (date) {
      const minLimit = getMinimumAllowedDate();
      if (date < minLimit) {
        onDateChange(minLimit);
      } else {
        onDateChange(date);
      }
    }
  };

  const formatDisplayDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatDisplayTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const openAndroidPicker = (mode: 'date' | 'time') => {
    setPickerMode(mode);
    setShowAndroid(true);
  };

  const minimumLimit = getMinimumAllowedDate();
  const validValue = selectedDate < minimumLimit ? minimumLimit : selectedDate;

  return (
    <View style={styles.container}>
      <Text style={styles.fieldLabel}>{label}</Text>

      {Platform.OS === 'ios' ? (
        <View style={styles.iosDateTimeInlineRow}>
          <View style={[styles.iosPickerBox, { flex: 1.3 }]}>
            <DateTimePicker
              value={validValue}
              mode="date"
              display="default"
              minimumDate={minimumLimit}
              onChange={handlePickerChange}
              accentColor="#1E3A8A"
            />
          </View>
          
          <View style={[styles.iosPickerBox, { flex: 1 }]}>
            <DateTimePicker
              value={validValue}
              mode="time"
              display="default"
              minimumDate={minimumLimit}
              onChange={handlePickerChange}
              accentColor="#1E3A8A"
            />
          </View>
        </View>
      ) : (
        <View style={styles.androidDateTimeSplitRow}>
          <TouchableOpacity 
            activeOpacity={0.7} 
            style={[styles.textInput, styles.textInputSingle, { flex: 1.3 }]} 
            onPress={() => openAndroidPicker('date')}
          >
            <View style={styles.androidDateContent}>
              <Text style={styles.androidDateText}>{formatDisplayDate(validValue)}</Text>
              <Text style={styles.calendarIconText}>📅</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            activeOpacity={0.7} 
            style={[styles.textInput, styles.textInputSingle, { flex: 1 }]} 
            onPress={() => openAndroidPicker('time')}
          >
            <View style={styles.androidDateContent}>
              <Text style={styles.androidDateText}>{formatDisplayTime(validValue)}</Text>
              <Text style={styles.calendarIconText}>🕒</Text>
            </View>
          </TouchableOpacity>

          {showAndroid && (
            <DateTimePicker
              value={validValue}
              mode={pickerMode}
              display="default"
              is24Hour={false}
              minimumDate={minimumLimit}
              onChange={handlePickerChange}
            />
          )}
        </View>
      )}
    </View>
  );
}

// =========================================================================
// 🎨 CENTRAL STYLESHEET
// =========================================================================
const styles = StyleSheet.create({
  container: { 
    marginBottom: 20, 
    width: '100%' 
  },
  fieldLabel: { 
    fontSize: 15, 
    fontWeight: '700', 
    color: '#0F172A', 
    marginBottom: 8 
  },
  textInput: { 
    borderWidth: 2, 
    borderColor: '#4A90E2', 
    borderRadius: 12, 
    paddingHorizontal: 16, // 🌟 Ensures baseline indent padding for ALL inputs
    fontSize: 16, 
    color: '#334155', 
    backgroundColor: '#FFFFFF' 
  },
  textInputSingle: { 
    height: 50,
    justifyContent: 'center',
    // 🌟 REMOVED paddingHorizontal: 0 so it inherits the 16px left margin perfectly!
  },
  textInputMulti: { 
    height: 120, 
    paddingTop: 12, 
    paddingBottom: 12 
    // Automatically inherits paddingHorizontal: 16 from textInput class above
  },
  segmentedTrack: { 
    flexDirection: 'row', 
    backgroundColor: '#E2E8F0', 
    borderRadius: 12, 
    height: 46, 
    padding: 3, 
    alignItems: 'center' 
  },
  segmentBtn: { 
    flex: 1, 
    height: '100%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 9 
  },
  segmentBtnSelected: { 
    backgroundColor: '#FFFFFF', 
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.05, 
    shadowRadius: 2 
  },
  segmentText: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: '#1E293B' 
  },
  innerDivider: { 
    width: 1, 
    height: '45%', 
    backgroundColor: '#CBD5E1' 
  },
  iosDateTimeInlineRow: { 
    flexDirection: 'row', 
    gap: 12, 
    width: '100%' 
  },
  iosPickerBox: { 
    alignItems: 'flex-start', 
    backgroundColor: '#FFFFFF', 
    borderWidth: 2, 
    borderColor: '#4A90E2', 
    borderRadius: 12, 
    paddingHorizontal: 12, 
    height: 50, 
    justifyContent: 'center' 
  },
  androidDateTimeSplitRow: { 
    flexDirection: 'row', 
    gap: 12, 
    width: '100%' 
  },
  androidDateContent: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    height: '100%', 
    paddingHorizontal: 16 
  },
  androidDateText: { 
    fontSize: 15, 
    color: '#334155', 
    fontWeight: '500' 
  },
  calendarIconText: { 
    fontSize: 16 
  },
});