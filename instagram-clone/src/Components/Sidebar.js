import React, { useState } from 'react'
import { IoReorderThreeOutline } from "react-icons/io5";
import { menus } from './SidebarConfig';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import CreatePostModal from './Postcard/CreatePostModal';


const Sidebar = () => {

  const [ activeTab , setActiveTab ] = useState() ;
  const navigate = useNavigate() ;

  const { isOpen, onOpen, onClose } = useDisclosure() 

  const handleTabClick = (title) => {
    setActiveTab(title);
    if( title === "Profile"){
      navigate('/username');
    }
    else if( title === "Home"){
      navigate('/') ;
    }
    else if( title === "Create"){
      onOpen() ;
    }
  }

  return (
    <div className='sticky top-0 h-[100vh]'>
        <div className='flex flex-col justify-between h-full px-10'>
            <div className='pt-10'>
                <div className='flex items-center cursor-pointer'>
                  
                  <img className='w-40' src="insta-logo.png" alt="" />
                </div>
            </div>
            <div className='mt-10'>
              {menus.map((item) => (
                <div onClick={() => handleTabClick(item.title)} className='flex items-center mb-5 cursor-pointer text-lg'>
                  {activeTab === item.title ? item.activeIcon : item.icon}
                  <p className={`${activeTab===item.title?"font-bold":"font-semi-bold"}`}> {item.title} </p>
                </div>
              ))}
            </div>
            <div className='flex items-center cursor-pointer pb-10'>
              <IoReorderThreeOutline className='text-2xl' />
              <p className='ml-5'> More </p>
            </div>
        </div>
        <CreatePostModal onClose={onClose} isOpen={isOpen} />
    </div>
  )
}

export default Sidebar