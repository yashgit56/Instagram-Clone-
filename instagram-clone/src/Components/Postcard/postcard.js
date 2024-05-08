import React, { useState } from 'react'
import { BsBookmark, BsBookmarkFill, BsEmojiSmile, BsThreeDots } from 'react-icons/bs'
import './Postcard.css'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { RiSendPlaneLine } from 'react-icons/ri';
import  CommentModal  from '../Comment/CommentModal'
import { useDisclosure } from '@chakra-ui/react';

const PostCard = () => {

    const [ showDropdown, setShowDropdown] = useState(false) ;
    const [ isPostLiked , setIsPostLiked ] = useState(false) ; 
    const [ isBookMarked, setIsBookMarked ] = useState(false) ;
    const { isOpen, onOpen, onClose } = useDisclosure() ;
    const [ imageSrc, setImageSrc ] = useState('https://cdn.pixabay.com/photo/2020/02/11/10/24/sea-4839056_1280.jpg');

    const handleClick = () => {
        setShowDropdown(!showDropdown) ;
    }

    const handlePostLike = () => {
        setIsPostLiked(!isPostLiked) ;
    }

    const handleBookMarked = () => {
        setIsBookMarked(!isBookMarked) ;
    } 

    const handleOpenCommentModal = () => {
        onOpen()
    }

    const handleImageClick = () => {
        setImageSrc('./bluetick.png');
    }

  return (
    <div>
        <div className='border rounded-md w-full'>
            <div className='flex items-center justify-between w-full px-5 py-4'>
                <div className='flex items-center justify-start' >
                    <img className='h-12 w-12 rounded-full mr-2' onClick={handleImageClick} src={imageSrc} alt='' />
                    <div className='pl-2'>
                        <p className='font-semibold text-sm'> username </p>
                        <p className='font-thin text-sm'> location </p>
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
                <img className='w-full' src='image.png' alt='' />
            </div>

            <div className='w-full flex items-center justify-between px-5 py-4'>
                <div className='flex items-center space-x-2'>
                    { isPostLiked ? 
                        <AiFillHeart className='text-2xl hover:opacity-50 cursor-pointer text-red-600' onClick={handlePostLike} /> : 
                        <AiOutlineHeart className='text-2xl hover:opacity-50 cursor-pointer' onClick={handlePostLike} />
                    }
                    <FaRegComment onClick={handleOpenCommentModal} className='text-xl hover:opacity-50 cursor-pointer'></FaRegComment>
                    <RiSendPlaneLine className='text-xl hover:opacity-50 cursor-pointer'></RiSendPlaneLine>
                </div>
                <div className='inline-block'>
                    { isBookMarked ?
                        <BsBookmarkFill className='text-xl hover:opacity-50 cursor-pointer' onClick={handleBookMarked} /> :
                        <BsBookmark className='text-xl hover:opacity-50 cursor-pointer' onClick={handleBookMarked} />
                    }
                </div>
            </div>

            <div className='w-full py-1 px-5'> 
                <p> 10 Likes </p>
                <p className='py-2 opacity-50 cursor-pointer'> View all 10 comments </p>
            </div>

            <div className='border border-t w-full'>
                <div className='flex w-full items-center px-5'>
                    <BsEmojiSmile />
                    <input type="text" className='commentInput' placeholder='Add a comment...'></input>
                </div>
            </div>

            <CommentModal 
                handlePostLike={handlePostLike} 
                onClose={onClose} 
                isOpen={isOpen} 
                handleBookMarked={handleBookMarked} 
                isPostLiked={isPostLiked}
                isBookMarked={isBookMarked}
                imageSrc={imageSrc}
            />
        </div>

    </div>
  )
}

export default PostCard