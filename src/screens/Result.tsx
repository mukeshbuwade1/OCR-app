import { ActivityIndicator, Button, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/ScreenWrapper'
import Header from '../components/Header'
import Clipboard from '@react-native-clipboard/clipboard';
import { COLORS, FONTS, images } from '../assets/assets';
import ButtonComp from '../components/ButtonComp';
import { getProportionalFontSize, handleTranslate, heightPercentageToDP, widthPercentageToDP } from '../methods/Methods';
import LanguageListComponent, { item } from '../components/LanguageListComponent';
import TTSView from '../components/TTSView';
const { width, height } = Dimensions.get("window")

const marginHorizontal = widthPercentageToDP(2.5)
const Result: (props: any) => JSX.Element = (props) => {
    const [open, setOpen] = useState<boolean>(false)
    const [trLoader, setTrLoader] = useState<boolean>(false)
    const [langToTrans, setLangToTrans] = useState<item | undefined>()
    const [translatedText, setTranslatedText] = useState<string | undefined>()

    let { result } = props?.route?.params || {};
    if (!result) {
        result = "No text Found";
    }
    if (Array.isArray(result)) {
        result = result.join(' ')
    }

    const copyToClipboard = () => {
        Clipboard.setString(result);
    };



    const onselectLanguage = async (item: item) => {
        setLangToTrans(item)
        setOpen(false)
        setTrLoader(true)
        const _result = await handleTranslate(result, item.code);
        setTrLoader(false)
        setTranslatedText(_result);
    }
    return (
        <ScreenWrapper>
            <View style={{ position: "relative" ,minWidth: width, minHeight: height,}}>

                <Header />

                <LanguageListComponent
                    open={open} setOpen={setOpen}
                    langToTrans={langToTrans} setLangToTrans={setLangToTrans}
                    onselectLanguage={onselectLanguage}
                />

                <View style={styles.transBtnWrapper}>

                    <ButtonComp
                        style={styles.transBtn}
                        title='English'
                        _text={styles.transBtnTx}
                    />

                    <Image source={images.transfer} alt={"transfer"}
                        style={[styles.transferIcon]}
                    />

                    <ButtonComp
                        style={styles.transBtn}
                        title={langToTrans?.id ? langToTrans?.name : 'translate'}
                        onPress={() => setOpen(true)}
                        _text={styles.transBtnTx}
                        leftImage={images.translator}
                    />
                </View>

                <View style={styles.resultContainer}>
                    <TTSView text={result} ln={"English"} />
                    <Text selectable={true} style={styles.tx}>{result}</Text>
                </View>
                {
                    (langToTrans?.id && result) && <View style={styles.resultContainer}>
                        {
                            trLoader
                                ? <View style={styles.trBoxLoader}>
                                    <ActivityIndicator size={"small"} color={COLORS.light} />
                                    <Text style={styles.loaderText} >Translating</Text>
                                </View>
                                : <>
                                    <TTSView text={translatedText} ln={langToTrans?.name} />
                                    <Text selectable={true} style={styles.tx}>{translatedText}</Text>
                                </>
                        }

                    </View>
                }

            </View>
         
        </ScreenWrapper>
    )
}

export default Result

const styles = StyleSheet.create({
    trBoxLoader: {
        width: widthPercentageToDP(100) - (marginHorizontal * 2),
        minHeight: heightPercentageToDP(15),
        position: 'absolute',
        backgroundColor: COLORS.overlay,
        justifyContent: "center", alignItems: "center",
    },
    loaderText: {
        color: COLORS.light,
        fontFamily: FONTS.medium,
        fontSize: getProportionalFontSize(10)
    },
    resultContainer: {
        overflow: "hidden",
        marginTop: heightPercentageToDP(1),
        width: widthPercentageToDP(100) - (marginHorizontal * 2),
        minHeight: heightPercentageToDP(15),
        backgroundColor: COLORS.light,
        marginHorizontal: marginHorizontal,
        borderRadius: 10
    },
    tx: {
        margin: widthPercentageToDP(4),
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
    },
    transferIcon: {
        width: getProportionalFontSize(20),
        height: getProportionalFontSize(20),
        tintColor: COLORS.light
    },
    transBtn: {
        width: widthPercentageToDP(30),
        paddingHorizontal: widthPercentageToDP(3),
        marginTop: 0
    },
    transBtnTx: {
        textTransform: "capitalize",
        fontFamily: FONTS.semiBold,
    },
    transBtnWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: marginHorizontal,
        paddingVertical: heightPercentageToDP(2.5)

    }
})

