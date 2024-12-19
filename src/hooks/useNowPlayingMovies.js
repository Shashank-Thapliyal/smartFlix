import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {

const dispatch = useDispatch();

  const getMovies = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, JSON.parse(import.meta.env.VITE_API_OPTIONS));
      const data = await response.json();
      dispatch(addNowPlayingMovies(data.results));
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

}

export default useNowPlayingMovies