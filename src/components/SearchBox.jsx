import React from 'react'

  //luistert of enter wordt ingedrukt om te zoeken, eerst fiksen dat je met een knop alleen kan zoeken
  /*var enterPressed = document.getElementById("searchBoxField");
  enterPressed.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("myBtn").click();
    }
  });*/

export default function SearchBox(props) {
    const{searchValue,setSearchValue, movies, setMovies} = props

    function searchStart () {
      const moviePosterClass = document.getElementsByClassName('movie-poster');
      var i
      for(i=0; i<movies.length; i++)
      {
          moviePosterClass[i].id = ""
      }
      document.getElementById("lijn-component").className = ""
      var inputFieldValue = document.getElementById("searchBoxField")
      var btnClicked = inputFieldValue.value
      props.setSearchValue(btnClicked)
    }

    const handleKeyPress = (event) => {
      // look for the `Enter` keyCode
      if (event.keyCode === 13 || event.which === 13) {
        searchStart()
      }
    }

  return (
    <div className='col-small'>
        <input className='form-control'
        value={props.value} 
        placeholder='Zoek...' id="searchBoxField" onKeyPress={handleKeyPress}></input>
        <button id="myBtn" onClick={searchStart} >Zoek!</button>
    </div>
  )
}
