import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radii, spacing } from '../theme';

type Props = {
  checked: boolean;
  onToggle: () => void;
  label: string;
};

export function Checkbox({ checked, onToggle, label }: Props) {
  return (
    <Pressable style={styles.row} onPress={onToggle} hitSlop={6}>
      <View style={[styles.box, checked && styles.boxChecked]}>
        {checked ? <Ionicons name="checkmark" size={14} color="#04241A" /> : null}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: radii.sm - 2,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxChecked: {
    backgroundColor: colors.teal,
    borderColor: colors.teal,
  },
  label: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
});
