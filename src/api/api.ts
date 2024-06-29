import axios from "axios";

export const POSTER_SIZE_154: string = "https://image.tmdb.org/t/p/w154";
export const POSTER_SIZE_300: string = "https://image.tmdb.org/t/p/w300";
export const POSTER_SIZE_500: string = "https://image.tmdb.org/t/p/w500";

const $api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: process.env.REACT_APP_API_KEY,
    language: "en-US",
  },
});

export default $api;
