import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamList } from './types';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignupScreen } from '../screens/auth/SignupScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { useSettings } from '../context/SettingsContext';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  const { reduceMotion } = useSettings();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: reduceMotion ? 'none' : 'default' }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
