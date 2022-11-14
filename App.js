import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  Animated,
  Dimensions,
  Image,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text> Welcome to Ligma p2</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
