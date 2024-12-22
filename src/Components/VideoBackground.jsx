import React from 'react'
import { YOUTUBE_URL } from '../utils/constants'
import useMainMovieVideo from '../hooks/useMainMovieVideo'

const VideoBackground = ({ movieId,playing }) => {
  const videoData = useMainMovieVideo(movieId);

  const isPlaying  = playing? `1`:`0`; 
  if (!videoData) return null;

  const {key} = videoData.results.find(video => video?.type === "Trailer") || videoData.results[0];


  const videoSrc = `${YOUTUBE_URL}${key}?autoplay=${isPlaying}&controls=0&mute=1&loop=1}`;

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