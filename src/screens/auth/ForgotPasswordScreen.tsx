import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { ScreenBackground, SoakingarriLogo, Card, TextField, Button } from '../../components';
import { colors, fonts, spacing } from '../../theme';
import { isValidEmail } from '../../utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

// Mocked until the backend exposes a password-reset endpoint.
const MOCK_SEND_DELAY_MS = 900;

export function ForgotPasswordScreen({ navigation, route }: Props) {
  const [email, setEmail] = useState(route.params?.email ?? '');
  const [error, setError] = useState<string>();
  const [sending, setSending] = useState(false);
  const [sentTo, setSentTo] = useState<string>();
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (error) setError(undefined);
  };

  const handleSend = () => {
    const trimmed = email.trim();
    if (!trimmed) return setError('Email is required');
    if (!isValidEmail(trimmed)) return setError('Enter a valid email address');

    setSending(true);
    timer.current = setTimeout(() => {
      setSending(false);
      setSentTo(trimmed);
    }, MOCK_SEND_DELAY_MS);
  };

  return (
    <ScreenBackground>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={8} style={styles.backRow}>
              <Ionicons name="arrow-back" size={16} color={colors.gold} />
              <Text style={styles.backText}>Back</Text>
            </Pressable>
            <SoakingarriLogo size={26} />
            <View style={styles.headerSpacer} />
          </View>

          <Card style={styles.card}>
            <View style={styles.badge}>
              <Ionicons
                name={sentTo ? 'mail-open-outline' : 'key-outline'}
                size={22}
                color={sentTo ? colors.teal : colors.text}
              />
            </View>

            {sentTo ? (
              <>
                <Text style={styles.title}>Check your inbox</Text>
                <Text style={styles.subtitle}>
                  If an account exists for <Text style={styles.emphasis}>{sentTo}</Text>, we've
                  sent a link to reset your password.
                </Text>
                <View style={styles.form}>
                  <Button
                    label="Back to Log In"
                    variant="secondary"
                    icon="arrow-forward"
                    onPress={() => navigation.navigate('Login')}
                    style={styles.primaryButton}
                  />
                  <Button label="Resend link" variant="outline" onPress={() => setSentTo(undefined)} />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.title}>Reset Password</Text>
                <Text style={styles.subtitle}>
                  Enter the email linked to your account and we'll send you a reset link.
                </Text>
                <View style={styles.form}>
                  <TextField
                    label="Email Address"
                    icon="mail-outline"
                    placeholder="name@company.com"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    returnKeyType="send"
                    value={email}
                    onChangeText={handleEmailChange}
                    onSubmitEditing={handleSend}
                    error={error}
                  />
                  <Button
                    label="Send Reset Link"
                    variant="secondary"
                    icon="arrow-forward"
                    loading={sending}
                    onPress={handleSend}
                    style={styles.primaryButton}
                  />
                </View>
              </>
            )}
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  backRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    width: 64,
  },
  backText: {
    color: colors.gold,
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  headerSpacer: {
    width: 64,
  },
  card: {
    alignItems: 'center',
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.extraBold,
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  emphasis: {
    color: colors.text,
    fontFamily: fonts.semiBold,
  },
  form: {
    width: '100%',
  },
  primaryButton: {
    marginBottom: spacing.md,
  },
});
