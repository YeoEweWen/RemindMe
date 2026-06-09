import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* ADD */}
      <Tabs.Screen
        name="add_tasks"
        options={{
          title: 'Add Task',
          tabBarItemStyle: {
            marginRight: -20, // Negative margin on the right pulls the boundary away from the center
            marginLeft: 20,   // Positive margin on the left pushes the whole item right
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons name={focused ? "add-circle" : "add-circle-outline"} size={28} color={focused ? '#1E3A8A' : '#666'} />
              <Text style={[styles.label, focused && styles.labelActive]}>Add</Text>
            </View>
          ),
        }}
      />

      {/* HOME (CENTER BIG BUTTON) */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.centerWrapper}>
              <View style={[styles.centerButton, focused && styles.centerActive]}>
                <Ionicons name="home" size={30} color='#fff'/>
                <Text style={styles.centerLabel}>Home</Text>
              </View>
            </View>
          ),
        }}
      />

      {/* LIST */}
      <Tabs.Screen
        name="tasks_list"
        
        options={{
          title: 'List',
          tabBarItemStyle: {
            marginRight: 20, // Negative margin on the right pulls the boundary away from the center
            marginLeft: -20,   // Positive margin on the left pushes the whole item right
          },
          tabBarIcon: ({ focused }) => (
            <View style={styles.tabItem}>
              <Ionicons name="list" size={28} color={focused ? '#1E3A8A' : '#666'} />
              <Text style={[styles.label, focused && styles.labelActive]}>List</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 70,
    paddingTop: 10,
    position: 'absolute',
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },

  label: {
    fontSize: 12,
    marginTop: 2,
    color: '#666',
  },

  labelActive: {
    color: '#1E3A8A',
    fontWeight: 'bold',
  },

  centerWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  centerButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#666',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  centerActive: {
    backgroundColor: '#1E3A8A',
  },

  centerLabel: {
    fontSize: 12,
    marginTop: 2,
    color: '#fff',
    fontWeight: '600',
  },
});