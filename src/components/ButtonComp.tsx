import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react';
import { getProportionalFontSize, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods';
import { COLORS, FONTS } from '../assets/assets';

interface props {
    title: string
    onPress?: () => void
    style?: StyleProp<ViewStyle>
    _text?: StyleProp<ViewStyle>
    imageStyle?: StyleProp<ImageStyle>
    leftImage?: any
}

const ButtonComp = ({ title, onPress, style, _text, leftImage, imageStyle }: props) => {
    return (
        <TouchableOpacity
            style={[styles.box, style]}
            onPress={onPress}
        >
            <Image source={leftImage} alt={title}
                style={[styles.buttonIcon, imageStyle]}
            />

            <Text
                style={[styles.tx, _text]}
            >{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonComp

const styles = StyleSheet.create({
    box: {
        minWidth: widthPercentageToDP(40),
        backgroundColor: COLORS.secondary,
        height: heightPercentageToDP(5),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        flexDirection: "row",
        paddingHorizontal: widthPercentageToDP(10),
        marginTop: heightPercentageToDP(3),
        elevation: 5
    },
    tx: {
        textTransform: "uppercase",
        color: COLORS.dark,
        fontFamily: FONTS.bold
    },
    buttonIcon: {
        width: getProportionalFontSize(20),
        height: getProportionalFontSize(20),
        marginRight: getProportionalFontSize(20),
        tintColor: COLORS.dark
    }
})