import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoIcon from '@mui/icons-material/Info';

const VideoTitle = ({title, overview}) => {
  return (
    <div className='p-24 aspect-video w-full text-white bg-gradient-to-r from-black px-12 absolute z-10'>
        <h1 className='text-6xl font-bold p-3'>{title}</h1>
        <p className='text-md w-1/2 p-2'>{overview}</p>

        <div>
            <button
                className='bg-white box-border w-[6.2rem] rounded-md shadow-lg hover:bg-gray-300 transition duration-300 text-black p-3 m-2'
             >
            <PlayArrowIcon className='mr-1'/>
                Play
                </button>
            <button className='bg-gray-400 box-border rounded-md shadow-lg hover:bg-gray-600 transition duration-300 text-black p-3 m-2' >
                <InfoIcon className='mr-1'/>
                More Info
                </button>
        </div>
    </div>
  )
}

export default VideoTitle;