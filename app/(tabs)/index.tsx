import { Stack } from 'expo-router';
import {
  StyleSheet,
  Text,
} from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={{marginTop: 50}}>Home</Text>
    </>
   
  );
}

const styles = StyleSheet.create({
  
});
