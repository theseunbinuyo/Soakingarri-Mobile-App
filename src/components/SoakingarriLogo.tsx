import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

type Props = {
  size?: number;
  showWordmark?: boolean;
};

export function SoakingarriLogo({ size = 32, showWordmark = true }: Props) {
  return (
    <View style={styles.row}>
      <Image
        source={require('../../assets/logo.png')}
        style={{ width: size, height: size }}
        resizeMode="contain"
      />
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
  wordmark: {
    color: colors.gold,
    fontFamily: fonts.extraBold,
    letterSpacing: 0.5,
  },
});
