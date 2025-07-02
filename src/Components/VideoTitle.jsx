import React from 'react';
import { Link } from 'react-router-dom';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';

const VideoTitle = ({ movieId, title, overview, handlePlaying, playing }) => {
  
  return (
    <div className='p-24 aspect-video w-full text-white bg-gradient-to-r from-black px-12 absolute z-10'>
      <h1 className='text-6xl font-bold p-3'>{title}</h1>
      <p className='text-md w-1/2 p-2'>{overview}</p>

      <div className='flex items-center gap-3 mt-4'>
        <button
          className='bg-red-600 hover:bg-red-700 box-border min-w-[6.2rem] rounded-md shadow-lg transition duration-300 text-white font-semibold p-3 flex items-center justify-center'
          onClick={handlePlaying}
        >
          {playing ? (
            <>
              <PauseIcon className='mr-1' /> 
              <span>Pause</span>
            </>
          ) : (
            <>
              <PlayArrowIcon className='mr-1' /> 
              <span>Play</span>
            </>
          )}
        </button>
        
        <button className='bg-gray-600 bg-opacity-70 hover:bg-opacity-50 box-border rounded-md shadow-lg transition duration-300 text-white font-semibold p-3 flex items-center' onClick={() => window.open(`https://www.themoviedb.org/movie/${movieId}`, '_blank')}
>          <InfoIcon className='mr-2' />
          More Info
        </button>
      </div>

      <div className='mt-6'>
        <Link to="/search">
          <button className='bg-blue-600 bg-opacity-80 hover:bg-blue-700 hover:bg-opacity-90 backdrop-blur-sm text-white font-medium rounded-lg transition duration-300 px-6 py-3 flex items-center shadow-lg border border-blue-500 border-opacity-30'>
            <SearchIcon className='mr-2 text-lg' />
            <span>Search & Recommendations</span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VideoTitle;