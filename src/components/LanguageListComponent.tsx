import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { language_list } from '../assets/Constant'
interface item{
    name:string
}
const LanguageListComponent = () => {
    const renderItems=({item,index}:{item:item,index:number})=>{
        return<View>
            <Text>{item.name}</Text>
        </View>
    }
    const keyExtractor=(item:item,index:number)=>item.name+index
  return (
    <View>
      <Text>LanguageListComponent</Text>
     
     <FlatList
     data={language_list}
     renderItem={renderItems}
     keyExtractor={keyExtractor}
     />
    </View>
  )
}

export default LanguageListComponent

const styles = StyleSheet.create({})