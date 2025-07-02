import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {

const dispatch = useDispatch();

  const getMovies = async () => {
    try {
      const apiOptions = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
        },
      };
      const response = await fetch(import.meta.env.VITE_API_URL, apiOptions);
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