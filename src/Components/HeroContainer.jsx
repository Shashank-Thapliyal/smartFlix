import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';
import { useSelector } from 'react-redux';

const HeroContainer = () => {
  const [playing, setPlaying] = useState(true);
  const movies = useSelector(store => store.movies?.nowPlayingMovies);

  if (!movies) return null;

  const { id, title, overview } = movies[0];
  
  const handlePlayClick = () => {
    setPlaying(!playing);
  };
  
  return (
    <div>
      <VideoTitle movieId={id} title={title} overview={overview} handlePlaying={handlePlayClick} playing={playing} />
      <VideoBackground movieId={id} playing={playing} />
    </div>
  );
};

export default HeroContainer;
