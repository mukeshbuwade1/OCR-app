import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import MainScreen from './src/screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Result from './src/screens/Result';

//https://www.behance.net/gallery/65344605/Image-To-Text-OCR-Mobile-App-Landing-Page-Design
const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="Home" component={MainScreen} />
      <Stack.Screen name="Result" component={Result} />
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({



})