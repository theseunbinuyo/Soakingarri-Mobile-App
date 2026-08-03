import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Sparkle = { top: string; left: string; size: number; opacity: number };

const SPARKLES: Sparkle[] = [
  { top: '6%', left: '10%', size: 10, opacity: 0.35 },
  { top: '14%', left: '82%', size: 14, opacity: 0.25 },
  { top: '22%', left: '30%', size: 8, opacity: 0.3 },
  { top: '33%', left: '68%', size: 10, opacity: 0.2 },
  { top: '48%', left: '14%', size: 12, opacity: 0.25 },
  { top: '58%', left: '88%', size: 8, opacity: 0.3 },
  { top: '70%', left: '40%', size: 10, opacity: 0.2 },
  { top: '82%', left: '76%', size: 12, opacity: 0.25 },
  { top: '90%', left: '20%', size: 8, opacity: 0.3 },
];

export function SparkleField() {
  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {SPARKLES.map((s, i) => (
        <Text
          key={i}
          style={[
            styles.sparkle,
            {
              top: s.top as any,
              left: s.left as any,
              fontSize: s.size,
              opacity: s.opacity,
            },
          ]}
        >
          ✦
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  sparkle: {
    position: 'absolute',
    color: '#FFFFFF',
  },
});
