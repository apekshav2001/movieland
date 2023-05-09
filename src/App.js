import { useState, useEffect} from "react"

import MovieCard from "./components/movieCard/MovieCard";
import './App.css'
import SearchIcon from './search.svg';
const API_URL = ' http://www.omdbapi.com/?i=tt3896198&apikey=8cb94f36';

const App = () => {
const [movies, setMovies] = useState([]);
const [searchTerm, setSearchTerm] = useState('');

const searchMovies = async (title) => {
    const response =await fetch(`${API_URL}&s=${title}`);
    const data =  response.json();
    console.log(data)
    data.then((res) => {
    setMovies(res.Search);
    });
}

    useEffect(() => {
     searchMovies('BTS');
    }, []);
     
  return (
    <div className="app">
        <h1>MovieLand</h1>

        <div className="search">
            <input
               placeholder="Search for movies"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />

            <img
             src={SearchIcon}
             alt="searchIcon"
             onClick={() => searchMovies(searchTerm)}
             />
        </div>

        {
            movies?.length > 0 ?
            (
                
            <div className="container">
             {
                movies.map((movie)=> (<MovieCard movie={movie} key={movie.imdbID}/>))
             }
            </div>
            ) : (
                <div className="empty">
                    <h2>No movies found</h2>
                </div>
            )
        }
    </div>
  );
}

export default App;