import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { images } from '../assets/assets'
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation()
  return (
    <View style={styles.header} >
        <TouchableOpacity onPress={()=>navigation.goBack()} style={styles.iconBox}>
            <Image source={images.left} style={styles.left} />
        </TouchableOpacity>
      <Text style={styles.heading} >scan result</Text>
      <View style={styles.iconBox}/>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    header:{
        justifyContent:"space-between",
        alignItems:"center",
        flexDirection:"row"
    },
    left:{
        width:20,
        height:20,
        tintColor:"#fff"
    },
    iconBox:{
        width:40,
        height:40,
        justifyContent:'center',
        alignItems:"center",

    },
    heading: {
        fontSize: 20,
        fontWeight: "700",
        textTransform: "capitalize",
        color: "#fff"
    },
})