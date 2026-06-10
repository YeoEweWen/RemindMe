import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Header() {
    // State for live clock and dynamic date
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      
      // Live Clock String (e.g., 10:15:30 AM)
      setCurrentTime(
        now.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: true, 
        })
      );

      // Dynamic Date String (e.g., Tuesday, June 9, 2026)
      setCurrentDate(
        now.toLocaleDateString([], {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
        })
      );
    };

    updateTimeAndDate(); 
    const timerId = setInterval(updateTimeAndDate, 1000); // Ticks every 1 second

    return () => clearInterval(timerId); // Memory cleanup
    }, []);

    // Dynamic theme
    const currentHour = new Date().getHours();

    // 1. Initialize variables with your baseline Morning values
    let greeting = "Good Morning";
    let greetingIcon: "sunny" | "moon" = "sunny";
    let gradientColors: readonly [string, string, ...string[]] = ['#FEF3C7', '#FDE68A']; // Default: Morning Gold
    let textColor = '#78350F';
    let subTextColor = '#92400E';

    // 2. Run sequential time-of-day checks
    if (currentHour >= 5 && currentHour < 12) {
        // 🌅 Morning (5:00 AM - 11:59 AM)
        // Uses the baseline default values initialized above
    } 
    else if (currentHour >= 12 && currentHour < 17) {
        // ☀️ Afternoon (12:00 PM - 4:59 PM)
        greeting = "Good Afternoon";
        greetingIcon = "sunny";
        gradientColors = ['#FEF9C3', '#FEF08A']; // 🌟 Soft Sun Yellow (Yellow 100 to Yellow 200)
        textColor = '#713F12';                  // Deep Yellow-Brown for high contrast
        subTextColor = '#854D0E';
    } 
    else if (currentHour >= 17 && currentHour < 21) {
        // 🌆 Evening (5:00 PM - 8:59 PM)
        greeting = "Good Evening";
        greetingIcon = "sunny";
        gradientColors = ['#FFEDD5', '#FED7AA']; // Sunset Orange
        textColor = '#7C2D12';
        subTextColor = '#9A3412';
    } 
    else {
        // 🌌 Night (9:00 PM - 4:59 AM)
        // Catches late night (21, 22, 23) and early morning hours (0, 1, 2, 3, 4) smoothly
        greeting = "Good Night";
        greetingIcon = "moon";
        gradientColors = ['#1E1B4B', '#312E81']; // Night Indigo
        textColor = '#F8FAFC';
        subTextColor = '#CBD5E1';
    }

    return (
        <LinearGradient colors={gradientColors} style={styles.headerBanner}>
          {/* Left Column: Text Data */}
          <View style={styles.leftColumn}>
              <Text style={[styles.greetingText, { color: textColor }]}>
                  {greeting}
              </Text>
              <Text style={[styles.timeText, { color: subTextColor }]}>
                  {currentTime}
              </Text>
              <Text style={[styles.dateText, { color: subTextColor }]}>
                  {currentDate}
              </Text>
          </View>

          {/* Right Column: Dynamic Large Icon */}
          <View style={styles.rightColumn}>
              <Ionicons 
              name={greetingIcon} 
              size={80} 
              color={currentHour >= 18 || currentHour < 5 ? '#FCD34D' : '#F59E0B'} 
              style={styles.backgroundImage}
              />
          </View>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
  headerBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 20,
    marginTop: 10,
    overflow: 'hidden', // Keeps the large icon clipped inside the border radii
  },

  leftColumn: {
    flex: 1,
    justifyContent: 'center',
  },

  greetingText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },

  timeText: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 8
  },

  dateText: {
    fontSize: 18,
    fontWeight: '500',
  },

  rightColumn: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  backgroundImage: {
    opacity: 0.85,
  },
});