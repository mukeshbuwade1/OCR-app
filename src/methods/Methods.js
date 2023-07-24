import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import TextRecognition from 'react-native-text-recognition';
import { Dimensions, Platform, PermissionsAndroid, PixelRatio } from 'react-native';
import env from '../env';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

export const { width, height } = Dimensions.get('window');

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
    quality: 1,
    cameraType: 'back',
    selectionLimit: 1,
}
export const handleOpenCam = async () => {
    try {
        let permission = await requestCameraPermission()
        if (permission) {
            const result = await launchCamera(options);
            console.log(result)
            if (result.assets?.[0]?.uri) {
                return result
            }
        } else {
            // alert("permission")
            return {permission:"no"}
        }

    } catch (error) {
        console.log(error)
        return {}

    }
}

export const handleOpenImagePic = async () => {
    try {
        let permission = await requestImageOrStoragePermission()
        console.log("first",permission)
        if (permission) {
            const result = await launchImageLibrary(options)
            console.log(result.assets?.[0]?.uri)
            return result
        } else {
            // alert("permission")
            return {permission:"no"}
        }
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
    } catch (error) {
        console.log("RecognizeText => error in catch", error)

    }
}


export const handleTranslate = async (text, targetLanguage) => {
    const translatedText = await translateText(text, targetLanguage);
    return translatedText;
};

export const translateText = async (text, targetLanguage) => {
    const apiKey = env.GOOGLE_TRANSLATE_API_KEY;
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    const data = {
        q: text,
        target: targetLanguage,
    };
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const json = await response.json();
    return json.data.translations[0].translatedText;
};

async function requestImageOrStoragePermission() {
    let permission = false;
    if (Platform.OS == 'ios') {
        let iosPermission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY)
        // console.log('iosPermission', iosPermission)
        if (iosPermission == RESULTS.DENIED) {
            let iosRequestResult = await request(PERMISSIONS.IOS.PHOTO_LIBRARY)
            // console.log('iosRequestResult', iosRequestResult)
            if (iosRequestResult == RESULTS.GRANTED) {
                permission = true;
            }
        }
        else if (iosPermission == RESULTS.GRANTED) {
            permission = true;
        }
    }
    else {
        try {
            let androidPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES)
            if (!androidPermission) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
                    {
                        title: "image permission",
                        message: "app_needs_access_to_your_image_library",
                        buttonNeutral: "ask_me_later",
                        buttonNegative: "cancel",
                        buttonPositive: "ok"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    permission = true;
                } else {
                    console.log("READ_MEDIA_IMAGES permission denied",granted);
                }
            }
            else if (androidPermission) {
                permission = true;
            }
        } catch (err) {
            console.warn(err);
        }
    }
    // if (!permission)
    //     Alert.showToast(Constants.labels_for_non_react_files.image_permission_not_available)
    return permission;
}



async function requestCameraPermission() {
    let permission = false;
    if (Platform.OS == 'ios') {
        let iosPermission = await check(PERMISSIONS.IOS.CAMERA)
        // console.log('iosPermission', iosPermission)
        if (iosPermission == RESULTS.DENIED) {
            let iosRequestResult = await request(PERMISSIONS.IOS.CAMERA)
            // console.log('iosRequestResult', iosRequestResult)
            if (iosRequestResult == RESULTS.GRANTED) {
                permission = true;
            }
        }
        else if (iosPermission == RESULTS.GRANTED) {
            permission = true;
        }
    }
    else {
        try {
            let androidPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA)
            console.log("permission response", androidPermission)
            if (!androidPermission) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "camera",
                        message: "need camera permission ",
                        buttonNeutral: "ask_me_later",
                        buttonNegative: 'cancel',
                        buttonPositive: 'ok'
                    }
                );
                console.log("first", granted)
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    permission = true;
                } else {
                    console.log("Camera permission denied");
                }
            }
            else if (androidPermission) {
                permission = true;
            }
        } catch (err) {
            console.warn(err);
        }
    }
    // if (!permission)
    // Alert.showToast(Constants.labels_for_non_react_files.camera_permission_not_available)
    return permission;
}

export { requestCameraPermission ,requestImageOrStoragePermission}
