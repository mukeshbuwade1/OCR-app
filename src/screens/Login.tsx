import { Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import InputCom from '../components/InputCom'
import ScreenWrapper from '../components/ScreenWrapper'
import ButtonComp from '../components/ButtonComp'
import { COLORS, FONTS, images } from '../assets/assets'
import { getProportionalFontSize, height, heightPercentageToDP, width, widthPercentageToDP } from '../methods/Methods'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import auth from '@react-native-firebase/auth';

const Login = ({ navigation }) => {
    const [state, setState] = useState({
        email: '', password: ""
    })
    const [error, setError] = useState({

    })

    const handleChange = (key: string, value: string) => {
        setState({
            ...state,
            [key]: value
        })
    }
    function checkFormValidation() {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        const { email, password } = state
        let valid = true;
        let obj = new Object()
        if (!email || email.trim() === '') {
            obj.email = {
                message: "Email required",
            }
            valid = false
        } else if (!reg.test(email)) {
            obj.email = {
                message: "Email is invalid",
            }
            valid = false
        }
        if (!password || password.trim() === '') {
            obj.password = {
                message: "Password required",
            }
            valid = false
        } else if (password.length < 6) {

            obj.password = {
                message: "Minimum 6 character required",
            }
            valid = false
        }
        setError(obj)
        return valid
    }

    const handleSubmit = () => {
        if (!checkFormValidation()) {
            return
        }
        // return
        auth()
            .signInWithEmailAndPassword(state.email, state.password)
            .then(() => {
                Alert.alert("logged In")
                console.log('User account created & signed in!');
            })
            .catch(error => {
                console.log('error',error.code);
                if (error.code === 'auth/wrong-password') {
                    console.log('incorrect password');
                }

                if (error.code === 'auth/user-not-found') {
                    console.log('That email address is invalid!');
                }

                console.error(error);
            });
    }
    return (
        <ScreenWrapper >
            <KeyboardAwareScrollView>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: width,
                    height: height
                }}       >
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
                        isValid={error.email} 
                    />

                    <InputCom
                        label='password'
                        placeholder="Quz@90Hh"
                        value={state.password}
                        secureTextEntry={true}
                        onChangeText={(text) => handleChange("password", text)}
                        isValid={error.password} 
                    />

                    <TouchableOpacity style={{
                        width: widthPercentageToDP(80),
                        alignItems: "flex-end"
                    }}>
                        <Text style={styles.forgot}>Forgot Password</Text>
                    </TouchableOpacity>

                    <ButtonComp title='login' onPress={handleSubmit} />

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
                </View>
            </KeyboardAwareScrollView>
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