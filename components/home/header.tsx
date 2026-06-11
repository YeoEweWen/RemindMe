import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function Header() {
  // State for live clock and dynamic date
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const updateTimeAndDate = () => {
      const now = new Date();
      
      // Live Clock String (e.g., 10:15 AM)
      setCurrentTime(
        now.toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit', 
          hour12: true, 
        })
      );

      // Dynamic Date String (e.g., Thursday, June 11)
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

  // Dynamic theme selector
  const currentHour = new Date().getHours();

  // 1. Initialize variables with fallback values
  let greeting = "Good Morning";
  let greetingIcon: "sunny" | "moon" = "sunny";
  let textColor = '#ffffff';
  let subTextColor = '#ffffff';
  
  // 🌟 Point paths directly to your local assets folder folder
  let backgroundImageSource = require('@/assets/images/morning.jpg'); 

  // 2. Evaluate time-of-day slots
  if (currentHour >= 5 && currentHour < 12) {
    // 🌅 Morning (5:00 AM - 11:59 AM)
    backgroundImageSource = require('@/assets/images/morning.jpg');
  } 
  else if (currentHour >= 12 && currentHour < 17) {
    // ☀️ Afternoon (12:00 PM - 4:59 PM)
    greeting = "Good Afternoon";
  }
  else if (currentHour >= 17 && currentHour < 21) {
    // 🌆 Evening (5:00 PM - 8:59 PM)
    greeting = "Good Evening";
  } 
  else {
    // 🌌 Night (9:00 PM - 4:59 AM)
    greeting = "Good Night";
    greetingIcon = "moon";
    backgroundImageSource = require('@/assets/images/night.jpg'); // 🌟 Switch asset to night.jpg
  }

  return (
    // 🌟 FIXED: Swapped LinearGradient out for ImageBackground
    <ImageBackground 
      source={backgroundImageSource} 
      style={styles.headerBanner}
      resizeMode="cover"
    >
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
          color={'#f6e828'} 
          style={styles.iconStyle}
        />
      </View>
    </ImageBackground>
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
    overflow: 'hidden', // Forces the background images to respect the border radius container bounds
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
  iconStyle: {
    opacity: 0.85,
  },
});