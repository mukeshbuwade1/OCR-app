import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const ButtonComp = ({ title, onPress, style, _text, leftImage }) => {
    return (
        <TouchableOpacity
            style={{ ...styles.box, ...style }}
            onPress={onPress}
        >
            <Image source={leftImage} alt={title} style={
                styles.buttonIcon
            } />

            <Text
                style={{ ...styles.tx, ..._text }}
            >{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonComp

const styles = StyleSheet.create({
    box: {
        minWidth: 150,
        backgroundColor: "#1CFFC9",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        flexDirection: "row",
        paddingHorizontal: 30,
        marginTop: 20,
        elevation:5
    },
    tx: {
        textTransform: "uppercase",
        color: "#000",
        fontWeight: "700"
    },
    buttonIcon: {
        width: 20,
        height: 20,
        marginRight: 20,
        tintColor: "#000"
    }
})