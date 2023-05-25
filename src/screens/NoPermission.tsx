import { Alert, Linking, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ButtonComp from '../components/ButtonComp';

const showSettingsAlert = () => {
  Alert.alert(
    'Permission Required',
    'To use the camera, you need to grant camera permission. Please go to the app settings and enable the camera permission.',
    [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Settings', onPress: openAppSettings },
    ],
    { cancelable: false }
  );
};

const openAppSettings = () => {
  if (Platform.OS === 'ios') {
    Linking.openURL('app-settings:');
  } else {
    Linking.openSettings();
  }
};

const NoPermission = () => {
  return (
    <View>
      <Text>NoPermission</Text>
      <ButtonComp title='give permission'
        onPress={showSettingsAlert}
      />
    </View>
  )
}

export default NoPermission

const styles = StyleSheet.create({})