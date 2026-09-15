import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenBackground, SoakingarriLogo, Card, ChatBubble, TypingBubble } from '../../components';
import {
  ChatMessage,
  SUGGESTED_PROMPTS,
  createMessage,
  getMockAssistantReply,
} from '../../data/chat';
import { colors, fonts, radii, spacing } from '../../theme';

export function HomeScreen() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const invertedData = useMemo(() => [...messages].reverse(), [messages]);

  const handleSend = useCallback(
    (text?: string) => {
      const trimmed = (text ?? input).trim();
      if (!trimmed || isTyping) return;

      setMessages((prev) => [...prev, createMessage('user', trimmed)]);
      setInput('');
      setIsTyping(true);

      getMockAssistantReply(trimmed).then((reply) => {
        setMessages((prev) => [...prev, createMessage('assistant', reply)]);
        setIsTyping(false);
      });
    },
    [input, isTyping],
  );

  return (
    <ScreenBackground>
      <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
        <SoakingarriLogo size={22} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={insets.top}
      >
        {messages.length === 0 ? (
          <EmptyState onSelectPrompt={handleSend} />
        ) : (
          <FlatList
            inverted
            data={invertedData}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatBubble message={item} />}
            contentContainerStyle={styles.listContent}
            ListHeaderComponent={isTyping ? <TypingBubble /> : null}
            keyboardShouldPersistTaps="handled"
          />
        )}

        <View style={styles.composerRow}>
          <TextInput
            style={styles.input}
            placeholder="Message Soakingarri AI"
            placeholderTextColor={colors.textFaint}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={2000}
          />
          <Pressable
            onPress={() => handleSend()}
            disabled={!input.trim() || isTyping}
            hitSlop={8}
            style={({ pressed }) => [
              styles.sendButton,
              (!input.trim() || isTyping) && styles.sendButtonDisabled,
              pressed && styles.sendButtonPressed,
            ]}
          >
            <Ionicons name="arrow-up" size={18} color="#1A1300" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

function EmptyState({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) {
  return (
    <View style={styles.emptyWrap}>
      <Card style={styles.emptyCard}>
        <View style={styles.emptyIconBadge}>
          <Ionicons name="sparkles-outline" size={22} color={colors.gold} />
        </View>
        <Text style={styles.emptyTitle}>Ask Soakingarri AI</Text>
        <Text style={styles.emptySubtitle}>
          Get help, track your progress, or explore your training history.
        </Text>
      </Card>

      <View style={styles.promptList}>
        {SUGGESTED_PROMPTS.map((prompt) => (
          <Pressable
            key={prompt}
            onPress={() => onSelectPrompt(prompt)}
            style={({ pressed }) => [styles.promptChip, pressed && styles.promptChipPressed]}
          >
            <Text style={styles.promptText}>{prompt}</Text>
            <Ionicons name="arrow-forward" size={14} color={colors.textMuted} />
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingBottom: spacing.md,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyCard: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emptyIconBadge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  emptyTitle: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 18,
    marginBottom: spacing.xs,
  },
  emptySubtitle: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 13,
    textAlign: 'center',
  },
  promptList: {
    gap: spacing.sm,
  },
  promptChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingVertical: 14,
    paddingHorizontal: spacing.md,
  },
  promptChipPressed: {
    opacity: 0.75,
  },
  promptText: {
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 13,
    flexShrink: 1,
    marginRight: spacing.sm,
  },
  composerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  input: {
    flex: 1,
    maxHeight: 120,
    color: colors.text,
    fontFamily: fonts.regular,
    fontSize: 15,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    opacity: 0.4,
  },
  sendButtonPressed: {
    opacity: 0.85,
  },
});
