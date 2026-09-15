import { Ionicons } from '@expo/vector-icons';

export type RankTier = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  threshold: number;
};

export const rankTiers: RankTier[] = [
  { id: 'cadet', title: 'Cadet', icon: 'school-outline', threshold: 0 },
  { id: 'junior-pilot', title: 'Junior Pilot', icon: 'airplane-outline', threshold: 1000 },
  { id: 'pilot', title: 'Pilot', icon: 'navigate-outline', threshold: 2500 },
  { id: 'senior-pilot', title: 'Senior Pilot', icon: 'compass-outline', threshold: 5000 },
  { id: 'ace-pilot', title: 'Ace Pilot', icon: 'ribbon-outline', threshold: 10000 },
];

export const currentKnowledgePoints = 2480;

export function getCurrentTierIndex(points: number): number {
  let index = 0;
  rankTiers.forEach((tier, i) => {
    if (points >= tier.threshold) index = i;
  });
  return index;
}
