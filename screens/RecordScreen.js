import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';

export default function RecordScreen() {
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const startRecording = async () => {
    if (cameraRef.current) {
      try {
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync({
          maxDuration: 15,
          quality: '480p',
        });
        setIsRecording(false);
        navigation.navigate('ChallengeScreen', { videoUri: video.uri }); // send for preview
        navigation.navigate('PreviewScreen', { videoUri: video.uri });
      } catch (error) {
        Alert.alert("Recording Error", error.message);
        setIsRecording(false);
      }
    }
  };

  const stopRecording = () => {
    if (cameraRef.current && isRecording) {
      cameraRef.current.stopRecording();
    }
  };

  if (hasPermission === null) return <View><Text>Requesting permission...</Text></View>;
  if (hasPermission === false) return <View><Text>No access to camera</Text></View>;

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
      />
      <View style={styles.controls}>
        {isRecording ? (
          <TouchableOpacity onPress={stopRecording} style={[styles.button, { backgroundColor: 'red' }]}>
            <Text style={styles.buttonText}>🟥 Stop</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={startRecording} style={styles.button}>
            <Text style={styles.buttonText}>▶ Start Recording</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  controls: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
