import React from 'react'
import './Auth.css'
import Signin from '../../Components/Authentication/Signin'
import { useLocation } from 'react-router-dom'
import Signup from '../../Components/Authentication/Signup'

const Auth = () => {

    const location = useLocation() ;

  return (
    <div>
        <div className='flex items-center justify-center h-[100vh] space-x-5'>
            {/* <div className='relative hidden lg:block'>
                <div className='h-[35.3rem] w-[40rem]'>
                    <img
                        className='h-full w-full' 
                        src='instagram-bg.png' 
                        alt='' 
                    />
                    <div className='mobileWallpaper h-[26rem] w-[12rem] absolute top-20 right-52'>

                    </div>
                </div>
            </div> */}
            <div className='w-[40vw] lg:w-[23vw]'>
                {location.pathname==="/login" ? <Signin /> : <Signup />}
            </div>
        </div>
    </div>
  )
}

export default Auth