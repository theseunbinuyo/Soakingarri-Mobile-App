import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fonts } from '../theme';

type Props = {
  size?: number;
  showWordmark?: boolean;
};

export function SoakingarriLogo({ size = 32, showWordmark = true }: Props) {
  return (
    <View style={styles.row}>
      <LinearGradient
        colors={['#F5C453', colors.gold, '#8A5A12']}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.8, y: 1 }}
        style={[
          styles.badge,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        <View
          style={[
            styles.badgeInner,
            {
              width: size * 0.42,
              height: size * 0.42,
              borderRadius: (size * 0.42) / 2,
            },
          ]}
        />
      </LinearGradient>
      {showWordmark ? (
        <Text style={[styles.wordmark, { fontSize: size * 0.5 }]}>
          SOAKINGARRI AI
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeInner: {
    backgroundColor: '#000000',
  },
  wordmark: {
    color: colors.gold,
    fontFamily: fonts.extraBold,
    letterSpacing: 0.5,
  },
});
