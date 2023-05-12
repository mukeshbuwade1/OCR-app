import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWraper from '../components/ScreenWraper'
import Header from '../components/Header'
import Clipboard from '@react-native-clipboard/clipboard';
import { COLORS, FONTS, images } from '../assets/assets';
import ButtonComp from '../components/ButtonComp';
import { heightPercentageToDP, widthPercentageToDP } from '../methods/Methods';
import LanguageListComponent from '../components/LanguageListComponent';

const marginHorizontal = widthPercentageToDP(2.5)
const Result: (props: any) => JSX.Element = (props) => {
    let { result } = props.route.params;
    if (!result) {
        result = "";
    }
    if (Array.isArray(result)) {
        result = result.join(' ')
    }
    const copyToClipboard = () => {
        Clipboard.setString(result);
    };
    return (
        <ScreenWraper>
            <View>
                <Header />

                {/* <LanguageListComponent  /> */}


                <View style={styles.resultContainer}>
                    <Text selectable={true} style={styles.tx}>{result}</Text>
                </View>
            </View>

            <ButtonComp style={styles.box} title='copy'
                onPress={copyToClipboard}
                // _text={styles.btnTx}
                leftImage={images.copy}
                imageStyle={styles.buttonIcon}
            />

        </ScreenWraper>
    )
}

export default Result

const styles = StyleSheet.create({
    resultContainer: {
        marginTop: heightPercentageToDP(3),
        width: widthPercentageToDP(100) - (marginHorizontal * 2),
        minHeight: heightPercentageToDP(15),
        backgroundColor: COLORS.light,
        marginHorizontal: marginHorizontal,
        padding: widthPercentageToDP(4),
        borderRadius: 10
    },
    tx: {
        color: COLORS.dark,
        fontFamily: FONTS.medium
    },

    box: {
        position: "absolute",
        bottom: heightPercentageToDP(3.5),
        right: widthPercentageToDP(5),
        minWidth: widthPercentageToDP(25),
        paddingHorizontal: widthPercentageToDP(5),
    },
    buttonIcon: {
        width: widthPercentageToDP(4),
        height: widthPercentageToDP(4),
        marginRight: widthPercentageToDP(2.5),
    },
    btnTx: {
        fontFamily: FONTS.bold
    }
})