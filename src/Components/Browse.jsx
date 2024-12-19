import Header from './Header'
import { BANNER_IMG } from '../utils/constants'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import HeroContainer from './HeroContainer';

const Browse = () => {
  useNowPlayingMovies();

  return (
    <div className='w-[100vw]'>
      <Header />
      {/* <div className='relative'>
        <img
          className=' h-auto bg-black relative bg-gradient-to-b from-black to-gray-50'
          src={BANNER_IMG}
          alt='bg'
        />
        <div className='before:absolute before:inset-0 before:bg-black before:opacity-50'></div>
      </div> */}
      <HeroContainer />

    </div>
  )
}

export default Browse