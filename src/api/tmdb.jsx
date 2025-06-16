import axios from "axios";
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/"
const TMDB_API_KEY = import.meta.env.VITE_API_KEY;


if(!TMDB_API_KEY){
   console.error("TMDB API Key is not set! Please check your .env file");
}
const tmdbApi = axios.create({
   baseURL: TMDB_BASE_URL,
   params:{
       api_key: TMDB_API_KEY
   },
});
export default tmdbApi;