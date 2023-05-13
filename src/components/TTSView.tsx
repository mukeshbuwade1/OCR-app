import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, FONTS, images } from '../assets/assets'
import { getProportionalFontSize, widthPercentageToDP } from '../methods/Methods';
import Tts from 'react-native-tts';
import Clipboard from '@react-native-clipboard/clipboard';

interface props {
    ln?: string,
    text?: string
}



const TTSView = (props: props) => {

    const [voices, setVoices] = useState([]);
    const [ttsStatus, setTtsStatus] = useState('initiliazing');
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [speechRate, setSpeechRate] = useState(0.5);
    const [speechPitch, setSpeechPitch] = useState(1);
    const [
        text,
        setText
    ] = useState('Enter Text like Hello About React');

    const handleSound = () => {
        // Tts.stop();
        // Tts.speak("hello john deo");
        Tts.speak('Hello, world!',
            //  {
            //     androidParams: {
            //       KEY_PARAM_PAN: -1,
            //       KEY_PARAM_VOLUME: 0.5,
            //       KEY_PARAM_STREAM: 'STREAM_MUSIC',
            //     },
            //   }
        );

    }


    // useEffect(() => {
    //     Tts.addEventListener(
    //         'tts-start',
    //         (_event) => setTtsStatus('started')
    //     );
    //     Tts.addEventListener(
    //         'tts-finish',
    //         (_event) => setTtsStatus('finished')
    //     );
    //     Tts.addEventListener(
    //         'tts-cancel',
    //         (_event) => setTtsStatus('cancelled')
    //     );
    //     // Tts.setDefaultRate(speechRate);
    //     // Tts.setDefaultPitch(speechPitch);
    //     // Tts.getInitStatus().then(initTts);
    //     return () => {
    //         Tts.removeEventListener(
    //             'tts-start',
    //             (_event) => setTtsStatus('started')
    //         );
    //         Tts.removeEventListener(
    //             'tts-finish',
    //             (_event) => setTtsStatus('finished'),
    //         );
    //         Tts.removeEventListener(
    //             'tts-cancel',
    //             (_event) => setTtsStatus('cancelled'),
    //         );
    //     };
    // }, []);

    // const initTts = async () => {
    //     const voices = await Tts.voices();
    //     const availableVoices = voices
    //         .filter((v) => !v.networkConnectionRequired && !v.notInstalled)
    //         .map((v) => {
    //             return { id: v.id, name: v.name, language: v.language };
    //         });
    //     let selectedVoice = null;
    //     if (voices && voices.length > 0) {
    //         selectedVoice = voices[0].id;
    //         try {
    //             await Tts.setDefaultLanguage(voices[0].language);
    //         } catch (err) {
    //             //Samsung S9 has always this error:
    //             //"Language is not supported"
    //             console.log(`setDefaultLanguage error `, err);
    //         }
    //         await Tts.setDefaultVoice(voices[0].id);
    //         setVoices(availableVoices);
    //         setSelectedVoice(selectedVoice);
    //         setTtsStatus('initialized');
    //     } else {
    //         setTtsStatus('initialized');
    //     }
    // };
    const copyToClipboard = () => {
        console.log(props.text)
        Clipboard.setString(props?.text||"");
    };

    return (
        <View style={styles.box}>
            <TouchableOpacity
                onPress={handleSound}
                style={{ alignItems: "center", flexDirection: "row" }}
            >
                <Image source={images.volume} alt={"text to speech icon"} style={styles.img} />
                <Text style={styles.Text}   >{props.ln}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={copyToClipboard}>
                <Image source={images.copy} alt={"copy icon"} style={styles.copyImg} />
            </TouchableOpacity>

        </View>
    )
}

export default TTSView

const styles = StyleSheet.create({
    box: {
        width: "100%",
        height: getProportionalFontSize(40),
        backgroundColor: COLORS.overlay_dim,
        paddingHorizontal: widthPercentageToDP(4),
        alignItems: "center", flexDirection: "row", justifyContent: "space-between"
    },
    img: {
        width: getProportionalFontSize(25),
        height: getProportionalFontSize(25),
    },
    copyImg: {
        width: getProportionalFontSize(20),
        height: getProportionalFontSize(20),
        tintColor:COLORS.dark
    },
    Text: {
        color: COLORS.dark,
        fontFamily: FONTS.semiBold,
        fontSize: getProportionalFontSize(12),
        marginLeft: getProportionalFontSize(10)
    }
})








// const readText = async () => {
//     Tts.stop();
//     Tts.speak(text);
// };

// const updateSpeechRate = async (rate) => {
//     await Tts.setDefaultRate(rate);
//     setSpeechRate(rate);
// };

// const updateSpeechPitch = async (rate) => {
//     await Tts.setDefaultPitch(rate);
//     setSpeechPitch(rate);
// };

// const onVoicePress = async (voice) => {
//     try {
//         await Tts.setDefaultLanguage(voice.language);
//     } catch (err) {
//         // Samsung S9 has always this error:
//         // "Language is not supported"
//         console.log(`setDefaultLanguage error `, err);
//     }
//     await Tts.setDefaultVoice(voice.id);
//     setSelectedVoice(voice.id);
// };

// const renderVoiceItem = ({ item }) => {
//     return (
//         <TouchableOpacity
//             style={{
//                 backgroundColor: selectedVoice === item.id ?
//                     '#DDA0DD' : '#5F9EA0',
//             }}
//             onPress={() => onVoicePress(item)}>
//             <Text style={styles.buttonTextStyle}>
//                 {`${item.language} - ${item.name || item.id}`}
//             </Text>
//         </TouchableOpacity>
//     );
// };
