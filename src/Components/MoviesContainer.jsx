import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const MoviesContainer = () => {
  const movies = useSelector( store => store.movies?.nowPlayingMovies)

  return (
    <div className='bg-black p-2'>
      <div className='relative -my-24 mb-1 z-50'>
        <MovieList title={"Now Playing"} movies={movies}/>
      </div>

      <MovieList  title={"Now Playing"} movies={movies}/>
    </div>
  )
}

export default MoviesContainer