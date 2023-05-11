import { Animated, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { getProportionalFontSize, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods'
import { COLORS, FONTS, images } from '../assets/assets'

const Splash = () => {

    let logo = useRef(new Animated.Value(heightPercentageToDP(38)))

    useEffect(()=>{
        Animated.timing("logo",{})
    })

    return (
        <ImageBackground source={images.AppBg} style={styles.container}>
            <Animated.View style={styles.logoContainer}>
                <Image source={images.logo} alt={"app logo"} style={styles.logo} />
                <Text style={styles.logoText} >OCR</Text>
            </Animated.View>
            <View style={styles.loaderContainer} >
                <Text style={styles.loaderText}>Loading resources</Text>
            </View>
        </ImageBackground>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),

    },
    logoContainer:{
        position: 'absolute',
        top: heightPercentageToDP(38),
        left: widthPercentageToDP(37),
        justifyContent:"center",
        alignItems:"center"
    },
    logo: {
        width: widthPercentageToDP(25),
        height: widthPercentageToDP(25),

    },
    logoText:{
        color:COLORS.light,
        fontFamily:FONTS.bold,
        fontSize:getProportionalFontSize(20)
    },
    loaderContainer:{
        position: 'absolute',
        top: heightPercentageToDP(58),
        left: widthPercentageToDP(34),
        justifyContent:"center",
        alignItems:"center",
    },
    loaderText:{
        color:COLORS.light,
        fontFamily:FONTS.semiBold,
        fontSize:getProportionalFontSize(12)
    }
})