import React, { useEffect } from 'react'
import UserDetails from '../Components/ProfileComponent/UserDetails'
import ReqUserPostPart from '../Components/ProfileComponent/ReqUserPostPart'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { findUserByUsernameAction, getUserProfileAction } from '../Redux/User/Action'
import { isFollowingUser, isReqUser } from '../Config/Logics'

const ProfilePage = () => {

  const dispatch = useDispatch() ;
  const token = localStorage.getItem("token") ;
  const { username } = useParams() ;
  const { user } = useSelector( store => store) ;

  console.log("user found with username: " ,user.findByUsername) ;
  const isRequser = isReqUser(user.reqUser?.id,user.findByUsername?.id) ;
  const isFollowing = isFollowingUser(user.reqUser,user.findByUsername) ;

  useEffect(()=>{
    const data = {
      jwt:token,
      username 
    };
    dispatch(getUserProfileAction(token)) ;
    dispatch(findUserByUsernameAction(data));
  },[username, user.follower, user.following]) ;

  return (
    <div className='px-28'>
        <div>
            <UserDetails 
              user={ isRequser ? user.reqUser : user.findByUsername } 
              isFollowing={isFollowing} 
              isReqUser={isRequser} 
              jwtToken={token}
            />
        </div>
        <div>
            <ReqUserPostPart 
              user={ isRequser ? user.reqUser : user.findByUsername } 
            />
        </div>
    </div>
  )
}

export default ProfilePage