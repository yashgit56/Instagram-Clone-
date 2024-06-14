import React from 'react'
import { RxCrossCircled } from 'react-icons/rx'
import { useNavigate } from 'react-router-dom'

const SearchUserCard = ({ user }) => {

    const navigate = useNavigate() ;

  return (
    <div onClick={()=> navigate(`/${user.username}`)} className='py-2 cursor-pointer'>
        <div className='flex items-center justify-between border rounded-md bg-blue-300'>
            <div className='flex items-center'>
                <img 
                    className='w-7 h-7 rounded-full ml-1' 
                    src={user.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                    alt='' 
                />

                <div className='ml-3'>
                    <p> { user.username } </p>
                    <p className='opacity-70 text-sm'> { user.name} </p>
                </div>
            </div>
            <div>
                <RxCrossCircled className='h-4 w-4 mr-2' />
            </div>
        </div>
    </div>
  )
}

export default SearchUserCard