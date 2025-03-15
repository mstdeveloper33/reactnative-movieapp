import { View, Text ,Image, Dimensions , Platform, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import {ChevronLeftIcon} from 'react-native-heroicons/outline';
import {HeartIcon} from 'react-native-heroicons/solid';
import { useState } from 'react';
import { styles, theme } from '../theme';
import MovieList from '../components/movieList';
import Loading from '../components/loading';


var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : "my-3";

export default function PersonScreen() {
     const [loading , setLoading] = useState(false);
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [personMovies, setPersonMovies] = useState([1,2,3,4,5]);
  return (
  <ScrollView className = "flex-1 bg-neutral-900" contentContainerStyle = {{paddingBottom: 20}}>
    <SafeAreaView className= {" z-20 w-full flex-row justify-between items-center px-4" + verticalMargin}>
        <TouchableOpacity onPress={() => navigation.goBack()} style = {styles.background} className = "rounded-xl p-1" >
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white"/>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} >
            <HeartIcon size={35} color={isFavourite ? "red" : "white"} strokeWidth={2.5} />
        </TouchableOpacity>
        </SafeAreaView>

        {/* Person Details */}

        {
            loading?(
                <Loading />
            ): (
                <View>
        <View className = "flex-row justify-center"
        style={{
            shadowColor : "gray",
            shadowOffset : {
                width: 0,
                height: 5
            },
            shadowOpacity: 1,
            shadowRadius: 40,
    
        }}>
            <View className = "items-center rounded-full overflow-hidden h-72 w-72  border bg-neutral-500">
            <Image
            source={require("../assets/marvel.png")}
            style={{
                height: height * 0.43, width: width*0.74
            }}
            className = "rounded-3xl"
            />
           </View>
        </View>

        <View className = "mt-6">
            <Text className = "text-white text-3xl fond-bold text-center">Keanu Reeves</Text>
            <Text className = "text-base text-neutral-500 text-center">London, United Kingdom</Text>
        </View>
        <View className = "mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-3xl">
            <View className = "border-r-2 border-neutral-400 px-2 items-center">
                <Text className = "text-white font-bold">Gender</Text>
                <Text className = "text-neutral-300 text-sm">Male</Text>
            </View>
            <View className = "border-r-2 border-neutral-400 px-2 items-center">
                <Text className = "text-white font-bold">Birthday</Text>
                <Text className = "text-neutral-300 text-sm">1964-09-02</Text>
            </View>
            <View className = "border-r-2 border-neutral-400 px-2 items-center">
                <Text className = "text-white font-bold">Known For</Text>
                <Text className = "text-neutral-300 text-sm">Action</Text>
            </View>
            <View className = "px-2 items-center">
                <Text className = "text-white font-bold">Popularity</Text>
                <Text className = "text-neutral-300 text-sm">64.23</Text>
            </View>
        </View>
        <View className = "my-6 mx-4 space-y-2">
                <Text className = "text-white text-lg">Biography</Text>
                <Text className = "text-neutral-400 tracking-wide ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quae.
                </Text>
            </View>
            {/* Movies List */}
            <MovieList title = "Movies" hideSeeAll={true} data = {personMovies} />

        </View>
    
            )
        }



    </ScrollView>
  )
}