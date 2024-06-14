import React, { useEffect, useState } from 'react'
import { AiOutlineTable , AiOutlineUser } from 'react-icons/ai'
import { RiVideoAddLine } from 'react-icons/ri'
import { BiBookmark } from 'react-icons/bi'
import ReqUserPostCard from './ReqUserPostCard'
import { useDispatch, useSelector } from 'react-redux'
import { reqUserPostHandler } from '../../Redux/Post/Action'

const ReqUserPostPart = ({user}) => {

    const [ activeTab , setActiveTab ] = useState("Post") ;
    const dispatch = useDispatch() ;
    const token = localStorage.getItem("token") ;
    const { post } = useSelector( store => store ) ;

    const tabs = [
        {
            tab: "Post",
            icon: <AiOutlineTable />,
            activeTab: ""
        },
        {
            tab: "Reels",
            icon: <RiVideoAddLine />,
            activeTab: ""
        },
        {
            tab: "Saved",
            icon: <BiBookmark />,
            activeTab: ""
        },
        {
            tab: "Tagged",
            icon: <AiOutlineUser />,
            activeTab: ""
        }
    ];

    useEffect(()=>{
        if(user){
            const data={
                jwt:token,
                userId: user.id 
            };
            dispatch(reqUserPostHandler(data));
        }
    },[user,post.createdPost,dispatch,token]) ;

  return (
    <div>
        <div className='flex items-center justify-center space-x-14 border-t relative'>
            {tabs.map((tab)=>(
                <div onClick={()=> setActiveTab(tab.tab)} className={`${activeTab===tab.tab?"border-t border-black":"opacity-60"} flex items-center cursor-pointer py-2 text-sm`}>
                    <p> { tab.icon } </p>
                    <p className='ml-1 text-sm' > {tab.tab} </p>
                </div>
            ))}
        </div>
        <div>
            <div className='flex flex-wrap'>
                {
                    activeTab === "Post" &&
                        post.usersPost?.map((item)=>(
                            <ReqUserPostCard post={item} />
                        ))
                }
                {
                    activeTab === "Saved" &&
                        user.savedPost?.map((item)=>(
                            <ReqUserPostCard post={item} />
                        ))
                }
            </div>
        </div>
    </div>
  )
}

export default ReqUserPostPart