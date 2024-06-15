import React, { useEffect, useState } from 'react'
import StoryCircle from '../Components/Story/StoryCircle'
import HomeRight from '../Components/HomeRight/HomeRight'
import PostCard from '../Components/Postcard/postcard'
import { useDispatch, useSelector } from 'react-redux'
import { findUserPostHandler, reqUserPostHandler } from '../Redux/Post/Action'
import { hasStory } from '../Config/Logics'
import { useNavigate } from 'react-router-dom'
import { findUserByUserIdsAction, getSuggestionUsersAction } from '../Redux/User/Action'
import { findStoryByUserId } from '../Redux/Story/Action'


const HomePage = () => {
  const dispatch = useDispatch() ;
  const token = localStorage.getItem("token") ;
  const { user, post } = useSelector( store => store) ;
  const [ userIds, setUserIds ] = useState([]) ;
  const navigate = useNavigate() ;

  useEffect(()=>{
    if(token === null){
      navigate("/login") ;
    }
  },[navigate,token]) ;

  console.log("user in home page: ", user) ;
  console.log("post in home page: ",post) ;

  useEffect(() => {
    const newIds = user?.reqUser?.following.map(followingUser => followingUser.id);
    
    if(newIds?.length > 0){
      setUserIds([user?.reqUser?.id, ...newIds]) ;
    }
    else{
      setUserIds([user?.reqUser?.id]) ;
    }

  },[user.reqUser,navigate,token]) ;

  useEffect(()=>{
    const data = {
      jwt: token,
      userIds: [userIds].join(",") 
    }
    // dispatch(findUserPostHandler(data));
    dispatch(findUserByUserIdsAction(data)) ;
    // dispatch(findStoryByUserId(data)) ;
    // dispatch(getSuggestionUsersAction(token));
  },[userIds, post?.createdPost, post?.deletedPost,navigate,token,dispatch, user?.reqUser?.id ]) ;

  const storyUsers = hasStory(user.findUserByIds) ;
  console.log("story users: " , storyUsers) ;

  return (
    <div>
      <div className='w-[100%] flex mt-10 justify-center'>
        <div className='w-[44%] px-10'>
          <div className='storyDiv flex space-x-3 justify-start w-full rounded-md border p-4'>
            { storyUsers.length > 0 && (
              storyUsers.map((item,index) => (
                <StoryCircle  key={index} user={item} />
              ) 
            ))} 
          </div>
          <div className='space-y-10 w-full mt-3'>
            {post.usersPost?.length > 0 && post.usersPost?.map((item)=> (
              <PostCard post={item} />
            ))}
          </div>
        </div>
        <div className='w-[10%]'></div>
        <div className='w-[28%]'>
          <HomeRight user={user} />
        </div>
        
      </div>
    </div>
  )
}

export default HomePage