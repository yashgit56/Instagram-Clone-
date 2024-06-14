import React, { useState } from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import { menus } from './SidebarConfig';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import CreatePostModal from './Postcard/CreatePostModal';
import SearchComponent from './SearchComponents/SearchComponent';
import { AiFillInstagram } from 'react-icons/ai';
import { useSelector } from 'react-redux';


const Sidebar = () => {

  const [ activeTab , setActiveTab ] = useState() ;
  const navigate = useNavigate() ;
  const [ isSearchVisible, setIsSearchVisible ] = useState(false) ;
  const { user } = useSelector( store => store ) ;
  const { isOpen, onOpen, onClose } = useDisclosure() ;

  // console.log("user in sidebar.js : " , user.reqUser)
  

  const handleTabClick = (title) => {
    setActiveTab(title);
    if( title === "Profile"){
      navigate(`${user?.reqUser?.username}`);
    }
    else if( title === "Home"){
      navigate('/') ;
    }
    else if( title === "Create"){
      onOpen() ;
    }
     
    if( title === "Search"){
      setIsSearchVisible(true) ;
    }
    else{
      setIsSearchVisible(false) ;
    }
  }

  const handleLogout = () => {
      localStorage.setItem("token",null) ;
  }

  return (
    <div className='sticky top-0 h-[100vh] flex'>
        <div className={`flex flex-col justify-between h-full ${activeTab === "Search" ? "px-2" : "px-10"} `}>
            {<div>
              { 
                activeTab !== "Search" ? (
                  <div className='pt-10'>
                    <div className='flex items-center cursor-pointer'>
                      <img className='w-40' src="insta-logo.png" alt="" />
                    </div>
                  </div>
              ) : (
                  <div className='pt-10'>
                    <div className='flex items-center cursor-pointer'>
                      <AiFillInstagram className='text-2xl ml-4' />
                    </div>
                  </div>
              )}
        
              <div className='mt-10'>
                {menus.map((item) => (
                  <div onClick={() => handleTabClick(item.title)} className={`flex items-center mb-5 cursor-pointer text-lg ${activeTab === "Search" ? "ml-4" : ""}`}>
                    {activeTab === item.title ? item.activeIcon : item.icon}
                    
                    { activeTab !== "Search" && <p className={`${activeTab===item.title?"font-bold":"font-semi-bold"}`}> {item.title} </p>}
                  </div>
                ))}
              </div>

            </div>}
              <div onClick={handleLogout} className='flex items-center cursor-pointer pb-10'>
                <IoReorderThreeOutline className={`text-2xl ${activeTab === "Search" ? "ml-4": ""}`} />
                { activeTab !== "Search" && <p className='ml-5'> More </p>}
              </div>
        </div>

        <CreatePostModal onClose={onClose} isOpen={isOpen} />
        { isSearchVisible && <SearchComponent />}
    </div>
  )
}

export default Sidebar