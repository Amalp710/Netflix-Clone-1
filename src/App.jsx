import React,{useEffect,useState} from 'react';
import { Routes, Route,useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar/Navbar';
import TVShows from './Components/TVShows/TVShows';
import Home from './Home';
import Login from './Components/Login/Login';
import SearchResults from './SearchResults';
import { API_KEY } from './constants/constants';
import TVDetail from './Components/TVDetail/TVDetail';
import Movies from './Components/Movies/Movies'; 
import MovieDetail from './Components/MovieDetail/MovieDetail';

function App() {
  const tvShowsUrl = `/tv/popular?api_key=${API_KEY}&language=en-US`;
  const childrenShowsUrl = `/discover/tv?api_key=${API_KEY}&with_genres=10762`;
  const moviesUrl = `/movie/popular?api_key=${API_KEY}&language=en-US`; 
  const [user, setUser] = useState(null);

  const navigate=useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth,async (user)=>{
      if(user){
        console.log("logged in");
        setUser(user);
        navigate('/')
      }else{
        console.log("Logged out");
        setUser(null);
        navigate('/login')
      }
    })
  
    
  }, [])

  return (
    <div>
      <ToastContainer theme='dark'/>
      {user && <Navbar />} 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/tv-shows' element={<TVShows title="TV Shows" url={tvShowsUrl} />} />
        <Route path='/children-shows' element={<TVShows title="Children Shows" url={childrenShowsUrl} />} />
        <Route path="/tv/:id" element={<TVDetail />} />
        <Route path='/movies' element={<Movies title="Movies" url={moviesUrl} />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path='/search/:query' element={<SearchResults />} /> {/* Route for search results */}
      </Routes>
    </div>
  );
}

export default App;
