import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title, movies}) => {
  if(!movies) return null;
  return (
    <div className='my-12 '>
        <h2 className='text-white text-2xl'>{title}</h2>
        <div style={{scrollbarWidth:'none'}} className='flex gap-2 overflow-x-scroll'>
        {  
          movies.map( movie =>  <MovieCard key={movie.id}  movie={movie} />)
        }
        </div>
    </div>
  )
}

export default MovieList