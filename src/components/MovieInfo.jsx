import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../context/Context'

export default function MovieInfo(props) {
    const {movieInfo, setMovieInfo, showResult, setShowResult, resultData, setResultData, loading, setLoading} = useContext(Context)

    var reviewText
    
    var displaytekst = "Ffkes kijken"
    var Rating = Number(movieInfo.imdbRating)
    
    if (Rating >= 8 && Rating < 10){
      displaytekst = "Goei spul!"
    }
    else if(Rating >= 7 && Rating < 8)
      {
      displaytekst = "Da is een mooi filmpke"
      }
    else if  (Rating >= 5 && Rating < 7){
      displaytekst = "Mwua"
    }
    else if (Rating >= 1 && Rating < 5){
      displaytekst = "des niks"
    }
    else{
      displaytekst = "ffkes kijken"
    }


  return (
    <>

    <div className='MovieInfo'>
      <h1>
        {displaytekst}
      </h1>
      <>
          {!showResult
          ?<>
          <p>geen tekst</p>
          </>:<div className='result'>
                <div className='result-title'>
                  {loading
                  ?<div className='loader'>
                    <i className="fa-solid fa-gear"></i>
                    <p>Onze reviewers zijn nog snel effkes iets in elkaar aan het flansen</p>
                  </div>
                  :<p className='result-tekst'>{resultData}</p>
                  }
                </div>
            </div>
          }
      </>
    </div>
    </>
  )
}
