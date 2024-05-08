import React, { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

const CommentCard = () => {

    const  [ isCommentLiked , setIsCommentLiked ] = useState(false) ;

    const handleCommentLike = () => {
        setIsCommentLiked(!isCommentLiked) ; 
    }

  return (
    <div>
        <div className='flex items-center justify-between py-3'>
            <div className='flex items-center'>
                <div>
                    <img className='w-9 h-9 rounded-full' src='kavya.png' alt='' />
                </div>
                <div className='ml-3'>
                    <p>
                        <span className='font-semibold'> username </span>
                        <span className='ml-2'> nice post </span>
                    </p>
                    <div className='flex items-center space-x-2 text-xs opacity-60 pt-1.5'>
                        <span> 2 min ago </span>
                        <span> 23 likes </span>
                    </div>
                </div>    
            </div>

            { isCommentLiked ?
                 <AiFillHeart onClick={handleCommentLike} className='text-xs hover:opacity-50 cursor-pointer text-red-600 mr-3 '  /> :
                 <AiOutlineHeart onClick={handleCommentLike} className='text-xs hover:opacity-50 cursor-pointer mr-3 ' />
            }
        </div>
    </div>
  )
}

export default CommentCard