import React from 'react'

const MovieCard = ({movie}) => {
  return (
      <div  className="flex flex-col">
                        <a 
                          href={`https://www.themoviedb.org/movie/${movie.id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block bg-gray-800/80 rounded-lg border border-gray-600 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 hover:border-red-500/50"
                        >
                          {/* Movie Poster */}
                          <div className="relative aspect-[2/3] overflow-hidden">
                            <img 
                              src={movie.poster_url} 
                              alt={movie.title}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                            
                            {/* Rating Badge */}
                            <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-sm flex items-center">
                              <span className="text-yellow-400 mr-1">★</span>
                              <span>{movie.vote_average?.toFixed(1) || 'N/A'}</span>
                            </div>
                            
                            {/* Year Badge */}
                            <div className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                              {movie.release_date?.split('-')[0] || 'Unknown'}
                            </div>
                          </div>
                          
                          {/* Movie Info */}
                          <div className="p-4">
                            <h4 className="text-white font-medium text-lg mb-2 line-clamp-1">{movie.title}</h4>
                            <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                              {movie.overview || 'No description available.'}
                            </p>
                            <div className="flex justify-end">
                              <span className="text-red-500 text-sm font-medium hover:underline">View Details →</span>
                            </div>
                          </div>
                        </a>
                      </div>
  )
}

export default MovieCard