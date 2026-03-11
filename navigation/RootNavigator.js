
import React from 'react';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { useAuth } from '../context/AuthContext';

const RootNavigator = () => {
  const { user } = useAuth();
  return user ? <AppNavigator /> : <AuthNavigator />;
};

export default RootNavigator;
