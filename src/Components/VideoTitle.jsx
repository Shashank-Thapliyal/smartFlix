import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import InfoIcon from '@mui/icons-material/Info';

const VideoTitle = ({title, overview,handlePlaying ,playing}) => {
  return (
    <div className='p-24 aspect-video w-full text-white bg-gradient-to-r from-black px-12 absolute z-10'>
        <h1 className='text-6xl font-bold p-3'>{title}</h1>
        <p className='text-md w-1/2 p-2'>{overview}</p>

        <div>{
            <button
                className='bg-white box-border w-[6.2rem] rounded-md shadow-lg hover:bg-gray-300 transition duration-300 text-black p-3 m-2'
                onClick={handlePlaying}
            >
              { playing? <p>
                 <PauseIcon className='mr-1'/> <span> Pause</span> 
              </p> :
                <p>
                <PlayArrowIcon className='mr-1'/> <span> Play</span> 
             </p> 
              }
                </button>
            }
            <button className='bg-gray-400 box-border rounded-md shadow-lg hover:bg-gray-600 transition duration-300 text-black p-3 m-2' >
                <InfoIcon className='mr-1'/>
                More Info
                </button>
        </div>
    </div>
  )
}

export default VideoTitle;