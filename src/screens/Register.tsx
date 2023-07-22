
import { Dimensions, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import InputCom from '../components/InputCom'
import ScreenWrapper from '../components/ScreenWrapper'
import ButtonComp from '../components/ButtonComp'
import { COLORS, FONTS, images } from '../assets/assets'
import { getProportionalFontSize, height, heightPercentageToDP, width, widthPercentageToDP } from '../methods/Methods'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { err_obj } from "./Login"

interface err_type {
    email: undefined | err_obj
    password: undefined | err_obj
    name: undefined | err_obj;
    confirmPassword: undefined | err_obj
}

type allKeys = "name" | "email" | "password" | "confirmPassword"

const Register = ({ navigation }) => {
    const initialValue = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    }
    const initialErrObj = {
        name: undefined,
        email: undefined,
        password: undefined,
        confirmPassword: undefined
    }
    const [state, setState] = useState(initialValue);
    const [errors, setErrors] = useState<err_type>(initialErrObj)

    const handleChange = (key: allKeys, value: string) => {
        removeErrorWhenUserIsTyping(key);
        setState({
            ...state,
            [key]: value
        })
    }

    function checkFormValidation() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const { name, email, password, confirmPassword } = state
        let valid = true;
        let obj: err_type = { ...initialErrObj }

        for (let [key] of Object.entries(errors)) {
            if (email && !reg.test(email)) {
                obj.email = {
                    message: "Email is invalid",
                }
                valid = false
            }
            if (password && password.length < 6) {
                obj.password = {
                    message: "Minimum 6 character required",
                }
                valid = false
            }
            if (confirmPassword && password !== confirmPassword) {
                obj.confirmPassword = {
                    message: "password and conform password should be same",
                }
                valid = false
            }

            if (!state[key] || state[key].trim() == '') {
                obj[key] = {
                    message: key + " is required",
                }
                valid = false
            }
        }
        setErrors(obj)
        return valid
    }

    const handleSubmit = () => {
        if (!checkFormValidation()) {
            return
        }
        console.log("form data : ", state)
    }

    function removeErrorWhenUserIsTyping(key: allKeys) {
        let obj_copy = { ...errors }
        if (obj_copy[key] !== initialErrObj[key]) {
            obj_copy[key] = initialErrObj[key]
            setErrors(obj_copy)
        }
    }

    return (
        <ScreenWrapper>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: width,
                    height: height
                }}       >
                    <Image source={images.logo} resizeMode='contain' style={{
                        width: widthPercentageToDP(20),
                        height: heightPercentageToDP(20),
                        tintColor: COLORS.dark,
                        marginTop: -heightPercentageToDP(20),
                    }}
                    />

                    <InputCom
                        label='name'
                        placeholder='Mukesh'
                        value={state.name}
                        onChangeText={(text) => handleChange("name", text)}
                        isValid={errors.name}
                    />

                    <InputCom
                        label='email'
                        placeholder='mukesh@demo.com'
                        value={state.email}
                        keyboardType={"email-address"}
                        onChangeText={(text) => handleChange("email", text)}
                        isValid={errors.email}
                    />

                    <InputCom
                        label='password'
                        placeholder="Quz@90Hh"
                        value={state.password}
                        secureTextEntry={true}
                        onChangeText={(text) => handleChange("password", text)}
                        isValid={errors.password}
                    />

                    <InputCom
                        label='conform password'
                        placeholder="Quz@90Hh"
                        value={state.confirmPassword}
                        secureTextEntry={true}
                        onChangeText={(text) => handleChange("confirmPassword", text)}
                        isValid={errors.confirmPassword}
                    />

                    <ButtonComp title='Register now' onPress={handleSubmit} />

                    <View style={{
                        position: 'absolute',
                        bottom: heightPercentageToDP(5),
                        alignItems: "center"
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")} >
                            <Text style={styles.already}>Already have an account? Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity >
                            <Text style={styles.privacy}>Learn more about our privacy policy</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </KeyboardAwareScrollView>
        </ScreenWrapper>
    )
}

export default Register

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




