import Header from './Header'
import { BANNER_IMG } from '../utils/constants'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import HeroContainer from './HeroContainer';
import SearchBox from './SearchBox';
import { useDispatch, useSelector } from 'react-redux';

const Browse = () => {
  useNowPlayingMovies();
  const dispatch = useDispatch();
  const isSearchVisible = useSelector(store => store.search?.showSearch);


  return (
    <div className='w-[100vw]'>
      <Header />
      {
        isSearchVisible ?
          <SearchBox /> :
          <>
            <HeroContainer />
          </>
      }
    </div>
  )
}

export default Browse