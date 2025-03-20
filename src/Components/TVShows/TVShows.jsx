import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { imageUrl } from '../../constants/constants';
import './TVShows.css';

function TVShows(props) {
  const [shows, setShows] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchShows(page);
  }, [props.url, page]);

  const fetchShows = (pageNumber) => {
    axios.get(`${props.url}&page=${pageNumber}`)
      .then((response) => {
        if (response.data && response.data.results) {
          setShows((prevShows) => [...prevShows, ...response.data.results]); // Append new shows
        }
      })
      .catch((error) => {
        console.error('Error fetching TV shows:', error);
      });
  };

  const handleShow = (id) => {
    navigate(`/tv/${id}`);
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1); // Load next page
  };

  return (
    <div className='grid-container'>
      <h2>{props.title}</h2>
      <div className='grid'>
        {shows.length > 0 ? shows.map((obj) => (
          <div className='grid-item' key={obj.id} onClick={() => handleShow(obj.id)}>
            <img
              className='poster'
              src={obj.backdrop_path ? `${imageUrl + obj.backdrop_path}` : ''}
              alt={obj.name || obj.title || 'TV Show Poster'}
            />
          </div>
        )) : <p>No shows available</p>}
      </div>
      <button className="load-more" onClick={loadMore}>Load More</button>
    </div>
  );
}

export default TVShows;
