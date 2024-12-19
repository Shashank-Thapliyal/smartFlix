import React, { useState } from 'react'
import VideoTitle from './VideoTitle'
import VideoBackground from './VideoBackground'
import { useSelector } from 'react-redux'

const HeroContainer = () => {
    const movies = useSelector( store => store.movies?.nowPlayingMovies)


    if(!movies) return null;

    const {id, title, overview} = movies[0];
   
  return (
    <div>
        <VideoTitle title={title} overview={overview}  />
        <VideoBackground movieId={id}  />
    </div>
  )
}

export default HeroContainer