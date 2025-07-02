import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { BANNER_IMG } from '../utils/constants';
import { getMovieRecommendations, getMoviesDetails } from '../services/aiRecommendation.js'; // Adjust path as needed
import Header from './Header.jsx';
import MovieCard from './MovieCard.jsx';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [showResults, setShowResults] = useState(false);
  
  const handleSubmit = async () => {
    // console.log("Search initiated");
    setLoading(true);
    setError(null);
    setMovies([]);
    setShowResults(false);
    const userQuery = query.trim();
    if (!userQuery) {
      setLoading(false);
      return;
    }
    try {
      const titles = await getMovieRecommendations(userQuery);
      const details = await getMoviesDetails(titles);
      setMovies(details);
      setShowResults(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };
  
  const handleExampleClick = (example) => {
    setQuery(example);
  };
  
  const exampleQueries = [
    "I want to watch a comedy film with Akshay Kumar",
    "I'm feeling bored, want to watch some drama movie",
    "Show me action movies like John Wick",
    "Romantic movies from the 90s",
    "Horror movies that are not too scary"
  ];
  
  return (
    <>
      {/* Header Component */}
      <Header />
      
      <div className='relative min-h-screen'>
        <img
          className='fixed inset-0 w-full h-full object-cover'
          src={BANNER_IMG}
          alt='netflix bg'
        />
        <div className='fixed inset-0 bg-black opacity-60'></div>

        <div className='relative pt-24 pb-12 min-h-screen'>
          <div className='flex flex-col items-center justify-center mx-auto max-w-4xl px-4 space-y-8'>
      
            <div className='bg-gray-900/90 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700 w-full'>
              {error && (
                <div className="mb-6 p-4 bg-red-600/90 text-white rounded-lg">
                  {error}
                </div>
              )}
              <div className="mb-6">
                <div className='flex items-center space-x-4'>
                  <input
                    type='text'
                    value={query}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Tell me what kind of movie you want to watch..."
                    className='flex-1 p-4 rounded-lg text-white bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder-gray-400 transition-all duration-300'
                    disabled={loading}
                  />
                  <button
                    onClick={handleSubmit}
                    disabled={loading || !query.trim()}
                    className='bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center min-w-[120px]'
                  >
                    {loading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span className="text-sm">Finding...</span>
                      </div>
                    ) : (
                      <Search className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-gray-300 mb-4 text-lg">✨ Try these examples:</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {exampleQueries.map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(example)}
                      disabled={loading}
                      className="px-4 py-2 bg-gray-800/80 text-gray-200 rounded-full text-sm hover:bg-gray-700 hover:text-white transition-all duration-200 border border-gray-600 hover:border-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {!showResults && (
              <div className="text-center py-8">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
                  Movie Finder
                </h1>
                <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Discover your next favorite film with AI-powered recommendations
                </p>
              </div>
            )}
            
            {/* Results Section */}
            {showResults && (
              <div className='bg-gray-900/80 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-700 w-full'>
                <div className="relative">
                  <h3 className="text-white text-xl font-semibold mb-4">Recommended Movies:</h3>
                  
                  {/* Movie Cards Grid */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {movies.filter(movie => 
                      movie.poster_url && 
                      movie.poster_url !== '/placeholder-movie.jpg' && 
                      !movie.poster_url.includes('placeholder')
                    ).map((movie) => (
                      <MovieCard key={movie.id} movie={movie} />
                    
                    ))}
                  </div>
                  
                  {/* Search More Link */}
                  <div className="mt-8 text-center">
                    <a 
                      href="https://www.themoviedb.org/search"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-lg font-medium transition-colors duration-300 shadow-lg hover:shadow-red-500/30"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                      </svg>
                      Search More Movies
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default SearchBox;