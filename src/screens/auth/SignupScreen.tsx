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
import { ScreenBackground, SoakingarriLogo, Card, TextField, Button, Divider } from '../../components';
import { colors, fonts, spacing } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail, isValidSignupPassword } from '../../utils/validation';

type Props = NativeStackScreenProps<AuthStackParamList, 'Signup'>;

type FormErrors = {
  fullName?: string;
  email?: string;
  password?: string;
};

const FEATURES: { icon: keyof typeof Ionicons.glyphMap; title: string; description: string }[] = [
  {
    icon: 'shield-checkmark-outline',
    title: 'Advanced Reasoning',
    description: 'Deep neural architectures for high-stakes decisions.',
  },
  {
    icon: 'flash-outline',
    title: 'Liquid Latency',
    description: 'Instant response times for seamless collaboration.',
  },
];

export function SignupScreen({ navigation }: Props) {
  const { signIn } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const handleFullNameChange = (value: string) => {
    setFullName(value);
    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
  };

  const handleCreateAccount = () => {
    const nextErrors: FormErrors = {};
    if (!fullName.trim()) nextErrors.fullName = 'Full name is required';
    if (!email.trim()) nextErrors.email = 'Email is required';
    else if (!isValidEmail(email)) nextErrors.email = 'Enter a valid email address';
    if (!password) nextErrors.password = 'Password is required';
    else if (!isValidSignupPassword(password))
      nextErrors.password = 'Use at least 12 characters with one special symbol';

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
            <SoakingarriLogo size={26} />
            <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
              <View style={styles.loginRow}>
                <Text style={styles.loginText}>Login</Text>
                <Ionicons name="arrow-forward" size={14} color={colors.gold} />
              </View>
            </Pressable>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>Join 50k+ users</Text>
          </View>

          <Text style={styles.heading}>
            <Text style={styles.headingAccent}>The Knowledge </Text>
            <Text style={styles.headingWhite}>Starship</Text>
          </Text>
          <Text style={styles.paragraph}>
            SOAKINGARRI AI processes complex datasets into refined, actionable
            insights with unprecedented speed and accuracy.
          </Text>

          <View style={styles.featureList}>
            {FEATURES.map((f) => (
              <View key={f.title} style={styles.featureRow}>
                <View style={styles.featureIcon}>
                  <Ionicons name={f.icon} size={16} color={colors.text} />
                </View>
                <View style={styles.featureTextWrap}>
                  <Text style={styles.featureTitle}>{f.title}</Text>
                  <Text style={styles.featureDescription}>{f.description}</Text>
                </View>
              </View>
            ))}
          </View>

          <Card style={styles.card}>
            <Text style={styles.cardTitle}>Create your account</Text>
            <Text style={styles.cardSubtitle}>Enter your details to begin the journey.</Text>

            <TextField
              label="Full Name"
              placeholder="Alex Rivera"
              value={fullName}
              onChangeText={handleFullNameChange}
              error={errors.fullName}
            />
            <TextField
              label="Email Address"
              placeholder="alex@soakingarri.ai"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={handleEmailChange}
              error={errors.email}
            />
            <TextField
              label="Password"
              placeholder="••••••••"
              secure
              value={password}
              onChangeText={handlePasswordChange}
              error={errors.password}
            />
            {!errors.password ? (
              <Text style={styles.helper}>Minimum 12 characters with one special symbol.</Text>
            ) : null}

            <Button
              label="Create Account"
              variant="light"
              onPress={handleCreateAccount}
              style={styles.createButton}
            />

            <Divider label="OR CONTINUE WITH" />

            <View style={styles.socialRow}>
              <Button label="Google" variant="outline" style={styles.socialButton} onPress={signIn} />
              <Button label="Apple ID" variant="outline" style={styles.socialButton} onPress={signIn} />
            </View>

            <Text style={styles.terms}>
              By signing up, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>.
            </Text>
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
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  loginRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  loginText: {
    color: colors.gold,
    fontFamily: fonts.bold,
    fontSize: 14,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 999,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    marginBottom: spacing.md,
  },
  badgeText: {
    color: colors.textMuted,
    fontFamily: fonts.medium,
    fontSize: 12,
  },
  heading: {
    fontSize: 30,
    marginBottom: spacing.sm,
    lineHeight: 36,
  },
  headingAccent: {
    color: colors.teal,
    fontFamily: fonts.extraBold,
  },
  headingWhite: {
    color: colors.text,
    fontFamily: fonts.extraBold,
  },
  paragraph: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: spacing.lg,
  },
  featureList: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  featureRow: {
    flexDirection: 'row',
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  featureIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureTextWrap: {
    flex: 1,
  },
  featureTitle: {
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: 14,
    marginBottom: 2,
  },
  featureDescription: {
    color: colors.gold,
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 17,
  },
  card: {},
  cardTitle: {
    color: colors.text,
    fontFamily: fonts.extraBold,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  helper: {
    color: colors.textFaint,
    fontFamily: fonts.regular,
    fontSize: 11,
    marginTop: -spacing.sm,
    marginBottom: spacing.lg,
  },
  createButton: {
    marginBottom: spacing.sm,
  },
  socialRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  socialButton: {
    flex: 1,
  },
  terms: {
    color: colors.textFaint,
    fontFamily: fonts.regular,
    fontSize: 11,
    textAlign: 'center',
    marginTop: spacing.lg,
    lineHeight: 16,
  },
  termsLink: {
    color: colors.teal,
    fontFamily: fonts.medium,
  },
});
