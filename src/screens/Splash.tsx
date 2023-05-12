import { Animated, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { getProportionalFontSize, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods'
import { COLORS, FONTS, images } from '../assets/assets'

const Splash = () => {

    let logo = useRef(new Animated.Value(heightPercentageToDP(0))).current

    useEffect(() => {
        Animated.timing(logo, {
            toValue: -heightPercentageToDP(10),
            duration: 1000,
            useNativeDriver: true,
            // delay:1000,
        }).start()

    }, [])

    console.log(logo)

    return (
        <ImageBackground source={images.AppBg} style={styles.container}>
            <Animated.View style={{ ...styles.logoContainer, transform: [{ translateY: logo }] }}>
                <Image source={images.logo} alt={"app logo"} style={styles.logo} />
                <Text style={styles.logoText} >OCR</Text>
            </Animated.View>
            <Animated.View style={{
                ...styles.loaderContainer, opacity: logo.interpolate({
                    inputRange: [heightPercentageToDP(0), heightPercentageToDP(5)],
                    outputRange: [0,1],
                    extrapolate: 'clamp',
                })
            }} >
                <Text style={styles.loaderText}>Loading resources</Text>
            </Animated.View>
        </ImageBackground>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),

    },
    logoContainer: {
        position: 'absolute',
        top: heightPercentageToDP(38),
        left: widthPercentageToDP(37),
        justifyContent: "center",
        alignItems: "center",

    },
    logo: {
        width: widthPercentageToDP(25),
        height: widthPercentageToDP(25),

    },
    logoText: {
        color: COLORS.light,
        fontFamily: FONTS.bold,
        fontSize: getProportionalFontSize(20)
    },
    loaderContainer: {
        position: 'absolute',
        top: heightPercentageToDP(58),
        left: widthPercentageToDP(34),
        justifyContent: "center",
        alignItems: "center",
    },
    loaderText: {
        color: COLORS.light,
        fontFamily: FONTS.semiBold,
        fontSize: getProportionalFontSize(12)
    }
})