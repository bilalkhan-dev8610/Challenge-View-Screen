import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video } from 'expo-video';

const PreviewScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const videoUri = route?.params?.videoUri;

  const handleRetake = () => {
    navigation.navigate('RecordScreen');
  };

  const handleContinue = () => {
    navigation.navigate('ChallengeScreen', { videoUri });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎬 Preview Your Video</Text>

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
        <Text>No video found</Text>
      )}

      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#f44336' }]} onPress={handleRetake}>
          <Text style={styles.buttonText}>🔁 Retake</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#4caf50' }]} onPress={handleContinue}>
          <Text style={styles.buttonText}>➡️ Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PreviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  video: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 30,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    padding: 14,
    borderRadius: 10,
    width: '45%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
