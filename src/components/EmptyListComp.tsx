import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, images } from '../assets/assets'
import { getProportionalFontSize, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods'
import ButtonComp from './ButtonComp'
import { useNavigation } from '@react-navigation/native'

const EmptyListComp = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.box}>
      <Image source={images.fileWarning} style={styles.image} alt={"file not found icon"} />
      <Text style={styles.heading}>No data found! 😔</Text>
      <Text style={styles.paragraph}>Looks like you have not scanned anything yet</Text>
      <ButtonComp 
      title='👈 go back and scan'
      onPress={()=>navigation.goBack()} 
       />
    </View>
  )
}

export default EmptyListComp

const styles = StyleSheet.create({
  box: {
    justifyContent: "center", alignItems: "center",
    width: widthPercentageToDP('90%'),
    margin: widthPercentageToDP('5%'),
    // borderWidth: 1,
    // borderColor: "#ddd",
    borderRadius: 5,
    padding: widthPercentageToDP('5%'),
    // backgroundColor: COLORS.light,
    marginTop: heightPercentageToDP(10)
  },
  image: {
    width: widthPercentageToDP(20),
    height: widthPercentageToDP(20),
    resizeMode: "cover"
  },
  heading: {
    fontFamily: FONTS.semiBold,
    marginTop: heightPercentageToDP(4),
    color:COLORS.light,
    fontSize:getProportionalFontSize(14)
  },
  paragraph:{
    fontFamily: FONTS.medium,
    // marginTop: heightPercentageToDP(4),
    color:COLORS.gray,
    fontSize:getProportionalFontSize(12)

  }
})