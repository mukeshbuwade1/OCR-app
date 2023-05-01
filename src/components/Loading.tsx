import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get("window")

const Loading = () => {
    return (
        <View style={{
            width: width, height: height,
            position: "absolute",
            backgroundColor: "#000d",
            zIndex: 99,
            justifyContent: "center", alignItems: "center",
            flexDirection:"row"
        }}>
            <Text style={{
                color: "#fff",
                fontSize: 20
            }}>Processing
            </Text>
            <ActivityIndicator style={{
                marginLeft:15
            }} color={'#fff'} />
        </View>
    )
}

export default Loading
