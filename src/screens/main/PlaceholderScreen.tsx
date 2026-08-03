import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ScreenBackground } from '../../components';
import { colors, fonts, spacing } from '../../theme';

type Props = {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export function PlaceholderScreen({ title, subtitle, icon }: Props) {
  return (
    <ScreenBackground>
      <View style={styles.center}>
        <View style={styles.iconBadge}>
          <Ionicons name={icon} size={26} color={colors.gold} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
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
});
