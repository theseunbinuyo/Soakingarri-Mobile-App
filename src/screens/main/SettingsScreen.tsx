import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenBackground, Card, Button } from '../../components';
import { colors, fonts, radii, spacing } from '../../theme';
import { useAuth } from '../../context/AuthContext';
import { SettingId, useSettings } from '../../context/SettingsContext';

type ToggleRow = {
  id: SettingId;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
};

const PREFERENCE_ROWS: ToggleRow[] = [
  {
    id: 'push',
    icon: 'notifications-outline',
    title: 'Push notifications',
    description: 'Session reminders and rank updates',
  },
  {
    id: 'digest',
    icon: 'mail-outline',
    title: 'Email digests',
    description: 'Weekly summary of your progress',
  },
  {
    id: 'motion',
    icon: 'accessibility-outline',
    title: 'Reduce motion',
    description: 'Minimize animations across the app',
  },
];

const PRIVACY_ROWS: ToggleRow[] = [
  {
    id: 'aiTraining',
    icon: 'shield-checkmark-outline',
    title: 'Share data to improve AI',
    description: 'Help refine Soakingarri AI with anonymized chats',
  },
  {
    id: 'personalization',
    icon: 'sparkles-outline',
    title: 'Personalized recommendations',
    description: 'Tailor tips using your activity',
  },
];

export function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();
  const { values, toggle } = useSettings();

  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.screenTitle}>Settings</Text>

        <Text style={styles.sectionTitle}>Preferences</Text>
        <Card style={styles.card}>
          {PREFERENCE_ROWS.map((row, index) => (
            <SettingsToggleRow
              key={row.id}
              row={row}
              value={values[row.id]}
              onChange={() => toggle(row.id)}
              isLast={index === PREFERENCE_ROWS.length - 1}
            />
          ))}
        </Card>

        <Text style={styles.sectionTitle}>Privacy</Text>
        <Card style={styles.card}>
          {PRIVACY_ROWS.map((row, index) => (
            <SettingsToggleRow
              key={row.id}
              row={row}
              value={values[row.id]}
              onChange={() => toggle(row.id)}
              isLast={index === PRIVACY_ROWS.length - 1}
            />
          ))}
        </Card>

        <View style={styles.logoutWrap}>
          <Button label="Log Out" variant="outline" onPress={signOut} />
        </View>
      </ScrollView>
    </ScreenBackground>
  );
}

function SettingsToggleRow({
  row,
  value,
  onChange,
  isLast,
}: {
  row: ToggleRow;
  value: boolean;
  onChange: () => void;
  isLast: boolean;
}) {
  return (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      <View style={styles.rowIcon}>
        <Ionicons name={row.icon} size={18} color={colors.gold} />
      </View>
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{row.title}</Text>
        <Text style={styles.rowDescription}>{row.description}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ false: colors.surfaceAlt, true: colors.gold }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  screenTitle: {
    color: colors.text,
    fontFamily: fonts.extraBold,
    fontSize: 22,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.textMuted,
    fontFamily: fonts.semiBold,
    fontSize: 13,
    marginBottom: spacing.sm,
  },
  card: {
    padding: 0,
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.goldMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowText: {
    flex: 1,
  },
  rowTitle: {
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  rowDescription: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: 2,
  },
  logoutWrap: {
    marginTop: spacing.sm,
  },
});
