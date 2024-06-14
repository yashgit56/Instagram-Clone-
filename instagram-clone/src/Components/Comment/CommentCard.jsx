import React, { useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { isCommentLikedByUser, timeDifference } from '../../Config/Logics';
import { likeCommentHandler, unlikeCommentHandler } from '../../Redux/Comment/Action';

const CommentCard = ({comment}) => {

    const  [ isCommentLiked , setIsCommentLiked ] = useState(false) ;
    const dispatch = useDispatch() ;
    const token = localStorage.getItem("token") ;
    const { user } = useSelector( store => store) ;

    useEffect(()=>{
        setIsCommentLiked(isCommentLikedByUser(comment,user.reqUser.id));
    },[user.reqUser]);

    console.log("comment: ", comment) ;

    const data = {
        jwt: token,
        commentId: comment.id 
    };
    
    const handleCommentLike = () => {
        setIsCommentLiked(true) ; 
        dispatch(likeCommentHandler(data));
    }

    const handleCommentUnlike = () => {
        setIsCommentLiked(false) ; 
        dispatch(unlikeCommentHandler(data));
    }

  return (
    <div>
        <div className='flex items-center justify-between py-3'>
            <div className='flex items-center'>
                <div>
                    <img 
                        className='w-9 h-9 rounded-full' 
                        src={ comment?.user?.userImage || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }
                        alt='comment user image' 
                    />
                </div>
                <div className='ml-3'>
                    <p>
                        <span className='font-semibold'> { comment?.user?.username } </span>
                        <span className='ml-2'> { comment?.content } </span>
                    </p>
                    <div className='flex items-center space-x-2 text-xs opacity-60 pt-1.5'>
                        <span> { timeDifference(comment?.createdAt) } </span>
                        { comment?.likedByUsers?.length > 0 && (
                            <span> { comment?.likedByUsers?.length } Likes </span>
                        )}
                    </div>
                </div>    
            </div>

            { isCommentLiked ?
                 <AiFillHeart onClick={handleCommentUnlike} className='text-xs hover:opacity-50 cursor-pointer text-red-600 mr-3 '  /> :
                 <AiOutlineHeart onClick={handleCommentLike} className='text-xs hover:opacity-50 cursor-pointer mr-3 ' />
            }
        </div>
    </div>
  )
}

export default CommentCard