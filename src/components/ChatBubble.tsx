import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChatMessage } from '../data/chat';
import { useSettings } from '../context/SettingsContext';
import { colors, fonts, radii, spacing } from '../theme';

type Props = {
  message: ChatMessage;
};

export function ChatBubble({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <View style={[styles.row, isUser && styles.rowUser]}>
      {!isUser ? (
        <View style={styles.avatar}>
          <Ionicons name="sparkles-outline" size={14} color={colors.gold} />
        </View>
      ) : null}
      <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAssistant]}>
        <Text style={styles.text}>{message.text}</Text>
      </View>
    </View>
  );
}

export function TypingBubble() {
  return (
    <View style={styles.row}>
      <View style={styles.avatar}>
        <Ionicons name="sparkles-outline" size={14} color={colors.gold} />
      </View>
      <View style={[styles.bubble, styles.bubbleAssistant, styles.typingBubble]}>
        <TypingDot delay={0} />
        <TypingDot delay={150} />
        <TypingDot delay={300} />
      </View>
    </View>
  );
}

function TypingDot({ delay }: { delay: number }) {
  const { reduceMotion } = useSettings();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    if (reduceMotion) {
      opacity.setValue(0.6);
      return;
    }
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 400,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 400,
          useNativeDriver: true,
        }),
      ]),
    );
    anim.start();
    return () => anim.stop();
  }, [delay, opacity, reduceMotion]);

  return <Animated.View style={[styles.typingDot, { opacity }]} />;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  rowUser: {
    justifyContent: 'flex-end',
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: spacing.md,
    paddingVertical: 10,
    borderRadius: radii.lg,
    borderWidth: 1,
  },
  bubbleAssistant: {
    backgroundColor: colors.surfaceAlt,
    borderColor: colors.border,
    borderBottomLeftRadius: radii.sm,
  },
  bubbleUser: {
    backgroundColor: colors.goldMuted,
    borderColor: 'rgba(245,166,35,0.35)',
    borderBottomRightRadius: radii.sm,
  },
  text: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
  },
  typingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 14,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textMuted,
  },
});
