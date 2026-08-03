import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radii, spacing } from '../theme';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'light';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  icon?: keyof typeof Ionicons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  fullWidth?: boolean;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  icon,
  loading,
  disabled,
  style,
  fullWidth = true,
}: Props) {
  const isDark = variant === 'primary' || variant === 'secondary' || variant === 'light';
  const textColor =
    variant === 'primary'
      ? '#1A1300'
      : variant === 'secondary'
      ? '#04241A'
      : variant === 'light'
      ? '#0B0B0F'
      : '#FFFFFF';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,
        variant === 'ghost' && styles.ghost,
        variant === 'light' && styles.light,
        fullWidth && styles.fullWidth,
        (disabled || loading) && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isDark ? '#000000' : '#FFFFFF'} />
      ) : (
        <View style={styles.contentRow}>
          <Text style={[styles.label, { color: textColor }]}>{label}</Text>
          {icon ? (
            <Ionicons name={icon} size={18} color={textColor} style={styles.icon} />
          ) : null}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.md,
    paddingVertical: 15,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  primary: {
    backgroundColor: colors.gold,
  },
  secondary: {
    backgroundColor: colors.teal,
  },
  outline: {
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    backgroundColor: 'transparent',
  },
  ghost: {
    backgroundColor: colors.surfaceAlt,
  },
  light: {
    backgroundColor: '#FFFFFF',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  label: {
    fontFamily: fonts.bold,
    fontSize: 16,
  },
  icon: {
    marginTop: 1,
  },
});
