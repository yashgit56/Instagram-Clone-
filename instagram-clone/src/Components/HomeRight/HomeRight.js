import React from 'react'
import SuggestionCard from './SuggestionCard'

const HomeRight = () => {
  return (
    <div className=''>
      <div>
        <div>
          <div className='flex items-center justify-between'>
            <div className='flex items-center'>
              <div>
                <img className='h-12 w-12 rounded-full' src='kavya.png' alt=''></img>
              </div>
              <div className='ml-3'>
                <p>username</p>
                <p className='opacity-70'>fullname</p>
              </div>
            </div>
            <div>
              <p className='text-blue-700 text-sm font-semibold'> Switch </p>
            </div>
          </div>


          <div className='space-y-5 mt-10'>
            {[1,1,1,1,1,1].map((e)=> <SuggestionCard /> )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeRight