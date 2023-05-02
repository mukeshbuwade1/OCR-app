import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';

let options = {
    saveToPhotos: true,
    mediaType: 'photo',
}
export const handleOpenCam = async () => {
    try {
        const result = await launchCamera(options);
        console.log(result)
        if (result.assets?.[0]?.uri) {
            console.log("PROCESSING..........")
            const text = await TextRecognition.recognize(result.assets?.[0].uri);
            console.log("DONE..........", text)
            setTextFromImage(text[0])
            navigation.navigate("Result", { result: text[0] })

        }
        setLoading(false)

    } catch (error) {
        console.log(error)
        setLoading(false)

    }
}


export const handleOpenImagePic = async () => {
    try {
        const result = await launchImageLibrary(options)
        console.log(result.assets?.[0]?.uri)
        if (result.assets?.[0]?.uri) {
            let text = await RecognizeText(result.assets?.[0]?.uri)
            return text
        }
        

    } catch (error) {
        console.log(error)
    }
}

export async function RecognizeText(uri) {
    try {
        const textRes = await TextRecognition.recognize(uri);
        console.log("textr", textRes)
        return textRes
        // navigation.navigate("Result", { result: text[0] })
    } catch (error) {
        console.log("RecognizeText => error in catch",error)

    }
}

