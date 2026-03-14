<<<<<<< HEAD
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { colors, globalStyles } from "../../styles/globalStyles";

export default function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[globalStyles.container, styles.splashContainer]}>
      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Smart Hospitality</Text>
      <Text style={styles.subtitle}>Your dining experience redefined</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    opacity: 0.8,
  },
});
=======

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
>>>>>>> ad4022e44602687d7281cc64d15c232c9df781b1
