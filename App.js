import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import AppNavigation from './src/navigation/appNavigation';
import 'react-native-reanimated';

export default function App() {
  return (
   <AppNavigation />
  );
}
