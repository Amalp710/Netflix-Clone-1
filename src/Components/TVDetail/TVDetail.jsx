import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../constants/constants';
import YouTube from 'react-youtube';
import './TVDetail.css';

function TVDetail() {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    // Fetch TV show details
    axios.get(`/tv/${id}?api_key=${API_KEY}&language=en-US`).then((response) => {
      setShow(response.data);
    });

    // Fetch trailer
    axios.get(`/tv/${id}/videos?api_key=${API_KEY}&language=en-US`).then((response) => {
      if (response.data.results.length !== 0) {
        setTrailer(response.data.results[0]);
      }
    });
  }, [id]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  if (!show) return <p>Loading...</p>;

  return (
    <div className="tv-detail">
      <img className="tv-banner" src={`${imageUrl + show.backdrop_path}`} alt={show.name} />
      <div className="tv-info">
        <h1>{show.name}</h1>
        <p>{show.overview}</p>
        {trailer && <YouTube videoId={trailer.key} opts={opts} />}
      </div>
    </div>
  );
}

export default TVDetail;
