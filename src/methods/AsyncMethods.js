import AsyncStorage from "@react-native-async-storage/async-storage"
import { constant, local_store_key } from "../assets/Constant"

export const getMyObject = async (key) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        // read error
        console.log("ERROR IN CATCH", e)
    }
    console.log('Done.')
}


export const setObjectValue = async (key, value) => {
    
    try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem(key, jsonValue)
        return true
    } catch (e) {
        // save error
        console.log("ERROR IN CATCH", e)
        return false

    }

    console.log('Done.')
}