import React, { useState } from 'react'
import './SearchComponent.css'
import SearchUserCard from './SearchUserCard'
import { RxCrossCircled } from 'react-icons/rx'
import { useDispatch, useSelector } from 'react-redux'
import { searchUserAction } from '../../Redux/User/Action'

const SearchComponent = () => {

  const dispatch = useDispatch() ;
  const token = localStorage.getItem("token") ;
  const { user } = useSelector(store=>store) ;
  const [ searchQuery, setSearchQuery ] = useState("") ;

  const handleSearch = (e) => {
    setSearchQuery(e.target.value) ;
    const data = {
      jwt:token,
      query: searchQuery 
    };
    dispatch(searchUserAction(data)) ;
  }
  
  return (
    <div className='searchContainer'>
        <div className='px-3 pb-5'>
            <h1 className='text-xl pb-5'> Search </h1>
            <div className='relative flex items-center'>
              <input 
                type='text' 
                placeholder='Search...' 
                className='searchInput' 
                value={searchQuery}
                onChange={handleSearch} 
              />
              <div className='absolute right-2 top-1/2 transform -translate-y-1/2'>
                <RxCrossCircled className='text-gray-500' />
              </div>
            </div>
        </div>

        <hr />

        <div className='px-3 pt-5'>
          {user.searchUser?.map((item)=> 
            <SearchUserCard user={item} />
          )}
        </div>
    </div>
  )
}

export default SearchComponent