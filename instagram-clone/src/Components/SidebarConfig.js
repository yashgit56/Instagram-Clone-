import { AiFillCompass, AiFillHeart, AiFillHome , AiFillMessage, AiFillPlusCircle, AiOutlineCompass, AiOutlineHeart, AiOutlineHome, AiOutlineMessage, AiOutlinePlusCircle, AiOutlineSearch } from 'react-icons/ai'
import { RiVideoFill, RiVideoLine } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'

export const menus = [
    {
        title:"Home",
        icon: <AiOutlineHome className='text-2xl mr-5 inline-block' /> ,
        activeIcon: <AiFillHome className='text-2xl mr-5 inline-block' />
    },
    {
        title:"Search",
        icon: <AiOutlineSearch className='text-2xl mr-5 inline-block' /> ,
        activeIcon: <AiOutlineSearch className='text-2xl mr-5 inline-block' />
    },
    {
        title:"Explore",
        icon: <AiOutlineCompass className='text-2xl mr-5 inline-block' /> ,
        activeIcon: <AiFillCompass className='text-2xl mr-5 inline-block' />
    },
    {
        title:"Reels",
        icon: <RiVideoLine className='text-2xl mr-5 inline-block' /> ,
        activeIcon: <RiVideoFill className='text-2xl mr-5 inline-block' />
    },
    {
        title:"Message",
        icon: <AiOutlineMessage className='text-2xl mr-5 inline-block' /> ,
        activeIcon: <AiFillMessage className='text-2xl mr-5 inline-block' />
    },
    {
        title:"Notification",
        icon: <AiOutlineHeart className='text-2xl mr-5 inline-block' /> ,
        activeIcon: <AiFillHeart className='text-2xl mr-5 inline-block' />
    },
    {
        title:"Create",
        icon: <AiOutlinePlusCircle className='text-2xl mr-5 inline-block' /> ,
        activeIcon: <AiFillPlusCircle className='text-2xl mr-5 inline-block' />
    },
    {
        title:"Profile",
        icon: <CgProfile className='text-2xl mr-5 inline-block' /> ,
        activeIcon: <CgProfile className='text-2xl mr-5 inline-block' />
    }
]