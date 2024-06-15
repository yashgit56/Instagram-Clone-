import React from 'react'
import SuggestionCard from './SuggestionCard'
import { useSelector } from 'react-redux'

const HomeRight = ({user}) => {

  const { post } = useSelector( store => store) ;
  // console.log("suggestion: " , user.suggestionUsers.length) ;
  return (
    <div className=''>
      <div>
        <div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <div>
                <img 
                  className='h-12 w-12 rounded-full' 
                  src={user?.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                  alt=''
                />
              </div>
              <div className='ml-3'>
                <p> { user?.reqUser?.username } </p>
                <p className='opacity-70'> { user?.reqUser?.name } </p>
              </div>
            </div>
            <div>
              <p className='text-blue-700 text-sm font-semibold'> Switch </p>
            </div>
          </div>


          <div className='space-y-5 mt-10'>
            {user?.suggestionUsers?.length > 0 ? user?.suggestionUsers.map((item)=> 
                <SuggestionCard user={item} /> )
                :
                <p> No Suggested Users Found </p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeRight