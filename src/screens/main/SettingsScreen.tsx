import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenBackground, Button } from '../../components';
import { colors, fonts, spacing } from '../../theme';
import { useAuth } from '../../context/AuthContext';

export function SettingsScreen() {
  const { signOut } = useAuth();

  return (
    <ScreenBackground>
      <View style={styles.center}>
        <View style={styles.iconBadge}>
          <Ionicons name="settings-outline" size={26} color={colors.gold} />
        </View>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>
          Privacy, AI preferences, accessibility, and notifications will live
          here.
        </Text>
      </View>
      <View style={styles.logoutWrap}>
        <Button label="Log Out" variant="outline" onPress={signOut} />
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  iconBadge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 13,
    textAlign: 'center',
  },
  logoutWrap: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
    bottom: spacing.xl,
  },
});
