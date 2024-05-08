import React from 'react'
import Sidebar from '../../Components/Sidebar'
import HomePage from '../HomePage' 
import { Route, Routes } from 'react-router-dom'
import ProfilePage from '../ProfilePage'

const router = () => {
  return (
    <div>
        <div className='flex'>
            <div className='w-[20%] border border-l-slate-500'>
                <Sidebar />
            </div>
            <div className='w-full'>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/username' element={<ProfilePage />} />
                </Routes>
            </div>
        </div>
    </div>
  )
}

export default router