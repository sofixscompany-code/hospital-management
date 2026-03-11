
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoyaltyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Loyalty Program</Text>
      <Text>You have earned 10 points!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default LoyaltyScreen;
