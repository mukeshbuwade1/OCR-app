import { ActivityIndicator, Button, Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';
import ScreenWraper from '../components/ScreenWraper';
import { images } from '../assets/assets';
import ButtonComp from '../components/ButtonComp';
import Loading from '../components/Loading';
// import 
const MainScreen = ({navigation}) => {
    const [textFromImage, setTextFromImage] = React.useState<string>('')
    const [loading, setLoading] = React.useState<boolean>(false)

    let options = {
        saveToPhotos: true,
        mediaType: 'photo',
    }
    const handleOpenImagePic = async () => {
        setLoading(true)

        try {
            const result = await launchImageLibrary(options)
            console.log(result)
            if (result.assets?.[0]?.uri) {
                const text = await TextRecognition.recognize(result.assets?.[0].uri);
                setTextFromImage(text[0])
                navigation.navigate("Result",{result:text[0]})
            }
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)

        }
    }

    const handleOpenCam = async () => {
        try {
            const result = await launchCamera(options);
            console.log(result)
            if (result.assets?.[0]?.uri) {
                console.log("PROCESSING..........")
                const text = await TextRecognition.recognize(result.assets?.[0].uri);
                console.log("DONE..........", text)
                setTextFromImage(text[0])
                navigation.navigate("Result",{result:text[0]})

            }
            setLoading(false)

        } catch (error) {
            console.log(error)
            setLoading(false)

        }
    }
    return (
        <ScreenWraper>
            {
               loading? <Loading/>:null
            }
            <View style={styles.container}>
                <Image source={images.logo} resizeMode='contain' style={{
                    width: 100, height: 100, marginBottom: 30
                }}
                />
                <Text style={styles.heading}>welcome</Text>
                <Text style={styles.text}>select image to be converted</Text>

                <ButtonComp style={{}} title='open camera' onPress={handleOpenCam} _text={{}} leftImage={images.aperture} />
                <ButtonComp style={{}} title='select Image' onPress={handleOpenImagePic} _text={{}} leftImage={images.gallery} />
               
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