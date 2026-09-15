import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts, radii, spacing } from '../theme';

type Props = {
  label: string;
  used: number;
  limit: number;
  /** Flag near-full as approaching a cap (a bad thing). Off for progress-toward-a-goal meters. */
  warnNearLimit?: boolean;
};

export function Meter({ label, used, limit, warnNearLimit = false }: Props) {
  const pct = Math.min(1, limit > 0 ? used / limit : 0);
  const fillColor = warnNearLimit && pct >= 0.9 ? colors.danger : colors.gold;

  return (
    <View>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>
          {used} / {limit}
        </Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${pct * 100}%`, backgroundColor: fillColor }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  label: {
    color: colors.textMuted,
    fontFamily: fonts.medium,
    fontSize: 13,
  },
  value: {
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: 13,
  },
  track: {
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: colors.goldMuted,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radii.pill,
  },
});
