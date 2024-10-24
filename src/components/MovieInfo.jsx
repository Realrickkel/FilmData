import React, { useContext, useState, useEffect } from 'react'
import { Context } from '../context/Context'

export default function MovieInfo(props) {
    const {movieInfo, setMovieInfo, showResult, setShowResult, resultData, setResultData, loading, setLoading} = useContext(Context)

    var reviewText
    const [displayText,setDisplayText] = useState('Ffkes kijken')
    var Rating = Number(movieInfo.imdbRating)
    
    const RatingSystem = () =>{

      if (Rating >= 8 && Rating < 10){
        setDisplayText('Goei spul!')
      }
      else if(Rating >= 7 && Rating < 8)
        {
          setDisplayText('Da is een mooi filmpke')
        }
        else if  (Rating >= 5 && Rating < 7){
          setDisplayText('Mwua')
        }
        else if (Rating >= 1 && Rating < 5){
          setDisplayText('des niks')
        }
        else{
          setDisplayText('ffkes kijken')
        }
      }

      //als MovieInfo veranderd, run ratingsystem useEffect gebruikt de geupdate values
      useEffect(()=>{
        RatingSystem()
      },[movieInfo])


  return (
    <>

    <div className='MovieInfo'>
      <h1>
        {displayText}
      </h1>
      <>
          {!showResult
          ?<>
          <p>Klik op een film of zoek een andere op om mijn review te ontvangen!</p>
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
