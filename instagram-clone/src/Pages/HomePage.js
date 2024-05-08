import React from 'react'
import StoryCircle from '../Components/Story/StoryCircle'
import HomeRight from '../Components/HomeRight/HomeRight'
import PostCard from '../Components/Postcard/postcard'


const HomePage = () => {
  return (
    <div>
      <div className='w-[100%] flex mt-10 justify-center'>
        <div className='w-[44%] px-10'>
          <div className='storyDiv flex space-x-3 justify-start w-full rounded-md border p-4'>
            {[1,1,1].map((e) => <StoryCircle />)}
          </div>
          <div className='space-y-10 w-full mt-3'>
            {[1,1,1].map((item)=> <PostCard/>)}
          </div>
        </div>
        <div className='w-[35%]'>
          <HomeRight />
        </div>
        
      </div>
    </div>
  )
}

export default HomePage