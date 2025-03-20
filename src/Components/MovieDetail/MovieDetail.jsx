import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_KEY } from '../../constants/constants';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailer, setTrailer] = useState('');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        // Fetch movie details
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: { api_key: API_KEY, language: 'en-US' },
        });
        setMovie(response.data);

        // Fetch movie trailer
        const trailerResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`, {
          params: { api_key: API_KEY },
        });

        const trailers = trailerResponse.data.results;
        const officialTrailer = trailers.find(video => video.type === 'Trailer' && video.site === 'YouTube');

        if (officialTrailer) {
          setTrailer(`https://www.youtube.com/embed/${officialTrailer.key}`);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="movie-detail-container">
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`${movie.title} poster`}
        className="movie-poster-detail"
      />
      <p>{movie.overview}</p>
      {trailer && (
        <div className="movie-trailer">
          <h3>Trailer</h3>
          <iframe
            width="560"
            height="315"
            src={trailer}
            title={`${movie.title} Trailer`}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
