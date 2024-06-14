import React, { useEffect, useState } from 'react'
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import './Postcard.css'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiSendPlaneLine } from 'react-icons/ri';
import  CommentModal  from '../Comment/CommentModal'
import { useDisclosure } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { likePostHandler, savePostHandler, unlikePostHandler, unsavePostHandler } from '../../Redux/Post/Action';
import { isPostLikedByUser, isSavedPost } from '../../Config/Logics';
import { useNavigate } from 'react-router-dom';

const PostCard = ({post}) => {

    const [ showDropdown, setShowDropdown] = useState(false) ;
    const [ isPostLiked , setIsPostLiked ] = useState(false) ; 
    const [ isBookMarked, setIsBookMarked ] = useState(false) ;
    const { isOpen, onOpen, onClose } = useDisclosure() ;
    const dispatch = useDispatch() ;
    const { user } = useSelector( store => store) ;
    const token = localStorage.getItem("token") ;
    const navigate = useNavigate() ;

    const data = {
        jwt: token,
        postId: post?.id 
    };

    const handleClick = () => {
        setShowDropdown(!showDropdown) ;
    }

    const handlePostLike = () => {
        setIsPostLiked(true) ;
        dispatch(likePostHandler(data)) ;
    }

    const handlePostUnlike = () => {
        setIsPostLiked(false) ;
        dispatch(unlikePostHandler(data));
    }

    const handleBookMarked = () => {
        setIsBookMarked(true) ;
        dispatch(savePostHandler(data));
    } 

    const handleUnBookMarked = () => {
        setIsBookMarked(false) ;
        dispatch(unsavePostHandler(data)) ;
    } 

    const handleOpenCommentModal = () => {
        navigate(`/comment/${post.id}`)
        onOpen()
    }

    useEffect(()=>{
        setIsPostLiked(isPostLikedByUser(post,user?.reqUser?.id));
        setIsBookMarked(isSavedPost(user?.reqUser,post.id)) ;
    },[post.likedByUsers, user.reqUser,post]) ;

  return (
    <div>
        <div className='border rounded-md w-full'>
            <div className='flex items-center justify-between w-full px-5 py-4'>
                <div className='flex items-center justify-start' >
                    <img 
                        className='h-12 w-12 rounded-full mr-2'     
                        src={post.user.userImage || "https://cdn.pixabay.com/photo/2015/03/04/22/35/avatar-659651_1280.png"} 
                        alt='' 
                    />
                    <div className='pl-2'>
                        <p className='font-semibold text-sm'> { post?.user?.username } </p>
                        <p className='font-thin text-sm'> { post.location } </p>
                    </div>
                </div>
                <div className='dropdown'>
                    <BsThreeDots className='dots' onClick={handleClick} />
                    <div className='dropdown-content'>
                        { showDropdown && <p className='bg-black text-white font-medium py-1 px-4 rounded-md cursor-pointer'> Delete </p> }
                    </div>
                </div>
            </div>

            <div className='w-full'>
                <img className='w-full h-auto' src={post?.image} alt='' />
            </div>

            <div className='w-full flex items-center justify-between px-5 py-4'>
                <div className='flex items-center space-x-2'>
                    { isPostLiked ? 
                        <AiFillHeart className='text-2xl hover:opacity-50 cursor-pointer text-red-600' onClick={handlePostUnlike} /> : 
                        <AiOutlineHeart className='text-2xl hover:opacity-50 cursor-pointer' onClick={handlePostLike} />
                    }
                    <FaRegComment onClick={handleOpenCommentModal} className='text-xl hover:opacity-50 cursor-pointer'></FaRegComment>
                    <RiSendPlaneLine className='text-xl hover:opacity-50 cursor-pointer'></RiSendPlaneLine>
                </div>
                <div className='inline-block'>
                    { isBookMarked ?
                        <BsBookmarkFill className='text-xl hover:opacity-50 cursor-pointer' onClick={handleUnBookMarked} /> :
                        <BsBookmark className='text-xl hover:opacity-50 cursor-pointer' onClick={handleBookMarked} />
                    }
                </div>
            </div>

            <div className='w-full py-1 px-5'> 
                { (post?.likedByUsers?.length > 0) && <p> {post?.likedByUsers?.length} Likes </p> } 
                { (post?.comments?.length > 0) && <p onClick={handleOpenCommentModal} className='py-2 opacity-50 cursor-pointer'> View all {post?.comments?.length} comments </p> }
            </div>

            <div className='border border-t w-full'>
                <div className='flex w-full items-center px-5'>
                    <BsEmojiSmile />
                    <input type="text" className='commentInput' placeholder='Add a comment...'></input>
                </div>
            </div>

            <CommentModal 
                handlePostLike={handlePostLike} 
                handlePostUnlike={handlePostUnlike}
                onClose={onClose} 
                isOpen={isOpen} 
                handleBookMarked={handleBookMarked} 
                handleUnBookMarked={handleUnBookMarked}
                isPostLiked={isPostLiked}
                isBookMarked={isBookMarked}
            />
        </div>

    </div>
  )
}

export default PostCard