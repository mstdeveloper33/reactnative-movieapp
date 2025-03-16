import { View, Text, SafeAreaView, TextInput, TouchableOpacity, ScrollView, TouchableWithoutFeedback ,Image , Dimensions ,Platform } from 'react-native'
import React, { useCallback } from 'react'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import Loading from '../components/loading';
import { searchMovies } from '../api/moviedb';
import { image185 } from '../api/moviedb';
import { fallbackMoviePoster } from '../api/moviedb';

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";


export default function SearchScreen() {
    const [loading , setLoading] = useState(false);
    const navigation = useNavigation();
    const [results, setResults] = useState([]);
    let movieName = "Ant-Man and the Wasp: Quantumania";
    
    const handleSearch = value => {
        if(value && value.length > 2){
            setLoading(true);
            searchMovies(
                {
                    query: value,
                    include_adult: "false",
                    language: "en-US",
                    page : "1",
                }
            ).then(data => {
                setLoading(false);
                if(data && data.results) setResults(data.results);
            })

        }else {
            setLoading(false);
            setResults([]);
        }
        
    }

    const handleTextDebounce = useCallback(
        (value) => {
            handleSearch(value);
    });


  return (
   <SafeAreaView className = "bg-neutral-800 flex-1">
    <View className = "flex-row justify-between items-center mx-4 mb-3 border border-neutral-500 rounded-full">
        <TextInput
        onChangeText={handleTextDebounce}
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
                                           //source={require("../assets/marvel.png")}
                                           source={{ uri: image185(item?.poster_path || fallbackMoviePoster)}}
                                           className="rounded-3xl"
                                           />
                                           <Text className = "text-neutral-300 ml-1">
                                               {item?.title.length>22 ? item?.title.slice(0,22)+"..." : item?.title}
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