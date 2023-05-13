import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import ScreenWrapper from '../components/ScreenWrapper'
import { images } from '../assets/assets'
import { widthPercentageToDP } from '../methods/Methods'

let temp = [
    {
        image: images._logo,
        result: "testing things"
    },
    {
        image: images._logo,
        result: "testing things"
    },
    {
        image: images._logo,
        result: "testing things"
    },
    {
        image: images._logo,
        result: "testing things"
    },
    {
        image: images._logo,
        result: "testing things"
    },
    {
        image: images._logo,
        result: "testing things"
    },
    {
        image: images._logo,
        result: "testing things"
    },
    {
        image: images._logo,
        result: "testing things"
    },
]

const PreviousScan = () => {
    return (
        <ScreenWrapper>
            {/* <View style={{ position: "relative" }}> */}
            <Header />

            <FlatList
            numColumns={2}
                data={temp}
                renderItem={({ item }) => (
                    <View style={{ width: widthPercentageToDP(45), height: widthPercentageToDP(45), margin: 5, padding: 5, backgroundColor: "white", borderRadius: 5, borderWidth: 1, borderColor: "black" }}>
                        <Image source={item.image} style={{
                            width: "100%",
                            height:"100%"
                        }} />
                    </View>
                )}
            />
            {/* </View> */}
        </ScreenWrapper>
    )
}

export default PreviousScan

const styles = StyleSheet.create({})