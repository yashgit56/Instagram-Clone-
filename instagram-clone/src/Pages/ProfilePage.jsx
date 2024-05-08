import React from 'react'
import UserDetails from '../Components/ProfileComponent/UserDetails'
import ReqUserPostPart from '../Components/ProfileComponent/ReqUserPostPart'

const ProfilePage = () => {
  return (
    <div className='px-28'>
        <div>
            <UserDetails />
        </div>
        <div>
            <ReqUserPostPart />
        </div>
    </div>
  )
}

export default ProfilePage