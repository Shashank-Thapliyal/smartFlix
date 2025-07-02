import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate, useLocation } from 'react-router-dom';
import { addUser, removeUser } from '../utils/userSlice';
import LOGO_URL from "../assets/SMARTFLIX-LOGO.png";
import { PermIdentity } from '@mui/icons-material';
import { toggleSearch } from '../utils/searchSlice';
import { SUPPORTED_LANGUAGES } from '../utils/constants';
import { changeLanguage } from '../utils/languageSlice';

const Header = () => {
  const user = useSelector(store => store.user);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isSearchVisible = useSelector(store => store.search?.showSearch);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
        if (window.location.pathname === '/') {
          navigate("/browse");
        }
      } else {
        dispatch(removeUser());
        if (window.location.pathname !== '/') {
          navigate("/");
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    // Update the search visibility based on the current path
    if (location.pathname === '/search' && !isSearchVisible) {
      dispatch(toggleSearch());
    } else if (location.pathname === '/browse' && isSearchVisible) {
      dispatch(toggleSearch());
    }
  }, [location.pathname, isSearchVisible, dispatch]);

  const handleSignOut = () => {
    signOut(auth).then(() => {
    }).catch((error) => {
      // console.log(error);
    });
  };

  const handleSearchClick = () => {
    if (!isSearchVisible) {
      navigate("/search");
    } else {
      navigate("/browse");
    }
    dispatch(toggleSearch());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/90 via-black/50 to-transparent'>
      <div className='flex justify-between items-center px-6 py-4 max-w-screen-2xl mx-auto'>

        {/* Logo Section */}
        <div className='flex-shrink-0'>
          <img
            src={LOGO_URL}
            alt="Smartflix"
            className=' md:w-28 w-auto object-contain'
          />
        </div>

        {/* Right Side Controls */}
        <div className='flex items-center space-x-3'>

          {/* Language Selector */}
          {user && <select
            className='bg-gray-800/90 text-white border border-gray-600 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 hover:bg-gray-700 transition-colors'
            onChange={handleLanguageChange}
          >
            {SUPPORTED_LANGUAGES?.map((language, index) => (
              <option key={index} value={language["identifier"]} className='bg-gray-800'>
                {language["name"]}
              </option>
            ))}
          </select>}

          {/* Search/Browse Button */}
          {user &&
            <button
              className='bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors duration-200 shadow-sm'
              onClick={handleSearchClick}
            >
              {!isSearchVisible ? "Search" : "Browse"}
            </button>}

          {/* User Profile Section */}
          {user && (
            <div className='flex items-center bg-gray-800/90 rounded-md px-3 py-2 border border-gray-600'>
              <PermIdentity className='text-white w-6 h-6 mr-2' />
              <button
                className='text-white text-sm font-medium hover:text-gray-300 transition-colors'
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
