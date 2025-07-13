import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChallengeScreen from './screens/ChallengeScreen';
import RecordScreen from './screens/RecordScreen';
import PreviewScreen from './screens/PreviewScreen'; // ✅ Add this
import SuccessScreen from './screens/SuccessScreen'; // ✅ Add this

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ChallengeScreen">
        <Stack.Screen name="ChallengeScreen" component={ChallengeScreen} />
        <Stack.Screen name="RecordScreen" component={RecordScreen} />
        <Stack.Screen name="PreviewScreen" component={PreviewScreen} />
        <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
