import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { imageUrl } from '../../constants/constants';
import './Movies.css';

function Movies(props) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies(page);
  }, [props.url, page]);

  const fetchMovies = (pageNumber) => {
    axios.get(`${props.url}&page=${pageNumber}`)
      .then((response) => {
        if (response.data && response.data.results) {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]); // Append new movies
        }
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  };

  const handleMovie = (id) => {
    navigate(`/movie/${id}`); // Navigate to movie details page
  };

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1); // Load next page
  };

  return (
    <div className='movies-container'>
      <h2>{props.title}</h2>
      <div className='movies-grid'>
        {movies.length > 0 ? movies.map((obj) => (
          <div className='movie-item' key={obj.id} onClick={() => handleMovie(obj.id)}>
            <img
              className='movie-poster'
              src={obj.poster_path ? `${imageUrl + obj.poster_path}` : ''}
              alt={obj.title || 'Movie Poster'}
            />
          </div>
        )) : <p>No movies available</p>}
      </div>
      <button className="load-more" onClick={loadMore}>Load More</button>
    </div>
  );
}

export default Movies;
