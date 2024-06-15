import React from 'react'
import Sidebar from '../../Components/Sidebar'
import HomePage from '../HomePage' 
import { Route, Routes, useLocation } from 'react-router-dom'
import ProfilePage from '../ProfilePage'
import Auth from '../Auth/Auth'
import EditAccountDetails from '../../Components/EditAccount/EditAccountDetails'
import StoryPage from '../Story/StoryPage'
import StoryCreate from '../../Components/Story/StoryCreate'

const Router = () => {
    const location = useLocation() ;

  return (
    <div>
        { 
            location.pathname !== "/login" && location.pathname !== "/signup" 
            ?
                (
                    <div className='flex'>
                        <div className='w-[20%] border border-l-slate-500'>
                            <Sidebar />
                        </div>
                        <div className='w-full'>
                            <Routes>
                                <Route path='/' element={<HomePage />} />
                                <Route path='/:username' element={<ProfilePage />} />
                                <Route path='/story/:userId' element={<StoryPage />} />
                                <Route path='/story/create' element={<StoryCreate />} />
                                <Route path='/comment/:postId' element={<HomePage />} />
                                <Route path='/account/edit' element={<EditAccountDetails />} />
                            </Routes>
                        </div>
                    </div>
                )    
            :
                (
                    <div>
                        <Routes>
                            <Route path='/signup' element={<Auth />} />
                            <Route path='/login' element={<Auth />} />
                        </Routes>
                    </div>
                )
        }
    </div>
  )
}

export default Router