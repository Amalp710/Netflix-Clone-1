import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import caret_icon from '../../assets/caret_icon.svg';
import profile_img from '../../assets/profile_img.png';
import { logout } from '../../Firebase';

function Navbar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const searchRef = useRef(null); // Ref to track clicks outside

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
      setShowSearchBar(false); // Close search bar after submission
    }
  };

  const toggleSearchBar = () => {
    setShowSearchBar(true);
  };

  // Close search bar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchBar(false);
      }
    };

    if (showSearchBar) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchBar]);

  return (
    <div className='navbar'>
      <div className='left-navbar'>
        <img  onClick={() => navigate('/')} className='logo' src={logo} alt="Netflix Logo" />
        <ul>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/tv-shows')}>TV Shows</li>
          <li onClick={() => navigate('/movies')}>Movies</li>
        </ul>
      </div>
      <div className='right-navbar'>
        <div className='search-container' ref={searchRef}>
          <img
            className='sIcons'
            src={search_icon}
            alt="Search"
            onClick={toggleSearchBar}
          />
          {showSearchBar && (
            <form onSubmit={handleSearch} className='search-bar-form'>
              <input
                type='text'
                placeholder='Search movies...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type='submit'>
                <img className='sIcons' src={search_icon} alt="Search" />
              </button>
            </form>
          )}
        </div>
        <p className='children' onClick={() => navigate('/children-shows')}>Children</p>
        <div className='navbar-avatar'>
          <img className='avatar' src={profile_img} alt="Avatar" />
          <img className='dIcons' src={caret_icon} alt="Dropdown" />
          <div className='dropdown'>
            <p onClick={() => logout()}>Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
