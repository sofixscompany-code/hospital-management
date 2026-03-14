import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import DashboardScreen from "../screens/DashboardScreen";
import MenuScreen from "../screens/customer/MenuScreen";
import OrdersScreen from "../screens/customer/OrderTrackingScreen";
import ProfileScreen from "../screens/customer/ProfileScreen";
import { colors } from "../styles/colors";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          backgroundColor: "#fff",
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          position: "absolute",
          elevation: 10,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Dashboard") {
            iconName = focused ? "view-dashboard" : "view-dashboard-outline";
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === "Orders") {
            iconName = focused ? "clipboard-text" : "clipboard-text-outline";
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === "Menu") {
            iconName = focused ? "silverware-fork-knife" : "silverware-fork-knife";
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          } else if (route.name === "Profile") {
            iconName = focused ? "account-circle" : "account-circle-outline";
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Menu" component={MenuScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}