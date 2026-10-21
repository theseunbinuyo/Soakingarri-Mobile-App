import React, { useState } from 'react';
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
import { ScreenBackground, SoakingarriLogo, Card, TextField, Button, Checkbox, Divider, SocialSignInButtons } from '../../components';
import { colors, fonts, spacing } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail } from '../../utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

type FormErrors = {
  email?: string;
  password?: string;
};

export function LoginScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleLogin = () => {
    const nextErrors: FormErrors = {};
    if (!email.trim()) nextErrors.email = 'Email is required';
    else if (!isValidEmail(email)) nextErrors.email = 'Enter a valid email address';
    if (!password) nextErrors.password = 'Password is required';

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) signIn();
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
            <SoakingarriLogo size={30} />
          </View>

          <Card style={styles.card}>
            <View style={styles.lockBadge}>
              <Ionicons name="lock-closed-outline" size={22} color={colors.text} />
            </View>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Precision intelligence awaits. Log in to continue.
            </Text>

            <View style={styles.form}>
              <TextField
                label="Email Address"
                icon="mail-outline"
                placeholder="name@company.com"
                autoCapitalize="none"
                keyboardType="email-address"
                value={email}
                onChangeText={handleEmailChange}
                error={errors.email}
              />
              <TextField
                label="Password"
                icon="lock-closed-outline"
                placeholder="••••••••"
                secure
                rightLabel="Forgot Password?"
                onRightLabelPress={() =>
                  navigation.navigate('ForgotPassword', { email: email.trim() || undefined })
                }
                value={password}
                onChangeText={handlePasswordChange}
                error={errors.password}
              />

              <View style={styles.rememberRow}>
                <Checkbox
                  checked={remember}
                  onToggle={() => setRemember((v) => !v)}
                  label="Remember this session"
                />
              </View>

              <Button
                label="Log In"
                variant="secondary"
                icon="arrow-forward"
                onPress={handleLogin}
                style={styles.loginButton}
              />

              <Divider label="OR CONTINUE WITH" />

              <SocialSignInButtons />

              <View style={styles.footerRow}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <Pressable onPress={() => navigation.navigate('Signup')} hitSlop={8}>
                  <Text style={styles.footerLink}>Sign up</Text>
                </Pressable>
              </View>
            </View>
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
    alignItems: 'center',
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
  },
  card: {
    alignItems: 'center',
  },
  lockBadge: {
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
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  form: {
    width: '100%',
  },
  rememberRow: {
    marginBottom: spacing.lg,
  },
  loginButton: {
    marginBottom: spacing.sm,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  footerLink: {
    color: colors.teal,
    fontFamily: fonts.semiBold,
    fontSize: 13,
  },
});
