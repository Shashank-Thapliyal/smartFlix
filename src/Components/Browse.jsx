import Header from './Header'
import { BANNER_IMG } from '../utils/constants'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import HeroContainer from './HeroContainer';
import MoviesContainer from './MoviesContainer';

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div className='w-[100vw]'>
      <Header />
      <HeroContainer />
      <MoviesContainer />

    </div>
  )
}

export default Browse