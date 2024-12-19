import React from 'react'
import { YOUTUBE_URL } from '../utils/constants'
import useMainMovieVideo from '../hooks/useMainMovieVideo'

const VideoBackground = ({ movieId }) => {
  const videoData = useMainMovieVideo(movieId);
  console.log("videoData in component", videoData);

  if (!videoData) return null;

  const {key} = videoData.results.find(video => video?.type === "Trailer") || videoData.results[0];


  const videoSrc = `${YOUTUBE_URL}${key}?autoplay=1&controls=0&mute=1&loop=1}`;

  return (
    <div>
      <iframe
        className='w-full aspect-video border-none'
        src={videoSrc}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video"
      ></iframe>
    </div>
  )
}

export default VideoBackground;