import { Ionicons } from '@expo/vector-icons';

export type ProfileStat = {
  id: string;
  label: string;
  value: string;
  delta?: string;
  deltaPositive?: boolean;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  unlocked: boolean;
};

export const profileUser = {
  name: 'Alex Rivera',
  rankTitle: 'Junior Pilot',
  initials: 'AR',
};

export const profileStats: ProfileStat[] = [
  {
    id: 'points',
    label: 'Knowledge points',
    value: '2,480',
    delta: '+120 this week',
    deltaPositive: true,
  },
  { id: 'sessions', label: 'Sessions completed', value: '37' },
  { id: 'streak', label: 'Day streak', value: '6' },
];

export const achievements: Achievement[] = [
  {
    id: 'first-flight',
    title: 'First Flight',
    description: 'Completed your first session',
    icon: 'rocket-outline',
    unlocked: true,
  },
  {
    id: 'sharp-mind',
    title: 'Sharp Mind',
    description: 'Earned 1,000 knowledge points',
    icon: 'bulb-outline',
    unlocked: true,
  },
  {
    id: 'steady-hand',
    title: 'Steady Hand',
    description: 'Reach a 7-day streak',
    icon: 'flame-outline',
    unlocked: false,
  },
  {
    id: 'ace-pilot',
    title: 'Ace Pilot',
    description: 'Reach Ace rank',
    icon: 'ribbon-outline',
    unlocked: false,
  },
];

export const usageLimit = {
  label: 'Messages this month',
  used: 340,
  limit: 500,
};
