import { ActivityIndicator, Animated, Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { getProportionalFontSize, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods'
import { COLORS, FONTS, images } from '../assets/assets'
import { CommonActions, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { local_store_key } from '../assets/Constant'

const Splash = () => {
    const navigation = useNavigation()

    let logo = useRef(new Animated.Value(heightPercentageToDP(0))).current

    useEffect(() => {
        Animated.timing(logo, {
            toValue: -heightPercentageToDP(7),
            duration: 1000,
            useNativeDriver: true,
            // delay:1000,
        }).start()


        setTimeout(() => {
            navigate()
        }, 1500)


    }, []);

    async function IsUserOpenFirstTime() {
        try {
            let res = await AsyncStorage.getItem(local_store_key.IS_OLD_USER)
            if (res) {
                if (JSON.parse(res).oldUser) return false
            }
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async function navigate() {
        let isNewUser = await IsUserOpenFirstTime()
        let route = isNewUser ? "Onboarding" : "MainScreen"
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: route }]
            })
        )

    }

    let opacity = logo.interpolate({
        inputRange: [-heightPercentageToDP(7), heightPercentageToDP(0)],
        outputRange: [1, 0],
        // extrapolate: 'clamp',
    })

    return (
        <ImageBackground source={images.AppBg} style={styles.container}>
            <Animated.View style={{ ...styles.logoContainer, transform: [{ translateY: logo }] }}>
                <Image source={images.logo} alt={"app logo"} style={styles.logo} />
                <Text style={styles.logoText} >OCR</Text>
            </Animated.View>
            <Animated.View style={{
                ...styles.loaderContainer, opacity: opacity
            }} >
                <ActivityIndicator size={"small"} color={COLORS.light} />
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
        top: heightPercentageToDP(52),
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