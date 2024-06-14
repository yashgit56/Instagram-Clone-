import React, { useEffect, useState } from 'react'
import './ProgressBar.css'

const ProgressBar = ({index, activeIndex, duration}) => {
  const [ progress, setProgress ] = useState(0) ;

  const isActive = ( index === activeIndex ) ;
  const isPreviousActive = ( index < activeIndex) ;
  

  useEffect(()=>{
    const interval = setInterval(() => {
      setProgress((prevProgress)=>{
        if(prevProgress < 100){
          return prevProgress+1 ;
        }
        clearInterval(interval) ;
        return prevProgress ;
      })
    },duration/100);

    return () => {
      clearInterval(interval);
    }

  },[duration, activeIndex])

  useEffect(()=>{
    setProgress(0)
  },[activeIndex]);

  return (
    <div className={`progress-bar-container ${isActive? "active" : ""}`}>
      <div 
        className={`${isActive ? "progress-bar" : ""}`} 
        style={{width: `${progress}%`}}
      > 
      </div>
      <div 
          className={`${isPreviousActive ? "progress-bar" : ""}`} 
          style={{width: `100%`}}
      > 
      </div>  
    </div>
  )
}

export default ProgressBar