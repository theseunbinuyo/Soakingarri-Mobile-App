import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_STORAGE_KEY = 'soakingarri:settings';

export type SettingId = 'push' | 'digest' | 'motion' | 'aiTraining' | 'personalization';

const DEFAULT_SETTINGS: Record<SettingId, boolean> = {
  push: true,
  digest: false,
  motion: false,
  aiTraining: true,
  personalization: true,
};

type SettingsContextValue = {
  values: Record<SettingId, boolean>;
  toggle: (id: SettingId) => void;
  /** True when the user enabled "Reduce motion" in the app or in their OS accessibility settings. */
  reduceMotion: boolean;
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [values, setValues] = useState(DEFAULT_SETTINGS);
  const [systemReduceMotion, setSystemReduceMotion] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(SETTINGS_STORAGE_KEY)
      .then((raw) => {
        if (raw) setValues((prev) => ({ ...prev, ...JSON.parse(raw) }));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled()
      .then(setSystemReduceMotion)
      .catch(() => {});
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setSystemReduceMotion);
    return () => sub.remove();
  }, []);

  const toggle = useCallback((id: SettingId) => {
    setValues((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(next)).catch(() => {});
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ values, toggle, reduceMotion: values.motion || systemReduceMotion }),
    [values, toggle, systemReduceMotion],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
}
