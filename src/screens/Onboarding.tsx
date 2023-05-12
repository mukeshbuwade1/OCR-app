import { Dimensions, FlatList, Image, ImageSourcePropType, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState, useEffect } from 'react';
import { COLORS, FONTS, images } from '../assets/assets';
import ButtonComp from '../components/ButtonComp';
import { getProportionalFontSize, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods';
import { CommonActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { local_store_key } from '../assets/Constant';
const { width, height } = Dimensions.get("window");

interface item {
  image: ImageSourcePropType,
  title: string,
  info: string
}

const data = [
  {
    image: images.onboardCopy,
    title: "Scan image fast & Easy",
    info: "Turn your photos into text in few clicks, click new image or select existing"
  },
  {
    image: images.onboard2,
    title: "use it anywhere",
    info: "It is now easy to copy result text and use it anywhere you want"
  },
  {
    image: images.onboardCopy,
    title: "Secure forever",
    info: "Your data is yours, we are not store you personal photos or any other data"
  },
]

const Onboarding = () => {
  const navigation = useNavigation()
  const imageList = useRef<FlatList>(null)
  const [scrollOffset, setScrollOffset] = useState<{ index: number, x: number }>({ index: 0, x: 0 })

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(local_store_key.IS_OLD_USER, JSON.stringify({ oldUser: true }))
      } catch (error) {
        console.log(error)
      }
    })()
  }, [])


  function handleButton() {
    if (scrollOffset.index == data.length - 1) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainScreen' }],
        }),
      );
    } else {
      let index = scrollOffset.index + 1;
      imageList.current?.scrollToIndex({ index })
      let x = Math.floor(scrollOffset.x + width);
      setScrollOffset({ index, x })
    }
  }

  const handleScroll = (scrollState: NativeSyntheticEvent<NativeScrollEvent>) => {
    let x_axis = Math.floor(Number(scrollState.nativeEvent.contentOffset.x))
    let w = Math.floor(width)
    if (scrollOffset.x + w == x_axis) {
      setScrollOffset({ index: scrollOffset.index + 1, x: x_axis })
    }
    if (scrollOffset.x - w === x_axis) {
      setScrollOffset({ index: scrollOffset.index - 1, x: x_axis })
    }
  }
  const renderItem: ListRenderItem<item> = ({ item, index }) => {
    return (
      <View style={styles.boxContainer} >
        <Image source={item.image} alt={item.title} style={styles.imageStyle} />
        <Text style={styles.heading}>{item.title}</Text>
        <Text style={styles.text}>{item.info}</Text>
      </View>
    )
  }
  const keyExtractor = (item: item, index: number) => index + item.title
  return (
    <View style={{
      position: "relative", width: width,
      height: height, alignItems: "center", backgroundColor: COLORS.light
    }}>
      <FlatList
        ref={imageList}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        onScroll={handleScroll}
        pagingEnabled
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{ position: "absolute", bottom: 100, zIndex: 99, }}
        horizontal
        data={data}
        renderItem={({ item, index }) => (
          <View style={[styles.dot, { backgroundColor: scrollOffset.index == index ? "#000" : "#aaa" }]} />
        )}
        keyExtractor={keyExtractor}
      />
      <TouchableOpacity
        style={[styles.box]}
        onPress={handleButton}
      >

        <Text
          style={[styles.tx]}
        > {scrollOffset.index == data.length - 1 ? "scan now" : "next"}</Text>
        <Image source={images.right} alt={"next icon"}
          style={[styles.buttonIcon]}
        />
      </TouchableOpacity>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  imageStyle: {

  },
  heading: {
    fontSize: getProportionalFontSize(20),
    textTransform: "capitalize",
    fontFamily: FONTS.bold,
    color: COLORS.dark,
  },
  text: {
    fontFamily: FONTS.medium,
    marginVertical: heightPercentageToDP(2),
    fontSize: getProportionalFontSize(14),
    textAlign: "center",
  },
  boxContainer: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: widthPercentageToDP(5)
  },

  dot: {
    width: widthPercentageToDP(2),
    height: widthPercentageToDP(2),
    borderRadius: getProportionalFontSize(10),
    marginHorizontal: getProportionalFontSize(3)
  },

  box: {
    position: "absolute",
    bottom: heightPercentageToDP(3),
    minWidth: widthPercentageToDP(40),
    height: heightPercentageToDP(5),
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: heightPercentageToDP(5),
    flexDirection: "row",
    elevation: 5,
  },
  tx: {
    textTransform: "uppercase",
    color: COLORS.light,
    fontFamily: FONTS.bold
  },
  buttonIcon: {
    width: widthPercentageToDP(4),
    height: widthPercentageToDP(4),
    tintColor: COLORS.light,
    // marginLeft: getProportionalFontSize(15),
    position: 'absolute',
    right: heightPercentageToDP(1.5),
    top: heightPercentageToDP(1.5),
  }
})