import React, { useEffect, useState } from 'react'
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
import { useDispatch, useSelector } from 'react-redux'
import { createCommentHandler } from '../../Redux/Comment/Action'
import { useParams } from 'react-router-dom'
import { findPostByIdHandler } from '../../Redux/Post/Action'
import { timeDifference } from '../../Config/Logics'

const CommentModal = ({onClose,isOpen, isBookMarked, isPostLiked, handlePostLike, handlePostUnlike,  handleBookMarked, handleUnBookmarked}) => {

    const [ commentContent, setCommentContent ] = useState("") ;
    const dispatch = useDispatch() ;
    const token = localStorage.getItem("token") ;
    const { postId } = useParams() ;
    const { comment, post, user } = useSelector( store => store) ;

    useEffect(()=>{
        const data = {
            jwt: token,
            postId
        };
        if(postId){
            dispatch(findPostByIdHandler(data)) ;
        }
    },[comment.createdComment,postId, comment.likeComment, comment.unlikeComment, post.singlePost?.likedByUsers, dispatch,token]);

  return (
    <div>
        <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay></ModalOverlay>
            <ModalContent>
            
            <ModalBody>
                <div className='h-[75vh] flex'>
                    <div className='w-[45%] flex flex-col justify-center'>
                        <img 
                            className='max-h-full w-full' 
                            src={post.singlePost?.image} 
                            alt=''
                        />
                    </div>
                    <div className='w-[55%] pl-10 relative'>
                        <div className='flex items-center justify-between py-5'>
                            <div className='flex items-center'>
                                <div className=''>
                                    <img 
                                        className='w-9 h-9 rounded-full p-1'  
                                        src={ user.reqUser?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
                                        alt='' 
                                    />
                                </div>
                                <div className='ml-2'>
                                    <p> { user.reqUser?.username } </p>
                                </div>
                                
                            </div>

                            <BsThreeDots />
                        </div>

                        <hr className='w-full' />

                        <div className='comment'>
                            {post.singlePost?.comments.length > 0 ? 
                                post.singlePost?.comments?.map((item)=> <CommentCard comment={item} />) :
                                <div className='flex flex-col items-center justify-center'>
                                    <p className='text-lg font-bold'> No Comments Yet. </p>
                                    <p> Start the conversation </p>
                                </div>
                            }
                        </div>

                        <div className='absolute bottom-0 w-[90%]'>
                            <div className='w-full flex items-center justify-between py-4'>
                                <div className='flex items-center space-x-2'>
                                    { isPostLiked ? 
                                        <AiFillHeart className='text-2xl hover:opacity-50 cursor-pointer text-red-600' onClick={handlePostUnlike} /> : 
                                        <AiOutlineHeart className='text-2xl hover:opacity-50 cursor-pointer' onClick={handlePostLike} />
                                    }
                                    <FaRegComment className='text-xl hover:opacity-50 cursor-pointer'></FaRegComment>
                                    <RiSendPlaneLine className='text-xl hover:opacity-50 cursor-pointer'></RiSendPlaneLine>
                                </div>
                                <div className='inline-block'>
                                    { isBookMarked ?
                                        <BsBookmarkFill className='text-xl hover:opacity-50 cursor-pointer' onClick={handleUnBookmarked} /> :
                                        <BsBookmark className='text-xl hover:opacity-50 cursor-pointer' onClick={handleBookMarked} />
                                    }
                                </div>
                            </div>

                            <div className='w-full py-1'> 
                                { post.singlePost?.likedByUsers.length > 0 && (<p> { post.singlePost?.likedByUsers.length } Likes </p>)}
                                <p className='opacity-50 text-sm'> { timeDifference(post.singlePost?.createdAt) } </p>
                            </div>

                            
                            <div className='flex items-center w-full'>
                                <BsEmojiSmile />
                                <input 
                                    type="text" 
                                    className='commentInput' 
                                    placeholder='Add a comment...'
                                    value={commentContent}
                                    onChange={(e) => setCommentContent(e.target.value)}
                                    onKeyPress={(e)=>{
                                        if(e.key === "Enter"){
                                            const data = {
                                                postId,
                                                jwt:token,
                                                data:{
                                                    content:commentContent
                                                }
                                            };
                                            dispatch(createCommentHandler(data));
                                            setCommentContent("");
                                        }
                                    }}
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