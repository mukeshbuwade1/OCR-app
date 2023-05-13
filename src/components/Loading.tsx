import {  Text, View,  ActivityIndicator } from 'react-native'
import React from 'react'
import { getProportionalFontSize, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods'
import { COLORS, ZIndex } from '../assets/assets'

const Loading = () => {
    return (
        <View style={{
            width: widthPercentageToDP(100),
             height: heightPercentageToDP(100),
            position: "absolute",
            backgroundColor: COLORS.overlay,
            zIndex: ZIndex.loader,
            justifyContent: "center", alignItems: "center",
            flexDirection:"row"
        }}>
            <Text style={{
                color:COLORS.light,
                fontSize: getProportionalFontSize(20)
            }}>Processing
            </Text>
            <ActivityIndicator style={{
                marginLeft:15
            }} color={COLORS.light} />
        </View>
    )
}

export default Loading
