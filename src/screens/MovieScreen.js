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
import { fallbackMoviePoster, fetchMovieDetails , fetchMovieCredits , fetchSimilarMovies} from '../api/moviedb';
import { image500 } from '../api/moviedb';



var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "" : "mt-3";

export default function MovieScreen() {
   const [loading , setLoading] = useState(false);
  const {params : item} = useRoute();
  const [isFavourite, toggleFavourite] = useState(false);
  const navigation = useNavigation();
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [movie , setMovie] = useState({});
  let movieName = "Ant-Man and the Wasp: Quantumania";
  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);

  }, [item])

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if(data) setMovie(data);
    setLoading(false);
  }

  const getMovieCredits = async (id) => {
    const data = await fetchMovieCredits(id);
    if(data) setCast(data.cast);
    setLoading(false);
  }

  const getSimilarMovies = async (id) => {
    const data = await fetchSimilarMovies(id);
    if(data && data.results) setSimilarMovies(data.results);
    setLoading(false);
  }

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
                // source={require("../assets/marvel.png")}
                source={{ uri: image500(movie?.poster_path || fallbackMoviePoster) }}
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
        <Text className ="text-white text-center text-3xl font-bold tracking-wider>">{movie?.title}</Text>
        {/* Status , release , runtime */}
          {
            movie?.id?(
              <Text className= "text-neutral-400 font-semibold text-base text-center">
              {movie?.status} - {movie?.release_date?.split("-")[0]} - {movie?.runtime} min
            </Text>
            ): null
            
          }
         <View className = "flex-row justify-center space-x-2">
          {/* Genres */}
          {
            movie?.genres?.map((genre, index) => {
              let showDot = index +1 != movie.genres.length;
              return (
                <Text key={index} className= "text-neutral-400 font-semibold text-base text-center">{genre?.name} {showDot && "-"}</Text>
              )
            })
          }
        </View>
        {/* Description */}

            {
                movie?.overview && (
                    <Text className= "text-neutral-400 font-semibold text-base text-center">{movie?.overview}</Text>
                )
            }
        </View>
       {/* Cast */}
       {cast.length > 0 && <Cast navigation={navigation} cast = {cast}/>}
          {/* Similar Movies */}
      {similarMovies.length > 0 && <MovieList title="Similar Movies" data={similarMovies} hideSeeAll={true} />}
        
       
    </ScrollView>
  )
}