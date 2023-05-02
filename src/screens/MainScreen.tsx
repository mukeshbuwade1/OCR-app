import { ActivityIndicator, Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';
import ScreenWraper from '../components/ScreenWraper';
import { images } from '../assets/assets';
import ButtonComp from '../components/ButtonComp';
import Loading from '../components/Loading';
import { handleOpenCam, handleOpenImagePic } from '../methods/Methods';
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
                    width: 100, height: 100, marginBottom: 30
                }}
                />
                <Text style={styles.heading}>welcome</Text>
                <Text style={styles.text}>Select image to be converted</Text>

                <ButtonComp style={{}} title='open camera' onPress={handleOpenCam} _text={{}} leftImage={images.aperture} />
                <ButtonComp style={{}} title='select Image' onPress={handleButtonPress} _text={{}} leftImage={images.gallery} />
            </View>
        </ScreenWraper>
    )
}

export default MainScreen

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        justifyContent: 'center',
        alignItems: "center"
    },
    heading: {
        fontSize: 20,
        fontWeight: "700",
        textTransform: "uppercase",
        color: "#fff"
    },
    text: {
        marginVertical: 10,
        fontSize: 14,
        color: "#fff"
    },
    button: {
        marginVertical: 5
    }
})