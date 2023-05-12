import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';
import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 360;
const guidelineBaseHeight = 760;
const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export function getProportionalFontSize(baseFontSize) {
    var intialFontSize = baseFontSize || 14;
    // if (Platform.OS === 'ios') {
    // heightPercentageToDP(fontSizeToReturn );
    // }
    var fontSizeToReturnModerate = moderateScale(intialFontSize);
    var fontSizeToReturnVertical = verticalScale(intialFontSize);
    return Platform.OS == 'ios'
        ? fontSizeToReturnModerate
        : fontSizeToReturnVertical;
}


/**
 * Converts provided width percentage to independent pixel (dp).
 * @param  {string|number} widthPercent The percentage of screen's width that UI element should cover
 *                               along with the percentage symbol (%).
 * @return {number}              The calculated dp depending on current device's screen width.
 */
export const widthPercentageToDP = widthPercent => {
    // Parse string percentage input and convert it to number.
    const elemWidth = typeof widthPercent === "number" ? widthPercent : parseFloat(widthPercent);

    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(width * elemWidth / 100);
};

/**
 * Converts provided height percentage to independent pixel (dp).
 * @param  {string|number} heightPercent The percentage of screen's height that UI element should cover
 *                                along with the percentage symbol (%).
 * @return {number}               The calculated dp depending on current device's screen height.
 */
export const heightPercentageToDP = heightPercent => {
    // Parse string percentage input and convert it to number.
    const elemHeight = typeof heightPercent === "number" ? heightPercent : parseFloat(heightPercent);

    // Use PixelRatio.roundToNearestPixel method in order to round the layout
    // size (dp) to the nearest one that correspons to an integer number of pixels.
    return PixelRatio.roundToNearestPixel(height * elemHeight / 100);
};

let options = {
    saveToPhotos: true,
    mediaType: 'photo',
}
export const handleOpenCam = async () => {
    try {
        const result = await launchCamera(options);
        console.log(result)
        if (result.assets?.[0]?.uri) {
            return result
            // console.log("PROCESSING..........")
            // const text = await TextRecognition.recognize(result.assets?.[0].uri);
            // console.log("DONE..........", text)
            // setTextFromImage(text[0])
            // navigation.navigate("Result", { result: text[0] })

        }
        return{}

    } catch (error) {
        console.log(error)
        return {}

    }
}


export const handleOpenImagePic = async () => {
    try {
        const result = await launchImageLibrary(options)
        console.log(result.assets?.[0]?.uri)
        return result
    } catch (error) {
        console.log(error)
        return {}
    }
}

export async function RecognizeText(uri) {
    try {
        const textRes = await TextRecognition.recognize(uri);
        console.log("textr", textRes)
        return textRes
        // navigation.navigate("Result", { result: text[0] })
    } catch (error) {
        console.log("RecognizeText => error in catch", error)

    }
}

