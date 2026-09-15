import React from 'react';
import { AuthStack } from './AuthStack';
import { MainTabs } from './MainTabs';
import { useAuth } from '../context/AuthContext';

export function RootNavigator() {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return null;
  return isAuthenticated ? <MainTabs /> : <AuthStack />;
}
