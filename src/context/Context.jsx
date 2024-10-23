import { createContext, useState, useEffect, useContext } from "react";

export const Context = createContext();


const ContextProvider = (props) =>{
    
    const [movieInfo, setMovieInfo] = useState('')
    const [showResult, setShowResult] = useState(false)
    const [loading, setLoading] = useState(false)
    const [resultData, setResultData] = useState('')
    
    //dit zijn de values die in de contextprovider worden gestopt, als je dan bij main.jsx contenprovider om app heen zet, gelden deze values voor de gehele app waardoor je maar 1 context file nodig hebt voor alle context
    const contextValue = {
        movieInfo,
        setMovieInfo,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
    }
    
    return(
        <Context.Provider value={contextValue}>
        {props.children}
        </Context.Provider>
)
}

export default ContextProvider
