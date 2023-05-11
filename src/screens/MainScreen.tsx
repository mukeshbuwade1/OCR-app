import { ActivityIndicator, Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';
import ScreenWraper from '../components/ScreenWraper';
import { COLORS, FONTS, images } from '../assets/assets';
import ButtonComp from '../components/ButtonComp';
import Loading from '../components/Loading';
import { getProportionalFontSize, handleOpenCam, handleOpenImagePic, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
// import 
const MainScreen = ({navigation}:{navigation:NavigationProp<ParamListBase>}) => {
    const [loading, setLoading] = React.useState<boolean>(false)
    const handleButtonPress =async () => {
        setLoading(true)
        let res = await handleOpenImagePic();
        if(res){
            navigation.navigate("Result", { result:res })
        }
        setLoading(false)

    }
    return (
        <ScreenWraper>
            {
                loading ? <Loading /> : null
            }
            <View style={styles.container}>
                <Image source={images.logo} resizeMode='contain' style={{
                    width:widthPercentageToDP(30), height: heightPercentageToDP(20), marginBottom: heightPercentageToDP(3)
                }}
                />
                <Text style={styles.heading}>welcome</Text>
                <Text style={styles.text}>Import an image to be converted</Text>

                <ButtonComp style={{}} title='open camera' onPress={handleOpenCam} _text={{}} leftImage={images.aperture} />
                <ButtonComp style={{}} title='select Image' onPress={handleButtonPress} _text={{}} leftImage={images.gallery} />
            </View>
        </ScreenWraper>
    )
}

export default MainScreen

const styles = StyleSheet.create({
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
        fontFamily:FONTS.bold,
        letterSpacing:2
    },
    text: {
        fontFamily:FONTS.medium,
        marginVertical: 10,
        fontSize: getProportionalFontSize(12),
        color:COLORS.light
    },
    button: {
        marginVertical: 5
    }
})