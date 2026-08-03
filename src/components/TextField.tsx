import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { colors, fonts, radii, spacing } from '../theme';

type Props = TextInputProps & {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  secure?: boolean;
  rightLabel?: string;
  onRightLabelPress?: () => void;
  error?: string;
};

export function TextField({
  label,
  icon,
  secure,
  rightLabel,
  onRightLabelPress,
  error,
  style,
  ...rest
}: Props) {
  const [reveal, setReveal] = useState(false);

  return (
    <View style={styles.wrap}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {rightLabel ? (
          <Pressable onPress={onRightLabelPress} hitSlop={8}>
            <Text style={styles.rightLabel}>{rightLabel}</Text>
          </Pressable>
        ) : null}
      </View>
      <View style={[styles.inputRow, error && styles.inputRowError]}>
        {icon ? (
          <Ionicons name={icon} size={18} color={colors.textMuted} style={styles.leftIcon} />
        ) : null}
        <TextInput
          placeholderTextColor={colors.textFaint}
          secureTextEntry={secure && !reveal}
          style={[styles.input, style]}
          {...rest}
        />
        {secure ? (
          <Pressable onPress={() => setReveal((v) => !v)} hitSlop={8}>
            <Ionicons
              name={reveal ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color={colors.textMuted}
            />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginBottom: spacing.md,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    color: colors.text,
    fontFamily: fonts.medium,
    fontSize: 14,
  },
  rightLabel: {
    color: colors.teal,
    fontFamily: fonts.medium,
    fontSize: 13,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.md,
    height: 52,
    gap: spacing.sm,
  },
  inputRowError: {
    borderColor: colors.danger,
  },
  leftIcon: {
    marginRight: 2,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 15,
  },
  error: {
    color: colors.danger,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: spacing.xs,
  },
});
