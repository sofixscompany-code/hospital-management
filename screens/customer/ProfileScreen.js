
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Button title="Logout" onPress={logout} />
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
  email: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default ProfileScreen;
