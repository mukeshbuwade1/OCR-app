import { ActivityIndicator, Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';
import ScreenWrapper from '../components/ScreenWrapper';
import { COLORS, FONTS, images } from '../assets/assets';
import ButtonComp from '../components/ButtonComp';
import Loading from '../components/Loading';
import { RecognizeText, getProportionalFontSize, handleOpenCam, handleOpenImagePic, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { getMyObject, setObjectValue } from '../methods/AsyncMethods';
import { constant, local_store_key } from '../assets/Constant';
// import 
const MainScreen = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
    const [loading, setLoading] = React.useState<boolean>(false)
    const [allScan, setAllScan] = React.useState<[]>([])
    async function OCR(uri: string) {
        setLoading(true)
        let res = await RecognizeText(uri)
        if (res) {
            let arr = [{ uri: uri, text: res }, ...allScan]
            if (constant.async_length && arr.length>constant.async_length) {
                arr.length = constant.async_length
            }
            let obj = { list: arr }
            await setObjectValue(local_store_key.PREVIOUS_SCAN, obj)
            navigation.navigate("Result", { result: res })
        } else {
            console.log("ERROR FROM OCR")
        }
        setLoading(false)
    }

    const handleButtonPress = async (cam: boolean) => {
        let img_res
        if (cam) {
            img_res = await handleOpenCam();
        } else {
            img_res = await handleOpenImagePic();
        }
        if (img_res?.assets?.[0]?.uri) {
            OCR(img_res?.assets?.[0]?.uri)
        } else {
            console.log("ERROR WHEN PICK IMAGE")
        }

    }

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', async () => {
            let res = await getMyObject(local_store_key.PREVIOUS_SCAN)

            if (res?.list && Array.isArray(res.list))
                setAllScan(res.list)
            console.log("get", res)

        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;


    }, [navigation])
    return (
        <ScreenWrapper>
            {
                loading ? <Loading /> : null
            }
            <View style={styles.container}>
                <Image source={images.logo} resizeMode='contain' style={{
                    width: widthPercentageToDP(30), height: heightPercentageToDP(20), marginBottom: heightPercentageToDP(3)
                }}
                />
                <Text style={styles.heading}>welcome</Text>
                <Text style={styles.text}>Import an image to be converted</Text>

                <ButtonComp style={styles.bw} title='open camera' onPress={() => handleButtonPress(true)} _text={{}} leftImage={images.aperture} />
                <ButtonComp style={styles.bw} title='select Image' onPress={() => handleButtonPress(false)} _text={{}} leftImage={images.gallery} />
                <ButtonComp style={styles.bw} title=' previous     ' onPress={() => navigation.navigate("PreviousScan", { data: allScan })} _text={{}} leftImage={images.gallery} />
            </View>
        </ScreenWrapper>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    bw: {
        width: widthPercentageToDP(60),
    },
    container: {
        width: widthPercentageToDP(100),
        height: heightPercentageToDP(100),
        justifyContent: 'center',
        alignItems: "center"
    },
    heading: {
        fontSize: getProportionalFontSize(20),
        textTransform: "uppercase",
        color: COLORS.light,
        fontFamily: FONTS.bold,
        letterSpacing: 2
    },
    text: {
        fontFamily: FONTS.medium,
        marginVertical: 10,
        fontSize: getProportionalFontSize(12),
        color: COLORS.light
    },
    button: {
        marginVertical: 5
    }
})