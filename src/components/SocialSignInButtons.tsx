import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from './Button';
import { useAuth } from '../context/AuthContext';
import { spacing } from '../theme';

type Provider = 'google' | 'apple';

const PROVIDERS: { id: Provider; label: string }[] = [
  { id: 'google', label: 'Google' },
  { id: 'apple', label: 'Apple ID' },
];

// Simulates the OAuth round-trip until real Google / Apple sign-in is wired up.
const MOCK_OAUTH_DELAY_MS = 900;

export function SocialSignInButtons() {
  const { signIn } = useAuth();
  const [pending, setPending] = useState<Provider | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const handlePress = (provider: Provider) => {
    setPending(provider);
    timer.current = setTimeout(signIn, MOCK_OAUTH_DELAY_MS);
  };

  return (
    <View style={styles.row}>
      {PROVIDERS.map((p) => (
        <Button
          key={p.id}
          label={p.label}
          variant="outline"
          style={styles.button}
          loading={pending === p.id}
          disabled={pending !== null && pending !== p.id}
          onPress={() => handlePress(p.id)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  button: {
    flex: 1,
  },
});
