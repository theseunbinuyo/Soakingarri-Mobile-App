import React from 'react';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';
import { useAuth } from '../context/AuthContext';

export function RootNavigator() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <MainTabs /> : <AuthStack />;
}
