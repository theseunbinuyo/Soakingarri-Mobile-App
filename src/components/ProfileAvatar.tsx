import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, fonts } from '../theme';

const AVATAR_STORAGE_KEY = 'soakingarri:profileAvatarUri';

type Props = {
  initials: string;
  size?: number;
};

export function ProfileAvatar({ initials, size = 56 }: Props) {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(AVATAR_STORAGE_KEY)
      .then((uri) => {
        if (uri) setAvatarUri(uri);
      })
      .catch(() => {});
  }, []);

  const handlePick = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        'Photo access needed',
        'Allow photo library access in your device settings to set a profile picture.',
      );
      return;
    }

    setIsPicking(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'images',
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0]) {
        const uri = result.assets[0].uri;
        setAvatarUri(uri);
        AsyncStorage.setItem(AVATAR_STORAGE_KEY, uri).catch(() => {});
      }
    } finally {
      setIsPicking(false);
    }
  };

  return (
    <Pressable
      onPress={handlePick}
      disabled={isPicking}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
        {avatarUri ? (
          <Image source={{ uri: avatarUri }} style={[styles.image, { borderRadius: size / 2 }]} />
        ) : (
          <Text style={[styles.initials, { fontSize: size * 0.32 }]}>{initials}</Text>
        )}
        {isPicking ? (
          <View style={[styles.loadingOverlay, { borderRadius: size / 2 }]}>
            <ActivityIndicator color={colors.gold} size="small" />
          </View>
        ) : null}
      </View>
      <View style={styles.editBadge}>
        <Ionicons name="camera" size={11} color="#1A1300" />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.8,
  },
  avatar: {
    backgroundColor: colors.goldMuted,
    borderWidth: 1,
    borderColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  initials: {
    color: colors.gold,
    fontFamily: fonts.bold,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
});
