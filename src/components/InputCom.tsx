import { KeyboardTypeOptions, StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from 'react-native'
import React from 'react'
import { getProportionalFontSize, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods'
import { COLORS, FONTS } from '../assets/assets';

interface props {
    label: string;
    placeholder?: string | undefined;
    value?: string | undefined
    onChangeText?: ((text: string) => void) | undefined;
    input_style?: StyleProp<TextStyle>
    label_style?: StyleProp<TextStyle>
    keyboardType?: KeyboardTypeOptions | undefined;
    secureTextEntry?: boolean | undefined
}

const InputCom = ({ label, placeholder, value, onChangeText,
     input_style, label_style, keyboardType,secureTextEntry,
     }: props) => {
    return (
        <View style={styles.box}>
            <Text style={[styles.label, label_style]}>{label}</Text>
            <TextInput
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                style={[styles.input, input_style]}
                keyboardType={keyboardType}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

export default InputCom

const styles = StyleSheet.create({
    box: {
        width: widthPercentageToDP(80),
        marginVertical: heightPercentageToDP(1)
    },
    label: {
        fontSize: getProportionalFontSize(14),
        fontFamily: FONTS.medium,
        marginBottom: getProportionalFontSize(3),
        textTransform: "capitalize",
        color: COLORS.dark
    },
    input: {
        backgroundColor: COLORS.inputBg,
        width: "100%",
        height: getProportionalFontSize(40),
        borderRadius: 10,
        paddingHorizontal: 20,
        fontFamily: FONTS.medium,
        color: COLORS.dark
    }
})