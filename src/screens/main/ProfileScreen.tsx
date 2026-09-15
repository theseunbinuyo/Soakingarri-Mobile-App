import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenBackground, Card, StatTile, Meter, ProfileAvatar } from '../../components';
import { achievements, profileStats, profileUser, usageLimit } from '../../data/profile';
import { colors, fonts, radii, spacing } from '../../theme';

export function ProfileScreen() {
  const insets = useSafeAreaInsets();

  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.identityRow}>
          <ProfileAvatar initials={profileUser.initials} size={56} />
          <View>
            <Text style={styles.name}>{profileUser.name}</Text>
            <Text style={styles.rank}>{profileUser.rankTitle}</Text>
          </View>
        </View>

        <View style={styles.statsRow}>
          {profileStats.map((stat) => (
            <StatTile
              key={stat.id}
              label={stat.label}
              value={stat.value}
              delta={stat.delta}
              deltaPositive={stat.deltaPositive}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Usage this month</Text>
        <Card>
          <Meter
            label={usageLimit.label}
            used={usageLimit.used}
            limit={usageLimit.limit}
            warnNearLimit
          />
        </Card>

        <Text style={styles.sectionTitle}>Achievements</Text>
        <Card style={styles.achievementsCard}>
          {achievements.map((achievement, index) => (
            <View
              key={achievement.id}
              style={[
                styles.achievementRow,
                index < achievements.length - 1 && styles.achievementRowBorder,
              ]}
            >
              <View style={[styles.achievementIcon, !achievement.unlocked && styles.achievementIconLocked]}>
                <Ionicons
                  name={achievement.icon}
                  size={18}
                  color={achievement.unlocked ? colors.gold : colors.textFaint}
                />
              </View>
              <View style={styles.achievementText}>
                <Text
                  style={[
                    styles.achievementTitle,
                    !achievement.unlocked && styles.achievementTitleLocked,
                  ]}
                >
                  {achievement.title}
                </Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
              {achievement.unlocked ? (
                <Ionicons name="checkmark-circle" size={20} color={colors.teal} />
              ) : (
                <Ionicons name="lock-closed-outline" size={16} color={colors.textFaint} />
              )}
            </View>
          ))}
        </Card>
      </ScrollView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  identityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  name: {
    color: colors.text,
    fontFamily: fonts.bold,
    fontSize: 18,
  },
  rank: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 13,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.textMuted,
    fontFamily: fonts.semiBold,
    fontSize: 13,
    marginBottom: spacing.sm,
  },
  achievementsCard: {
    marginTop: spacing.lg,
    padding: 0,
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  achievementRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  achievementIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.goldMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementIconLocked: {
    backgroundColor: colors.surfaceAlt,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  achievementTitleLocked: {
    color: colors.textMuted,
  },
  achievementDescription: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: 2,
  },
});
