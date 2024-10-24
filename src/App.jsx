import { useContext, useEffect, useState } from "react"
import Main from "./components/Main"
import MovieListHeading from "./components/MovieListHeading"
import SearchBox from "./components/SearchBox";
import MovieInfo from "./components/MovieInfo";
import { Context } from "./context/Context";

function App() {
  // array waar de films die worden gezocht in worden opgeslagen
  const [movies, setMovies] = useState([]);
  movies.length = Math.min(movies.length, 5)
  // dynamische zoekfunctie
  const [searchValue, setSearchValue] = useState('')

  //We roepen hier de api aan om resultaten te genereren voor op de website
  // await functie werkt alleen met async, dat kan je gewoon voor de () typen voor de arrowfunctie
  const getMovieRequest = async (searchValue) => {
    // We gebruiken `` ipv '' omdat we hier een stukje code inplaatsen, dat stukje code is de search value
    const OMDBAPIkey = import.meta.env.VITE_OMDB_API_KEY;
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=${OMDBAPIkey}`
    // We roepen de API aan om info te geven, dit word opgeslagen in een variabele "response"  
    const response = await fetch(url);
    // Vervolgens moet het leesbaar gemaakt worden om de gegevens te kunnen verwerken, daarvoor zetten we het om naar JSON
    const responseJSON = await response.json()
    // stuur alleen een setmovies als we een value hebben
    if(responseJSON.Search){
      setMovies(responseJSON.Search)
    }
  };
  // We plaatsen een array ([]) aan het eind zodat deze functie wordt aangeroepen wanneer de pagina inlaadt, met searchvalue erin wordt de functie elke keer opgeroepen als de state van searchValue verandert dit wil ik veranderen naar wanneer je op zoeken klikt/enter klikt, dat scheelt met inladen van onnodige informatie
  useEffect(()=>{
    getMovieRequest(searchValue);
  }, [searchValue])

  const setMoviesInitial = async (random) => {
    //Randomizer
    const randomMovie = 
  [
    "new",
    "avengers",
    "harry potter",
    "pokemon",
    "west",
    "indiana jones"
  ]
    var randomSearchVal = Math.floor(Math.random() * randomMovie.length);
    var randomSearchRes = randomMovie[randomSearchVal];
    // We gebruiken `` ipv '' omdat we hier een stukje code inplaatsen, dat stukje code is de search value
    const OMDBAPIkey = import.meta.env.VITE_OMDB_API_KEY;
    const url = `https://www.omdbapi.com/?s=${randomSearchRes}&apikey=${OMDBAPIkey}`
    // We roepen de API aan om info te geven, dit word opgeslagen in een variabele "response"  
    const response = await fetch(url);
    // Vervolgens moet het leesbaar gemaakt worden om de gegevens te kunnen verwerken, daarvoor zetten we het om naar JSON
    const responseJSON = await response.json()
    // stuur alleen een setmovies als we een value hebben
    if(responseJSON.Search){
      setMovies(responseJSON.Search)
    }
  };

  //Hier even 5 random films laten zien
  useEffect(()=>{
    setMoviesInitial();
  }, [])

  //Hier staan de componenten die we in de app willen laten zien, om properties van hier naar die componenten te krijgen benoemen we de props hieronder om ze bij de componenten weer uit te pakken.
  return (
    <>
    <div className="row">
      <MovieListHeading heading ="Movies"/>
      <SearchBox movies={movies} setMovies={setMovies} searchValue={searchValue} setSearchValue={setSearchValue}/>    
    </div>
      <Main movies={movies} setMovies={setMovies}/>
      <MovieInfo/>
    </>
  )
}

export default App
