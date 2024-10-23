import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../context/Context'
import run from "../Config/gemini";

export default function Main(props) {
    const {movies, setMovies} = props
    const {movieInfo, setMovieInfo, showResult, setShowResult, resultData, setResultData, loading, setLoading,} = useContext(Context)
    var correctMovieID
    var checkJSON
    var reviewText

    //imdbID moet gevonden worden en dan in de URL info geplant worden
    const getMovieLink = () =>
        {
            //Stop de posterlink in een var om te controleren met welke film we te maken hebben
            var movieClickedSRC = event.target.src
            //Creert een array van de poster informatie van de movies array(de array waar alle films in staan die op de website zijn ingeladen)
            var FilmSearch = movies.map((MovieName) => {
                return MovieName.Poster
            })
            //Deze functie loopt de ingeladen films langs en controleert bij welke deze overeenkomt met de aangeklikte film, als deze gelijk is stopt hij de imdbID in een variabele die in de functie voor het correct vinden van de film informatie wordt geplakt
            var i
            for(i = 0; i < FilmSearch.length; i++){
                if (FilmSearch[i] == movieClickedSRC){
                    correctMovieID = movies[i].imdbID
                }
            }
            const moviePosterClass = document.getElementsByClassName('movie-poster');
            var i
            for(i=0; i<movies.length; i++)
            {
                moviePosterClass[i].id = ""
            }
            var MovieClickedID = event.target.parentNode
            MovieClickedID.id = "active"
            const LineClicked = document.getElementById('lijn-component')
            LineClicked.classList.add('active')
            //begin de functie die de juiste informatie ontfutseld voor de review
            getMovieInfoRequest()
        }

        

    // functie die alle informatie ontfutseld die op de pagina gedisplayt moet worden
    const getMovieInfoRequest = async () =>{
        //Pakt de juiste url voor de aangeklikte film
        const OMDBAPIkey = import.meta.env.VITE_OMDB_API_KEY;
        const urlInfo = `http://www.omdbapi.com/?i=${correctMovieID}&apikey=${OMDBAPIkey}`
        console.log(urlInfo);
        //ontvangt de informatie van de API
        const responseInfo = await fetch(urlInfo);
        //zet de ontvangen informatie om naar JSON informatie
        const responseJSONInfo = await responseInfo.json()
        console.log(responseJSONInfo)
        checkJSON = (responseJSONInfo)
        //Geeft de variabele movieInfo de juiste informatie om een of andere reden geeft console.log movieinfo de oude informatie, idee bedenken om deze te legen en weer te vullen
        setMovieInfo(responseJSONInfo)
        onSent()
      }

      const onSent = async () =>
      {
        console.log(checkJSON.Plot)
        var Rating = Number(checkJSON.imdbRating)
        if (Rating >= 8 && Rating < 10){
            reviewText = " fantastisch vindt."
          }
          else if(Rating >= 7 && Rating < 8)
            {
            reviewText = " wel goed vindt met een paar kleine verbeteringen."
            }
          else if  (Rating >= 5 && Rating < 7){
            reviewText = " niet uitermate slecht vindt maar goed is het ook niet."
          }
          else if (Rating >= 1 && Rating < 5){
            reviewText = " niet om aan te gluren vindt. Je kan beter naar opdrogende verf gaan zitten kijken."
          }
          else{
            reviewText = "ffkes kijken"
          }
        //waarom kan ik hier niet movieInfo.Plot gebruiken????
        var SendString = "Zet deze tekst om naar het nederlands " + checkJSON.Plot + " en maak er dan iets grappigs van. Flauwe humor toevoegen alsof het gerecenseerd is door iemand die zichzelf vooral heel grappig vindt. Daarnaast moet je 1 à 2 keer het woord bizar er in kwijt. De tekst mag hier en daar wat brabantse woorden bevatten. Voeg een mening toe in dezelfde stijl die de film" + reviewText + " Geef alleen de tekst waar ik om vraag"
        console.log(SendString)
        setResultData('')
        setLoading(true)
        setShowResult(true)
        const response = await run(SendString)
        setResultData(response)
        setLoading(false)
      }
          
    

  // wat er daadwerkelijk gerenderd wordt op je scherm, hier wordt de array movies gemapt en in de html geplaatst op basis van de link naar de poster, daarnaast is het onclick event dat de informatie verzameld van de film die je hebt aangeklikt.
    return (
    <>
        <div className='container-fluid'>
            {movies.map((movie)=>
            <div className='movie-poster' onClick={function() {getMovieLink();}}>
                <img src={movie.Poster} alt= 'bg-image'></img>
            </div>
            )}
        </div>
        <div className='container-fluid' id="lijn-component">
        </div>
    </>
  )
}
