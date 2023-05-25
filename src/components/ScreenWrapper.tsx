import { Dimensions, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '../assets/assets'
const { width, height } = Dimensions.get("window")
const ScreenWrapper:(props:any)=>JSX.Element = (props) => {
    return (
        <SafeAreaView>
            <ImageBackground source={images.AppBg} resizeMode='cover' style={{
                width: width, height: height,...props.style
            }} >
                {props.children}    
            </ImageBackground>
       </SafeAreaView>
    )
}

export default ScreenWrapper

const styles = StyleSheet.create({})