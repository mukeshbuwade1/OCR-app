import { Animated, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { language_list } from '../assets/Constant'
import { getProportionalFontSize, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods'
import { COLORS, FONTS, ZIndex } from '../assets/assets'
import ButtonComp from './ButtonComp'
export interface item {
  name: string,
  code: string,
  id: number
}
interface props {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>,
  langToTrans: item | undefined,
  setLangToTrans: Dispatch<SetStateAction<item | undefined>>,
  onselectLanguage:(item:item)=>void
}
const LanguageListComponent = (props: props) => {

  const overlayRef = useRef(new Animated.Value(0)).current

  useEffect(() => {
    let translate = 0
    if (!props.open) {
      translate = widthPercentageToDP(100)
    }
    Animated.timing(overlayRef, {
      toValue: translate,
      duration: 200,
      useNativeDriver: true
    }).start()
    console.log(translate)
  }, [props.open])

  const renderItems = ({ item, index }: { item: item, index: number }) => {
    return <TouchableOpacity 
    onPress={props.onselectLanguage ? () =>{ props.onselectLanguage(item)} : () => { }}
     style={styles.item_container}>
      <View style={{ ...styles.dot , backgroundColor: props?.langToTrans?.id===item.id ?COLORS.primary:COLORS.transparent}} />
      <Text style={styles.item}>{item.name}</Text>
    </TouchableOpacity>
  }

  const keyExtractor = (item: item, index: number) => item?.id.toString() + index

  const Sort: (arr: item[]) => item[] = (arr) => {
    return arr?.sort((a, b) => {
      let first = a.name.toLocaleLowerCase()
      let second = b.name.toLocaleLowerCase()
      if (first < second) return -1
      return 1
    })
  }

  return (
    <Animated.View style={{ ...styles.screenOverlay, transform: [{ translateX: overlayRef }] }} >
      <Animated.View style={{
        ...styles.filter, transform: [{
          translateX: overlayRef.interpolate({
            inputRange: [0, widthPercentageToDP(100)],
            outputRange: [widthPercentageToDP(40), 0]
          })
        }]
      }}>
        <Text style={[styles.tx]} >Select language</Text>

        <FlatList
          style={{

            // height:heightPercentageToDP(100),
          }}
          contentContainerStyle={{
            // borderWidth:2,
            height: heightPercentageToDP(90)

          }}
          data={Sort(language_list) || []}
          renderItem={renderItems}
          keyExtractor={keyExtractor}
        />

        <ButtonComp
          title='close'
          onPress={() => props.setOpen(false)}
        />
      </Animated.View>
    </Animated.View>
  )
}

export default LanguageListComponent

const styles = StyleSheet.create({
  screenOverlay: {
    position: "absolute",
    top: 0, left: 0,
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(100),
    zIndex: ZIndex.filterOverlay,
    backgroundColor: COLORS.overlay_dim,
  },
  filter: {
    position: "absolute",
    top: 0, left: 0,
    width: widthPercentageToDP(60),
    height: heightPercentageToDP(100),
    zIndex: ZIndex.filter,
    backgroundColor: COLORS.light,
    padding: getProportionalFontSize(25),
    borderTopLeftRadius: getProportionalFontSize(10),
    borderBottomLeftRadius: getProportionalFontSize(10),
  },
  tx: {
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    fontSize: getProportionalFontSize(16)
  },
  item: {
    fontFamily: FONTS.medium,
    color: COLORS.dark,
    textTransform: "capitalize",
    fontSize: getProportionalFontSize(14),
  },
  item_container: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "center",
    padding: getProportionalFontSize(4),
  },
  dot: {
    width: widthPercentageToDP(2),
    height: widthPercentageToDP(2),
   borderRadius:10,
   marginRight:5,
  }
})