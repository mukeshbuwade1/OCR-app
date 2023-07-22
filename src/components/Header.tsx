import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, images } from '../assets/assets'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { getProportionalFontSize, widthPercentageToDP } from '../methods/Methods';

const Header = ({title}:{
    title?:string
}) => {
    const navigation = useNavigation()
    return (
        <View style={styles.header} >
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconBox}>
                <Image source={images.left} style={styles.left} />
            </TouchableOpacity>
            <Text style={styles.heading} >{title ?? "scan result"}</Text>
            <View style={styles.iconBox} />
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row"
    },
    left: {
        width: widthPercentageToDP(5),
        height: widthPercentageToDP(5),
        tintColor: "#fff"
    },
    iconBox: {
        width: widthPercentageToDP(10),
        height: widthPercentageToDP(10),
        justifyContent: 'center',
        alignItems: "center",

    },
    heading: {
        fontSize: getProportionalFontSize(16),
        textTransform: "capitalize",
        color: COLORS.light,
        fontFamily: FONTS.bold
    },
})