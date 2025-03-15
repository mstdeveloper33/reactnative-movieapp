import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback ,Image , Dimensions ,Platform } from 'react-native'
import React from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Loading from '../components/loading';

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";


export default function SearchScreen() {
    const [loading , setLoading] = useState(false);
    const navigation = useNavigation();
    const [results, setResults] = useState([1,2,3,4]);
    let movieName = "Ant-Man and the Wasp: Quantumania";     



  return (
   <SafeAreaView className = "bg-neutral-800 flex-1">
    <View className = "flex-row justify-between items-center mx-4 mb-3 border border-neutral-500 rounded-full">
        <TextInput
        placeholder='Search Movies'
        placeholderTextColor={"lightgray"}
        className = "pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider">
        </TextInput>
        <TouchableOpacity 
        onPress={() => navigation.navigate("Home")}
        className = "rounded-full p-3 m-1 bg bg-neutral-500">
        <XMarkIcon size = "25" color = "white"></XMarkIcon>
        </TouchableOpacity>
    </View>

    {
        loading?(
            <Loading />
        ): 
        
            results.length > 0 ? (
                <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 15}}
                className = "space-y-3">
                   <Text className = "text-white font-semibold ml-1" >Results ({results.length})</Text>
                   <View className = "flex-row justify-between flex-wrap">
                       {
                           results.map((item,index) => {
                               return (
                                   <TouchableWithoutFeedback
                                   key={index}
                                   onPress={() => navigation.navigate("Movie", item)}
                                   >
                                       <View className = "space-y-12 mb-4 pb-6 pr-6">
                                           <Image
                                           style = {{width: width * 0.44, height: height * 0.3}}
                                           source={require("../assets/marvel.png")}
                                           className="rounded-3xl"
                                           />
                                           <Text className = "text-neutral-300 ml-1">
                                               {movieName.length>22 ? movieName.slice(0,22)+"..." : movieName}
                                           </Text>
                                       </View>
           
                                   </TouchableWithoutFeedback>
                               )
                           })
                       }
           
                   </View>
           
               </ScrollView>
            ) : (
                <View className = "flex-row justify-center">
                    <Text className = "text-white text-lg">No results found</Text>
                </View>
            )
        
    
    }





  


   </SafeAreaView>
  )
}