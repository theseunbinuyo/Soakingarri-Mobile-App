import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenBackground, Card, Meter } from '../../components';
import { currentKnowledgePoints, getCurrentTierIndex, rankTiers } from '../../data/rank';
import { colors, fonts, radii, spacing } from '../../theme';

export function RankScreen() {
  const insets = useSafeAreaInsets();
  const currentIndex = getCurrentTierIndex(currentKnowledgePoints);
  const currentTier = rankTiers[currentIndex];
  const nextTier = rankTiers[currentIndex + 1];

  return (
    <ScreenBackground>
      <ScrollView
        contentContainerStyle={[styles.content, { paddingTop: insets.top + spacing.lg }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <LinearGradient
            colors={['#F5C453', colors.gold, '#8A5A12']}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.8, y: 1 }}
            style={styles.heroBadge}
          >
            <Ionicons name={currentTier.icon} size={34} color="#1A1300" />
          </LinearGradient>
          <Text style={styles.rankTitle}>{currentTier.title}</Text>
          <Text style={styles.pointsText}>
            {currentKnowledgePoints.toLocaleString()} knowledge points
          </Text>
        </View>

        <Card>
          {nextTier ? (
            <>
              <Meter
                label={`Progress to ${nextTier.title}`}
                used={currentKnowledgePoints - currentTier.threshold}
                limit={nextTier.threshold - currentTier.threshold}
              />
              <Text style={styles.remaining}>
                {(nextTier.threshold - currentKnowledgePoints).toLocaleString()} points to go
              </Text>
            </>
          ) : (
            <Text style={styles.remaining}>You've reached the top rank.</Text>
          )}
        </Card>

        <Text style={styles.sectionTitle}>Rank ladder</Text>
        <Card style={styles.ladderCard}>
          {rankTiers.map((tier, index) => {
            const achieved = index <= currentIndex;
            const isCurrent = index === currentIndex;
            return (
              <View
                key={tier.id}
                style={[
                  styles.tierRow,
                  index < rankTiers.length - 1 && styles.tierRowBorder,
                  isCurrent && styles.tierRowCurrent,
                ]}
              >
                <View style={[styles.tierIcon, !achieved && styles.tierIconLocked]}>
                  <Ionicons
                    name={tier.icon}
                    size={18}
                    color={achieved ? colors.gold : colors.textFaint}
                  />
                </View>
                <View style={styles.tierText}>
                  <Text style={[styles.tierTitle, !achieved && styles.tierTitleLocked]}>
                    {tier.title}
                  </Text>
                  <Text style={styles.tierThreshold}>
                    {tier.threshold.toLocaleString()} points
                  </Text>
                </View>
                {isCurrent ? (
                  <View style={styles.currentBadge}>
                    <Text style={styles.currentBadgeText}>Current</Text>
                  </View>
                ) : achieved ? (
                  <Ionicons name="checkmark-circle" size={20} color={colors.teal} />
                ) : (
                  <Ionicons name="lock-closed-outline" size={16} color={colors.textFaint} />
                )}
              </View>
            );
          })}
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
  hero: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  heroBadge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  rankTitle: {
    color: colors.text,
    fontFamily: fonts.extraBold,
    fontSize: 22,
    marginBottom: spacing.xs,
  },
  pointsText: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 13,
  },
  remaining: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    color: colors.textMuted,
    fontFamily: fonts.semiBold,
    fontSize: 13,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  ladderCard: {
    padding: 0,
  },
  tierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  tierRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tierRowCurrent: {
    backgroundColor: colors.goldMuted,
  },
  tierIcon: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.goldMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tierIconLocked: {
    backgroundColor: colors.surfaceAlt,
  },
  tierText: {
    flex: 1,
  },
  tierTitle: {
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: 14,
  },
  tierTitleLocked: {
    color: colors.textMuted,
  },
  tierThreshold: {
    color: colors.textMuted,
    fontFamily: fonts.regular,
    fontSize: 12,
    marginTop: 2,
  },
  currentBadge: {
    backgroundColor: colors.gold,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  currentBadgeText: {
    color: '#1A1300',
    fontFamily: fonts.bold,
    fontSize: 10,
  },
});
