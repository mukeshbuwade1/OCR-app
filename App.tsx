// import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import MainScreen from './src/screens/MainScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Result from './src/screens/Result';
import Onboarding from './src/screens/Onboarding';
import Splash from './src/screens/Splash';
import PreviousScan from './src/screens/PreviousScan';
// import NoPermission from './src/screens/NoPermission';
import RootNavigation from './src/navigation/RootNavigation';

//https://www.behance.net/gallery/65344605/Image-To-Text-OCR-Mobile-App-Landing-Page-Design

const App = () => {
  return (
    // <NoPermission/>
    // <NavigationContainer>
    //   <Stack.Navigator screenOptions={{
    //     headerShown: false
    //   }}>
    //     <Stack.Screen name="Splash" component={Splash} />
    //     <Stack.Screen name="Onboarding" component={Onboarding} />
    //     <Stack.Screen name="MainScreen" component={MainScreen} />
    //     <Stack.Screen name="Result" component={Result} />
    //     <Stack.Screen name="PreviousScan" component={PreviousScan} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    <RootNavigation/>
  )
}

export default App