import { Alert, Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ScreenWrapper from '../components/ScreenWrapper'
import { COLORS, FONTS, images } from '../assets/assets'
import { getProportionalFontSize, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods'
import {  setObjectValue } from '../methods/AsyncMethods'
import { local_store_key } from '../assets/Constant'
import EmptyListComp from '../components/EmptyListComp'
import {  NavigationProp, RouteProp } from '@react-navigation/native'

interface props {
    navigation: NavigationProp<any>,
    route: RouteProp<myRouteData>
}
interface item {
    uri: string, text: string[] | string
}
type myRouteData = {
    params: {
        data?: item[]
    }
}

const PreviousScan: React.FC<props> = ({ navigation, route }) => {
    const { data } = route.params || {}
    const [list, setList] = useState<item[]>(data ?? [])

    const handleDelete = (item: item, index: number) => {
        async function deleteItem() {
            let copy = [...list];
            copy.splice(index, 1);
            let res = await setObjectValue(local_store_key.PREVIOUS_SCAN, { list: copy })
            if (res) {
                setList(copy)

            } else {
                Alert.alert("something went wrong")
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
        <ScreenWrapper style={{
            minHeight:Dimensions.get("window").height
        }}>
            {/* <View style={{ position: "relative" }}> */}
            <Header title={"Previous Scanned image"} />
            {
                list?.length > 0
                    ? <Text style={styles.text}>Alert- only 10 recent copies will be stored here. Upgrade to get more space</Text>
                    : null
            }
            <FlatList
                numColumns={2}
                // columnWrapperStyle={{
                //     justifyContent: "space-around"
                // }}

                contentContainerStyle={{
                    paddingBottom: heightPercentageToDP(2)
                }}
                data={list}
                ListEmptyComponent={EmptyListComp}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Result", { result: item.text })}


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