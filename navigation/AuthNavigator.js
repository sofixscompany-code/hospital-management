<<<<<<< HEAD
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import SplashScreen from "../screens/auth/SplashScreen";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}
=======

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegistrationScreen from '../screens/auth/RegistrationScreen';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
>>>>>>> ad4022e44602687d7281cc64d15c232c9df781b1
