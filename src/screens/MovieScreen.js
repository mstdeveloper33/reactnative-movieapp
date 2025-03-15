import { View, Text, ScrollView, Platform, Image, TouchableOpacity ,Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../theme';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import Loading from '../components/loading';



var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
   const [loading , setLoading] = useState(false);
  const {params : item} = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([1,2,3,4,5]);
  const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5]);
  let movieName = "Ant-Man and the Wasp: Quantumania";
  useEffect(() => {
    
  }, [item])

  return (
    <ScrollView
    contentContainerStyle = {{paddingBottom: 20}}
       className = "flex-1 bg-neutral-900" 
    
    >
      <View className = "w-full">
        <SafeAreaView className= {"absolute  z-20 w-full flex-row justify-between items-center px-4" + topMargin}>
          <TouchableOpacity onPress={() => navigation.goBack()}   style = {styles.background} className="rounded-xl p-1">
            <ChevronLeftIcon size={28} strokeWidth={2.5} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} >
            <HeartIcon size={35} color={isFavourite ? theme.background : "white"} strokeWidth={2.5} />
          </TouchableOpacity>
        </SafeAreaView>

        {
            loading?(
                <Loading />
            ): (
              <View>
              <Image
                source={require("../assets/marvel.png")}
                style={{
                  width,
                  height: height * 0.55,
                }}
                />
                <LinearGradient
                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                style={{height: height * 0.40 , width: width}}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                className = "absolute bottom-0"
                />
            </View>
            )
        }


       
      </View>

      <View style= {{marginTop: -(height * 0.4)}} className= "space-y-3">
        {/* Title */}
        <Text className ="text-white text-center text-3xl font-bold tracking-wider>">{movieName}</Text>
        {/* Status , release , runtime */}
        <Text className= "text-neutral-400 font-semibold text-base text-center">
          Released - 2020 - 170 min
        </Text>
        {/* Genres */}
        <View className = "flex-row justify-center space-x-2">
          <Text className = "text-neutral-400 font-semibold text-base text-center">Action |</Text>
          <Text className = "text-neutral-400 font-semibold text-base text-center"> Adventure |</Text>
          <Text className = "text-neutral-400 font-semibold text-base text-center"> Comedy</Text>
        </View>
        {/* Description */}
        <View>
          <Text className = "text-neutral-400 mx-4 tracking-wide">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, voluptas.</Text> 
          </View> 
          {/* Cast */}
          <Cast navigation={navigation} cast = {cast}/>
          <MovieList title = "Similar Movies" hideSeeAll={true} data={similarMovies} />
      </View>
        
       
    </ScrollView>
  )
}