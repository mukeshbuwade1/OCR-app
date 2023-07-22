import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Splash from '../screens/Splash';
import Onboarding from '../screens/Onboarding';
import MainScreen from '../screens/MainScreen';
import PreviousScan from '../screens/PreviousScan';
import NoPermission from '../screens/NoPermission';
import Result from '../screens/Result';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  )
}
const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>

      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="MainScreen" component={MainScreen} />
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="PreviousScan" component={PreviousScan} />
      <Stack.Screen name="NoPermission" component={NoPermission} />
    </Stack.Navigator>
  )
}

const RootNavigation = () => {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  console.log("user", user)
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    //  if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {/* <Stack.Screen name="AuthStack" component={AuthStack} /> */}
        <Stack.Screen name="AppStack" component={AppStack} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default RootNavigation

const styles = StyleSheet.create({})