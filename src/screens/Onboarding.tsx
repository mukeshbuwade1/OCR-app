import { Dimensions, FlatList, Image, ImageSourcePropType, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react';
import { images } from '../assets/assets';
import ButtonComp from '../components/ButtonComp';
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
    image: images.onboardCopy,
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
  const imageList = useRef<FlatList>(null)
  const [scrollOffset, setScrollOffset] = useState<{ index: number, x: number }>({ index: 0, x: 0 })


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
      height: height, alignItems: "center"
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
      // onPress={onPress}
      >
        {/* <Image source={leftImage} alt={title}
                style={[styles.buttonIcon,imageStyle]}
            /> */}

        <Text
          style={[styles.tx]}
        >{"next"}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Onboarding

const styles = StyleSheet.create({
  imageStyle: {

  },
  heading: {
    fontSize: 20,
    fontWeight: "700",
    textTransform: "capitalize",
    // color: "#fff"
  },
  text: {
    marginVertical: 10,
    fontSize: 14,
    textAlign: "center",
    color: "#000",
    fontWeight:"500",
  },
  boxContainer: {
    width: width,
    height: height,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 3
  },


  // *************image***********************
  box: {
    position: "absolute",
    bottom: 20,
    // left: width / 3.3,

    minWidth: 150,
    backgroundColor: "#1CFFC9",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flexDirection: "row",
    paddingHorizontal: 30,
    marginTop: 20,
    elevation: 5
  },
  tx: {
    textTransform: "uppercase",
    color: "#000",
    fontWeight: "700"
  },
  buttonIcon: {
    width: 20,
    height: 20,
    marginRight: 20,
    tintColor: "#000"
  }
  // *************image***********************
})