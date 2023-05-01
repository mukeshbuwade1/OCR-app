import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ScreenWraper from '../components/ScreenWraper'
import Header from '../components/Header'

const marginHorizontal = 10
const Result = (props) => {
    const {result}=props.route.params
    return (
        <ScreenWraper>

            <View>
                <Header/>
                <View style={styles.resultContainer}>
                <Text style={styles.tx}>{result}</Text>

                </View>
            </View>
        </ScreenWraper>
    )
}

export default Result

const styles = StyleSheet.create({
    resultContainer:{
        marginTop:30,
        width:Dimensions.get("window").width - (marginHorizontal*2),
        minHeight:100,
        backgroundColor:"#fff",
        marginHorizontal:marginHorizontal,
        padding:15,
        borderRadius:10
    },
    tx:{
        color:"#000"
    }
})