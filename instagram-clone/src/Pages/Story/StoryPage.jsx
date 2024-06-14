import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import StoryViewer from '../../Components/StoryComponents/StoryViewer';
import { findStoryByUserId } from '../../Redux/Story/Action';

const StoryPage = () => {
    const token = localStorage.getItem("token") ;
    const dispatch = useDispatch() ;
    const { userId } = useParams() ;
    const { story } = useSelector(store=>store) ;
    
    useEffect(()=>{
        const data = {
            jwt: token,
            userId
        };
        dispatch(findStoryByUserId(data));
    },[userId]) ;

  return (
    <div>
        <StoryViewer stories={story?.stories} />
    </div>
  )
}

export default StoryPage