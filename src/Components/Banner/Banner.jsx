import React,{useEffect, useState,useRef } from 'react'
import { API_KEY } from '../../constants/constants'
import axios from '../../axios'
import './Banner.css'
import { imageUrl} from '../../constants/constants'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'

import ReactPlayer from 'react-player';


function Banner() {

    const [trailerUrl, setTrailerUrl] = useState('');
    
    const trailerRef = useRef(null); 
  const [movie,setMovie]= useState([])
  useEffect(() => {
    axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0]);
      const movies = response.data.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      setMovie(movies[randomIndex]);
      

    })
  }, [])
  const playTrailer = async () => {
    if (trailerUrl) {
        // If trailer is already playing, hide it
        setTrailerUrl('');
        return;
    }

    if (!movie.id) return;

    const mediaType = movie.media_type === 'tv' ? 'tv' : 'movie';

    try {
        const response = await axios.get(
            `${mediaType}/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
        );

        const trailers = response.data.results;
        const officialTrailer = trailers.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        const fallbackVideo = trailers.length > 0 ? trailers[0] : null;

        if (officialTrailer) {
            setTrailerUrl(`https://www.youtube.com/watch?v=${officialTrailer.key}`);
        } else if (fallbackVideo) {
            setTrailerUrl(`https://www.youtube.com/watch?v=${fallbackVideo.key}`);
        } else {
            alert('No trailer available for this movie.');
        }
    } catch (error) {
        console.error('Error fetching trailer:', error);
        alert('Failed to load trailer.');
    }
};

useEffect(() => {
    const handleClickOutside = (event) => {
        if (trailerRef.current && !trailerRef.current.contains(event.target)) {
            setTrailerUrl('');
        }
    };

    if (trailerUrl) {
        document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, [trailerUrl]);


   
  return (
    <div 
    style={{backgroundImage:`url(${imageUrl+movie?.backdrop_path})`}}
    className='banner'>
        <div className='content'>
            <h1 className='title'>{movie?.title}</h1>
            <div className='banner_buttons'>
                <button onClick={playTrailer} className='button' ><img src={play_icon} alt="" />Play</button>
                <button  className='button'><img src={info_icon} alt="" />My List</button>
            </div>
            <h1 className='discription'>{movie?.overview}</h1>

        </div>
        {trailerUrl && (
                <div className="trailer-overlay">
                    <div className="trailer-container" ref={trailerRef}>
                        <button className="close-button" onClick={() => setTrailerUrl('')}>X</button>
                        <ReactPlayer 
                            url={trailerUrl} 
                            playing 
                            controls
                            width="100%" 
                            height="500px"
                        />
                    </div>
                </div>
            )}
        <div className="fade_bottom"></div> 
      </div>
  )
}

export default Banner
