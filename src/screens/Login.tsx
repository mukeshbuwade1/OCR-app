import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import InputCom from '../components/InputCom'
import ScreenWrapper from '../components/ScreenWrapper'
import ButtonComp from '../components/ButtonComp'
import { COLORS, FONTS, images } from '../assets/assets'
import { getProportionalFontSize, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods'

const Login = ({ navigation }) => {
    const [state, setState] = useState({
        email: '', password: ""
    })

    const handleChange = (key: string, value: string) => {
        setState({
            ...state,
            [key]: value
        })
    }

    const handleSubmit = () => {
        console.log("form data : ", state)
    }
    return (
        <ScreenWrapper style={{
            justifyContent: "center",
            alignItems: "center",
        }}>
            <Image source={images.logo} resizeMode='contain' style={{
                width: widthPercentageToDP(30),
                height: heightPercentageToDP(20),
                tintColor: COLORS.dark,
                marginTop: -heightPercentageToDP(20)
            }}
            />

            <InputCom
                label='email'
                placeholder='mukesh@demo.com'
                value={state.email}
                keyboardType={"email-address"}
                onChangeText={(text) => handleChange("email", text)}
            />

            <InputCom
                label='password'
                placeholder="Quz@90Hh"
                value={state.password}
                secureTextEntry={true}
                onChangeText={(text) => handleChange("password", text)}
            />

            <TouchableOpacity style={{
                width: widthPercentageToDP(80),
                alignItems: "flex-end"
            }}>
                <Text style={styles.forgot}>Forgot Password</Text>
            </TouchableOpacity>

            <ButtonComp title='login' />

            <View style={{
                position: 'absolute',
                bottom: heightPercentageToDP(5),
                alignItems: "center"
            }}>
                <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                    <Text style={styles.already}>Don't have an account? Register</Text>
                </TouchableOpacity>
                <TouchableOpacity >
                    <Text style={styles.privacy}>Learn more about our privacy policy</Text>
                </TouchableOpacity>

            </View>
        </ScreenWrapper>
    )
}

export default Login

const styles = StyleSheet.create({
    forgot: {
        fontFamily: FONTS.medium,
        color: COLORS.secondary,
        fontSize: getProportionalFontSize(12),
        marginRight: getProportionalFontSize(5)
    },
    already: {
        fontFamily: FONTS.medium,
        color: COLORS.secondary,
        fontSize: getProportionalFontSize(14),
        marginBottom: heightPercentageToDP(2)
    },
    privacy: {
        fontFamily: FONTS.regular,
        color: COLORS.dark,
        fontSize: getProportionalFontSize(10),
    },
})