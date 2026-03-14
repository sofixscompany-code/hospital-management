<<<<<<< HEAD
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import patchUrlProtocol from "./utils/urlProtocolPatch";

import { AuthProvider } from "./context/AuthContext";
import RootNavigator from "./navigation/RootNavigator";
import { theme } from "./styles/globalStyles";

patchUrlProtocol(); // fixes deep linking issues

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AuthProvider>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <RootNavigator />
              <StatusBar style="auto" />
            </NavigationContainer>
          </PaperProvider>
        </AuthProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
=======

import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './navigation/RootNavigator';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
>>>>>>> ad4022e44602687d7281cc64d15c232c9df781b1
