import axios from "axios";
import { apiKey } from "../constants";

//endpoint

const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`;
const searchMoviesEndpoint   = `${apiBaseUrl}/search/movie?api_key=${apiKey}`

// dynamic endpoint details

const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`;



// person

export const personDetailsEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`;
export const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`


export const image500 = path => path ? `https://image.tmdb.org/t/p/w500/${path}` : null;
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342/${path}` : null;
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185/${path}` : null;


export const fallbackMoviePoster = "https://img.myloview.com/stickers/white-laptop-screen-with-movie-poster-on-it-400w-152700325.jpg";
export const fallbackPersonImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlCwK3v7Wt7z0O9P2d4YJ2t3UgZ0vBhLXy3A&usqp=CAU";




const apiCall = async (endpoint, params) => {
   const options = {
      method: "GET",
      url: endpoint,
      params: params ? params : {},
   }

   try {
        const response = await axios.request(options);
        return response.data;
   } catch (error) {
    console.log("error", error);
    return {}
   }
}

export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint);
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint);
}

export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint);
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id));
}

export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id));
}

export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id));
}

export const fetchPersonDetails = id => {
    return apiCall(personDetailsEndpoint(id));
}

export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id));
}

export const searchMovies = params => {
    return apiCall(searchMoviesEndpoint, params);
}
