import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { imageUrl } from '../../constants/constants';
import './RowPost.css';

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(props.url).then((response) => {
      console.log(response.data);
      setMovies(response.data.results);
    });
  }, [props.url]);

  const handleMovie = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj) => (
          <img
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? 'small-poster' : 'poster'}
            src={`${imageUrl + obj.backdrop_path}`}
            alt={obj.title}
            key={obj.id}
          />
        ))}
      </div>
    </div>
  );
}

export default RowPost;
