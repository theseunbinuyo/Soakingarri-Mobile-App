import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';
import { SparkleField } from './SparkleField';

type Props = ViewProps & {
  children: React.ReactNode;
  glow?: boolean;
};

export function ScreenBackground({ children, glow = true, style, ...rest }: Props) {
  return (
    <View style={[styles.root, style]} {...rest}>
      {glow ? (
        <LinearGradient
          colors={['rgba(245,166,35,0.14)', 'rgba(27,201,142,0.05)', 'rgba(0,0,0,0)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.6 }}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      <SparkleField />
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
});
