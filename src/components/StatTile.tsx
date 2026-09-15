import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './Card';
import { colors, fonts, spacing } from '../theme';

type Props = {
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
};

export function StatTile({ label, value, delta, deltaPositive }: Props) {
  return (
    <Card style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      {delta ? (
        <View style={styles.deltaRow}>
          <Ionicons
            name={deltaPositive ? 'trending-up' : 'trending-down'}
            size={12}
            color={deltaPositive ? colors.teal : colors.danger}
          />
          <Text style={[styles.delta, { color: deltaPositive ? colors.teal : colors.danger }]}>
            {delta}
          </Text>
        </View>
      ) : null}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: spacing.md,
  },
  value: {
    color: colors.text,
    fontFamily: fonts.extraBold,
    fontSize: 22,
    marginBottom: spacing.xs,
  },
  label: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 12,
  },
  deltaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.sm,
  },
  delta: {
    fontFamily: fonts.medium,
    fontSize: 11,
  },
});
