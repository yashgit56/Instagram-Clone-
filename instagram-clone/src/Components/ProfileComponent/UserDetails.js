import { Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { TbCircleDashed } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { followUserAction, unfollowUserAction } from '../../Redux/User/Action';
import { MdPersonAdd } from "react-icons/md";

const UserDetails = ({user, isFollowing, isReqUser, jwtToken}) => {

    const navigate = useNavigate() ;
    const dispatch = useDispatch() ;
    const [ userFollowed, setUserFollowed ] = useState(isFollowing) ;
    const { post } = useSelector(store=>store) ;
    
    useEffect(()=>{
        setUserFollowed(isFollowing) ;
    },[isFollowing]) ;

    const handleFollow = () => {
        const data = {
            jwt:jwtToken,
            userId: user.id
        };
        dispatch(followUserAction(data)) ;
        setUserFollowed(true) ;
    }

    const handleUnfollow = () => {
        const data = {
            jwt:jwtToken,
            userId: user.id
        };
        dispatch(unfollowUserAction(data)) ;
        setUserFollowed(false) ;
    }
    

  return (
    <div className='py-10 w-full'>
        <div className="flex items-center">
            <div className='w-[15%]'>    
                <img 
                    className='w-32 h-32 rounded-full'  
                    src={ user?.image || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" } 
                    alt='non-user' 
                />
                <p className='font-semibold ml-4 mt-4'> { user?.name } </p>
            </div>

            <div className='space-y-5'>
                <div className='flex space-x-10 items-center'>
                    <p className='text-lg'> { user?.username } </p>
                    { isReqUser ? 
                        <>
                            <button onClick={() => navigate("/account/edit")}> Edit Profile </button> 
                            <TbCircleDashed className='h-4 w-4 cursor-pointer' />
                        </>
                        :
                        <>
                            {userFollowed ? 
                                <Button colorScheme='blue' onClick={handleUnfollow}> Unfollow </Button> :
                                <Button colorScheme='blue' onClick={handleFollow}> Follow </Button> }
                            {userFollowed && <Button> Message </Button>}
                            <MdPersonAdd></MdPersonAdd>    
                        </>
                    } 
                </div>
                <div className='flex space-x-10 mt-2'>
                    <div>
                        <span className='font-semibold mr-2'> { post?.usersPost?.length } </span>
                        <span> posts </span>
                    </div>
                    <div>
                        <span className='font-semibold mr-2' > { user?.follower?.length } </span>
                        <span> followers </span>
                    </div>
                    <div>
                        <span className='font-semibold mr-2' > { user?.following?.length } </span>
                        <span> following </span>
                    </div>
                </div>
                <div className='insta-bio'>
                    <p className='font-thin text-sm' > { user?.bio } </p>
                </div>
            </div>
        </div>
    </div>
  );
}

export default UserDetails ;