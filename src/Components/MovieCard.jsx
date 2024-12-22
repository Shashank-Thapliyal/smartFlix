import React from 'react'
import { IMG_URL } from '../utils/constants'

const MovieCard = ({movie}) => {
  console.log(movie.poster_path)

  return (
    <div >
        <img className='min-w-[150px] rounded-sm' src={IMG_URL + movie?.poster_path} alt={movie.title} />
    </div>
  )
}

export default MovieCard