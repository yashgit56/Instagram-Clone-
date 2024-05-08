import React from 'react'

const SuggestionCard = () => {
  return (
    <div className='flex items-center justify-between'>
        <div className='flex items-center'>
            <img className='w-9 h-9 rounded-full' src='kavya.png' alt=''></img>
            <div className='ml-5'>
                <p className='text-sm font-semibold'> username </p>
                <p className='text-sm font-semibold opacity-70'> Follows you </p>
            </div>
        </div>
        <p className='text-blue-700 text-sm font-semibold'> Follow </p>
    </div>
  )
}

export default SuggestionCard