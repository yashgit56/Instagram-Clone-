import React from 'react'
import { TbCircleDashed } from 'react-icons/tb'

const UserDetails = () => {
  return (
    <div className='py-10 w-full'>
        <div className="flex items-center">
            <div className='w-[15%]'>    
                <img className='w-32 h-32 rounded-full' src='https://i.stack.imgur.com/QLyI4.png' alt='non-user' />
                <p className='font-semibold ml-4 mt-4'> Yash Vataliya </p>
            </div>

            <div className='space-y-5'>
                <div className='flex space-x-10 items-center'>
                    <p> username </p>
                    <button> Edit Profile </button>
                    <button> View Archieve </button>
                    <TbCircleDashed className='h-4 w-4 cursor-pointer' />
                </div>
                <div className='flex space-x-10 mt-2'>
                    <div>
                        <span className='font-semibold mr-2'> 10 </span>
                        <span> posts </span>
                    </div>
                    <div>
                        <span className='font-semibold mr-2' > 9 </span>
                        <span> followers </span>
                    </div>
                    <div>
                        <span className='font-semibold mr-2' > 10 </span>
                        <span> following </span>
                    </div>
                </div>
                <div className='insta-bio'>
                    <p className='font-thin text-sm' > Coding is not just syntax and functions. It's creativity and curiosity. - Unknown </p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default UserDetails ;