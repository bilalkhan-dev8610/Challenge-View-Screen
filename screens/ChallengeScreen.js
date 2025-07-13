// ChallengeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image, Animated, PanResponder } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';
import { Video } from 'expo-video'; // ensure expo-video is installed

const emojis = ['😎', '🔥', '🎉', '😂'];

const ChallengeScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const videoUri = route?.params?.videoUri;

  const [selectedSticker, setSelectedSticker] = useState(null);
  const [pan] = useState(new Animated.ValueXY());

  useEffect(() => {
    pan.setValue({ x: 150, y: 150 });
  }, [selectedSticker]);

  const playTapSound = async () => {
    const { sound } = await Audio.Sound.createAsync(require('../assets/tap.mp3'));
    await sound.playAsync();
  };

  const handleSubmit = async () => {
    if (!videoUri) {
      Alert.alert("Error", "Please record a video first.");
      return;
    }
    if (!selectedSticker) {
      Alert.alert("Error", "Please select a sticker before submitting.");
      return;
    }

    const submission = {
      id: Date.now(),
      videoUri,
      sticker: selectedSticker,
      status: 'pending',
    };

    try {
      const existing = await AsyncStorage.getItem('moderationQueue');
      const queue = existing ? JSON.parse(existing) : [];
      queue.push(submission);
      await AsyncStorage.setItem('moderationQueue', JSON.stringify(queue));
      Alert.alert("Success", "Submission Pending Review by Moderator");
      navigation.navigate('SuccessScreen');
    } catch (error) {
      Alert.alert("Error", "Failed to store submission.");
    }
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        { dx: pan.x, dy: pan.y },
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      Animated.spring(pan, {
        toValue: { x: pan.x._value, y: pan.y._value },
        useNativeDriver: false,
      }).start();
    },
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔥 Challenge 🔥</Text>

      <View style={styles.videoWrapper}>
        {videoUri ? (
          <Video
            source={{ uri: videoUri }}
            style={styles.video}
            useNativeControls
            resizeMode="contain"
            isLooping
            shouldPlay
          />
        ) : (
          <Image
            source={{ uri: 'https://via.placeholder.com/350x200.png?text=Video+Preview' }}
            style={styles.video}
          />
        )}

        {selectedSticker && (
          <Animated.View
            style={[styles.stickerOverlay, pan.getLayout()]}
            {...panResponder.panHandlers}
          >
            <Text style={styles.stickerText}>{selectedSticker}</Text>
          </Animated.View>
        )}
      </View>

      <TouchableOpacity style={styles.recordButton} onPress={() => navigation.navigate('RecordScreen')}>
        <Text style={styles.recordText}>🎥 Record Your Response</Text>
      </TouchableOpacity>

      <Text style={styles.stickerLabel}>Choose a Sticker:</Text>
      <View style={styles.stickerRow}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.stickerBox, selectedSticker === emoji && styles.selectedSticker]}
            onPress={() => {
              setSelectedSticker(emoji);
              playTapSound();
            }}
          >
            <Text style={styles.sticker}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>✅ Submit Response</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ChallengeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fffdf7',
    alignItems: 'center',
    flexGrow: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#ff4081',
  },
  videoWrapper: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
    backgroundColor: '#eee',
    overflow: 'hidden',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  stickerOverlay: {
    position: 'absolute',
    zIndex: 99,
  },
  stickerText: {
    fontSize: 36,
  },
  recordButton: {
    backgroundColor: '#7c4dff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  recordText: {
    color: 'white',
    fontSize: 16,
  },
  stickerLabel: {
    fontSize: 18,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  stickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  stickerBox: {
    backgroundColor: '#ffecb3',
    padding: 10,
    borderRadius: 10,
  },
  selectedSticker: {
    backgroundColor: '#ffe0b2',
  },
  sticker: {
    fontSize: 24,
  },
  submitButton: {
    backgroundColor: '#00c853',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
