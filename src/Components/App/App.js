import React, {useState} from "react";
import './App.css'

function App() {

    const [genreList, setGenreList] = useState([]);
    const [selectGenre, setSelectGenre] = useState();
    const [movie, setMovie] = useState([]);
    const [title , setTitle] = useState("");
    const [overview, setOverview] = useState("");
    const [poster, setPoster] = useState("");
    const [date, setDate] = useState("");

    const baseURL = 'https://api.themoviedb.org/3';
    const apiKey = '?api_key=463e9c6bdae3bcc91c6eca9d80698f2b';
    const lang = '&language=en-US';
    const options = {
        methood: 'GET'
    }

    const getGenres = async () => {
        const params = '/genre/movie/list';
        const urlFetch = baseURL + params + apiKey + lang;
        return fetch(urlFetch,options)
        .then(res => res.json())
        .then(res => res['genres'])
        .then((res) => {
            const list = [];
            for (let item of res) {
                list.push(item);
            }
            console.log(res);
            setGenreList(list);
        })
    }

    const getMovie = async () => {
        const params = '/discover/movie';
        const params2 = `&with_genres=${selectGenre}`;
        const urlFetch = baseURL + params + apiKey + lang + params2;
        return fetch(urlFetch,options)
        .then(res => res.json())
        .then((res) => {
            
            return res['results'];
        })
        .then((res) => {
            const idx = Math.floor(Math.random() * res.length);
            const randomMovie = res[idx];
            const str = randomMovie["release_date"];
            const regexp = /(?<year>[0-9]{4})-(?<month>[0-9]{2})-(?<day>[0-9]{2})/g;
            const fixedDate = str.replace(regexp, '$<day>/$<month>/$<year>');
            
            setMovie(randomMovie);
            setTitle(randomMovie['original_title']);
            setDate(`Release Date: ${fixedDate}`);
            setOverview(randomMovie['overview']);
            setPoster(`https://image.tmdb.org/t/p/original/${randomMovie['poster_path']}`);
        })
    }

    
    return (
        <div className="App">
            <header className="App-header">
                <h2>
                    Find your favorite movie
                </h2>
            </header>
           <main>
                <form id="genreForm">
                    <select 
                    name="genres" 
                    id="genres" 
                    onClick={getGenres}
                    onChange={(e) => setSelectGenre(e.target.value)}>{
                        genreList.map((item) => (
                            <option value={item.id}>{item.name}</option>
                        ))
                    }</select>
                </form>

                <button 
                id="playBtn"
                onClick={getMovie}>Pick a movie</button>
                <div id="movieInfo">
                    <div className="infoPoster">
                        <img id="poster" src={poster}></img>
                    </div>
                    <div className="infoText">
                        <h3 id="title">{title}</h3>
                        <div id="releaseDate">{date}</div>
                        <div id="overview">{overview}</div>
                    </div>
                </div>

           </main>
        </div>
    )
}

export default App;