ChallengeCam App – (Giggle)

/ChallengeApp
│
├── assets/ # Icons, splash, tap.mp3
├── screens/ # App screens
│ ├── ChallengeScreen.js
│ ├── RecordScreen.js
│ ├── PreviewScreen.js
│ └── SuccessScreen.js
├── App.js # Navigation setup
└── app.json # App configuration

# 🎬 Challenge Video Recording App
A playful React Native app built with Expo that allows users to:
- Record a 15-second challenge video
- Add fun emoji stickers by drag & drop
- Preview and submit the video
- Store responses in a local moderation queue

## 🚀 Features
- Camera integration via `expo-camera`
- Video playback using `expo-video`
- Emoji sticker selection with drag-drop support
- Preview screen before final submission
- Sound feedback on sticker tap (`tap.mp3`)
- Local submission storage via AsyncStorage

## 📱 Screens
- `ChallengeScreen`: View challenge, choose stickers, and submit
- `RecordScreen`: Record a short video (max 15s)
- `PreviewScreen`: Watch before submitting
- `SuccessScreen`: Confirmation after submission

## 🧩 Tech Stack
- React Native (Expo SDK 53)
- `expo-camera`, `expo-av`, `expo-video`
- `@react-navigation/native`
- `@react-native-async-storage/async-storage`

## 📂 Folder Structure
