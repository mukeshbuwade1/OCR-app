import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ScreenWraper from '../components/ScreenWraper'
import Header from '../components/Header'
import Clipboard from '@react-native-clipboard/clipboard';
import { images } from '../assets/assets';
import ButtonComp from '../components/ButtonComp';

const marginHorizontal = 10
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
        marginTop: 30,
        width: Dimensions.get("window").width - (marginHorizontal * 2),
        minHeight: 100,
        backgroundColor: "#fff",
        marginHorizontal: marginHorizontal,
        padding: 15,
        borderRadius: 10
    },
    tx: {
        color: "#000"
    },

    box: {
        position: "absolute",
        bottom: 30,
        right: 20,
        minWidth: 100,
        paddingHorizontal: 20,
    },
    buttonIcon: {
        width: 15,
        height: 15,
        marginRight: 10,
    },
    btnTx: {
        textTransform: "capitalize",

    }
})