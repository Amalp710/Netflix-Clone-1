import { API_KEY } from "./constants/constants";
const timeWindow = 'week'; 

export const originals=`discover/tv?api_key=${API_KEY}&with_networks=213`;
export const actions=`discover/movie?api_key=${API_KEY}&with_genres=28`;
export const comedy=`/discover/movie?api_key=${API_KEY}&with_genre=10749`;
export const horror=`discover/movie?api_key=${API_KEY}&with_genres=27`;
