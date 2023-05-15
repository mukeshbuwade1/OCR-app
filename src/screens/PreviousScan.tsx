import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ScreenWrapper from '../components/ScreenWrapper'
import { COLORS, FONTS, images } from '../assets/assets'
import { getProportionalFontSize, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods'
import { getMyObject, setObjectValue } from '../methods/AsyncMethods'
import { local_store_key } from '../assets/Constant'

let temp = [
    {
        uri: images._logo,
        text: "testing things"
    },
    {
        uri: images._logo,
        text: "testing things"
    },
    {
        uri: images._logo,
        text: "testing things"
    },
    {
        uri: images._logo,
        text: "testing things"
    },
    {
        uri: images._logo,
        text: "testing things"
    },
    {
        uri: images._logo,
        text: "testing things"
    },
    {
        uri: images._logo,
        text: "testing things"
    },
    {
        uri: images._logo,
        text: "testing things"
    },
]


const PreviousScan = (props) => {
    const { data } = props.route.params || {}
    const [list, setList] = useState(data ?? temp)

    const handleDelete = (item, index) => {
        async function deleteItem() {
            let copy = [...list];
            copy.splice(index, 1);
            let res = await setObjectValue(local_store_key.PREVIOUS_SCAN, { list: copy })
            if (res) {
                setList(copy)

            } else {
                Alert.alert("somthing went wrong")
            }
        }

        Alert.alert('Hold On!', 'Do you want to delete', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'OK', onPress: deleteItem },
        ]);

    }

    return (
        <ScreenWrapper>
            {/* <View style={{ position: "relative" }}> */}
            <Header title={"Previous Scaned image"} />
            <Text style={styles.text}>Alert- only 10 recent copies will be stored here. Upgrade to get more space</Text>
            <FlatList
                numColumns={2}
                // columnWrapperStyle={{
                //     justifyContent: "space-around"
                // }}
               
                contentContainerStyle={{
                    paddingBottom:heightPercentageToDP(2)
                }}
                data={list}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate("Result", { result: item.text })}
                        style={{
                            ...styles.item,
                            // marginRight:index%2==0?0:widthPercentageToDP(2)
                        }}>
                        <TouchableOpacity
                            style={styles.delete}
                            onPress={() => handleDelete(item, index)}
                        >
                            <Image source={images.delete}
                                style={{
                                    width: widthPercentageToDP(4),
                                    height: widthPercentageToDP(4),
                                    tintColor: COLORS.dark,

                                }}
                                resizeMode='contain'
                                alt='delete'
                            />

                        </TouchableOpacity>
                        <Image source={{ uri: item.uri }}
                            style={{
                                zIndex: 9,
                                width: "100%",
                                height: "100%",
                            }}
                            resizeMode='contain'
                            alt='scan'
                        />
                    </TouchableOpacity>
                )}
            />
            {/* </View> */}
        </ScreenWrapper>
    )
}

export default PreviousScan

const styles = StyleSheet.create({
    item: {
        width: widthPercentageToDP(47),
        height: widthPercentageToDP(45),
        marginLeft: widthPercentageToDP(2),
        marginTop: widthPercentageToDP(2),
        padding: getProportionalFontSize(5),
        backgroundColor: COLORS.light,
        borderRadius: 5, borderWidth: 1,
        borderColor: COLORS.dark,
        position: "relative"
    },
    delete: {
        position: "absolute",
        top: widthPercentageToDP(2.5),
        right: widthPercentageToDP(2.5),
        backgroundColor: COLORS.overlay_dim,
        borderRadius: widthPercentageToDP(10),
        zIndex: 10,
        justifyContent: "center", alignItems: "center",
        width: widthPercentageToDP(8),
        height: widthPercentageToDP(8),
    },
    text: {
        color: COLORS.dark,
        fontFamily: FONTS.semiBold,
        fontSize: getProportionalFontSize(13),
        margin: widthPercentageToDP(2)
    }
})