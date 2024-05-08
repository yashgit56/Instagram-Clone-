import React from 'react'
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay
} from '@chakra-ui/react'
import { BsThreeDots, BsBookmark, BsBookmarkFill, BsEmojiSmile } from 'react-icons/bs'
import CommentCard from './CommentCard'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { RiSendPlaneLine } from 'react-icons/ri'
import { FaRegComment } from 'react-icons/fa'
import './commentModal.css' 

const CommentModal = ({onClose,isOpen, isBookMarked, isPostLiked, handlePostLike,  handleBookMarked, imageSrc}) => {
  return (
    <div>
        <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay></ModalOverlay>
            <ModalContent>
            
            <ModalBody>
                <div className='h-[75vh] flex'>
                    <div className='w-[45%] flex flex-col justify-center'>
                        <img className='max-h-full w-full' src={imageSrc} alt=''></img>
                    </div>
                    <div className='w-[55%] pl-10 relative'>
                        <div className='flex items-center justify-between py-5'>
                            <div className='flex items-center'>
                                <div className=''>
                                    <img 
                                        className='w-9 h-9 rounded-full p-1'  
                                        src='kavya.png' 
                                        alt='' 
                                    />
                                </div>
                                <div className='ml-2'>
                                    <p> Kavya Maran </p>
                                </div>
                                
                            </div>

                            <BsThreeDots />
                        </div>

                        <hr className='w-full' />

                        <div className='comment'>
                            {[1,1].map((e)=> <CommentCard /> )}
                        </div>

                        <div className='absolute bottom-0 w-[90%]'>
                            <div className='w-full flex items-center justify-between py-4'>
                                <div className='flex items-center space-x-2'>
                                    { isPostLiked ? 
                                        <AiFillHeart className='text-2xl hover:opacity-50 cursor-pointer text-red-600' onClick={handlePostLike} /> : 
                                        <AiOutlineHeart className='text-2xl hover:opacity-50 cursor-pointer' onClick={handlePostLike} />
                                    }
                                    <FaRegComment className='text-xl hover:opacity-50 cursor-pointer'></FaRegComment>
                                    <RiSendPlaneLine className='text-xl hover:opacity-50 cursor-pointer'></RiSendPlaneLine>
                                </div>
                                <div className='inline-block'>
                                    { isBookMarked ?
                                        <BsBookmarkFill className='text-xl hover:opacity-50 cursor-pointer' onClick={handleBookMarked} /> :
                                        <BsBookmark className='text-xl hover:opacity-50 cursor-pointer' onClick={handleBookMarked} />
                                    }
                                </div>
                            </div>

                            <div className='w-full py-1'> 
                                <p> 10 Likes </p>
                                <p className='opacity-50 text-sm'> 1 day ago </p>
                            </div>

                            
                            <div className='flex items-center w-full'>
                                <BsEmojiSmile />
                                <input 
                                    type="text" 
                                    className='commentInput' 
                                    placeholder='Add a comment...'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
            </ModalContent>
        </Modal>
    </div>
  )
}

export default CommentModal