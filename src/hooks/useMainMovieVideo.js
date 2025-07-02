// Desc: Custom hook to fetch the main movie 

import { useEffect, useState } from "react";

const useMainMovieVideo = (movieId) => {
    const [videoData, setVideoData] = useState(null);
  const getMainMovieVideo = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_MAIN_MOVIE_URL +
          movieId +
          "/videos?language=en-US",
        JSON.parse(import.meta.env.VITE_API_OPTIONS)
      );
      const data = await response.json();
      setVideoData(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect( ()=>{
    getMainMovieVideo();
  }, 
  []);
  return videoData;
};

export default useMainMovieVideo;
