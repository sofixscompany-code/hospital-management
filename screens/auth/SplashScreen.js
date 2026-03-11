
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    if (user === undefined) {
      // Still checking for user, show splash screen
      return;
    }
    if (user) {
      navigation.navigate('Root', { screen: 'Home' });
    } else {
      navigation.navigate('Login');
    }
  }, [user, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Smart Hospitality</Text>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SplashScreen;
