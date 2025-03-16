import { View, Text, Dimensions, TouchableWithoutFeedback, Image } from 'react-native';
import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/moviedb';

const { width, height } = Dimensions.get("window");

export default function TrendingMovies({data}) {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate("Movie", item);
    };

    return (
        <View className="mb-8">
            <Text className="text-white text-xl mx-4 mb-5">Trending Movies</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => (
                    <MovieCard item={item} handleClick={handleClick} />
                )}
                defaultIndex={1}
                loop
                width={width}
                height={height * 0.4}
                style={{
                    flex: 1,
                    alignItems: 'center',
                }}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.85,
                    parallaxScrollingOffset: width / 2,
                }}
                autoPlay={true}
                autoPlayInterval={5000}
                windowSize={3}
                snapToAlignment="center"
                itemWidth={width * 0.7} // Slide genişliği
                panGestureHandlerProps={{
                    activeOffsetX: [-10, 10],
                }}
            />
        </View>
    );
}

const MovieCard = ({item, handleClick}) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10
            }}>
                <Image
                    //source={require("../assets/marvel.png")}
                    source={{ uri: image500(item.poster_path) }}
                    style={{
                        width: width * 0.6,
                        height: height * 0.4,
                    }}
                    className="rounded-3xl"
                    resizeMode="cover"
                />
            </View>
        </TouchableWithoutFeedback>
    );
};