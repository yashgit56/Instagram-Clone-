import React from 'react'
import { useNavigate } from 'react-router-dom'

const StoryCircle = () => {

  const navigate = useNavigate() ;

  const handleNavigate = () => {
    navigate("/story");
  }

  return (
    <div onClick={handleNavigate} className='flex flex-col items-center cursor-pointer'>
        <img className='w-16 h-16 rounded-full' src='https://cdn.pixabay.com/photo/2023/06/19/14/38/wedi-8074671_1280.jpg' alt='' />
        <p className=''> username </p>
    </div>
  )
}

export default StoryCircle