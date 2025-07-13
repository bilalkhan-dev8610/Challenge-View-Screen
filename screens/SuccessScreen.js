// SuccessScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SuccessScreen = () => (
  <View style={styles.container}>
    <Text style={styles.text}>🎉 Submission Pending Review by Moderator 🎉</Text>
  </View>
);

export default SuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 20,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    color: '#2e7d32',
    fontWeight: 'bold',
  },
});
