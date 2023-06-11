
import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, images } from '../assets/assets'
import { getProportionalFontSize, widthPercentageToDP } from '../methods/Methods'
import ButtonComp from '../components/ButtonComp'


// import { Alert, Linking, Platform, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import ButtonComp from '../components/ButtonComp';

// const showSettingsAlert = () => {
//   Alert.alert(
//     'Permission Required',
//     'To use the camera, you need to grant camera permission. Please go to the app settings and enable the camera permission.',
//     [
//       { text: 'Cancel', style: 'cancel' },
//       { text: 'Settings', onPress: openAppSettings },
//     ],
//     { cancelable: false }
//   );
// };

// const openAppSettings = () => {
//   if (Platform.OS === 'ios') {
//     Linking.openURL('app-settings:');
//   } else {
//     Linking.openSettings();
//   }
// };

// const NoPermission = () => {
//   return (
//     <View>
//       <Text>NoPermission</Text>
//       <ButtonComp title='give permission'
//         onPress={showSettingsAlert}
//       />
const NoPermission = () => {
  return (
    <View style={styles.box}>
      <Image source={images.ocr} alt='ocr' style={styles.img} />
      <Text style={styles.tx}>OCR by Mukesh</Text>
      <Text style={styles.h2}>Need Permission for This Operation</Text>
      <ButtonComp title='give permission' style={styles.btn}
        _text={{ color: COLORS.light }} />
    </View>
  )
}

export default NoPermission

const styles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.secondary,
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  img: {
    height: widthPercentageToDP(30),
    width: widthPercentageToDP(30),
  },
  tx: {
    fontFamily: FONTS.medium,
    fontSize: getProportionalFontSize(12),
    color: COLORS.dark
  },
  h2: {
    color: COLORS.dark,
    textAlign: "center",
    fontSize: getProportionalFontSize(25),
    fontFamily: FONTS.semiBold,
    width: widthPercentageToDP(70),
    // marginTop:30
  },
  btn: {
    backgroundColor: COLORS.primary
  }
})
