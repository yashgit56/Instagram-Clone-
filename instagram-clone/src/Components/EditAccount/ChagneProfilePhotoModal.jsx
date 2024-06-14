import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay } from '@chakra-ui/react'
import React from 'react'

const ChagneProfilePhotoModal = ({isOpen, onClose, onOpen, handleProfileImageChange, profilePhoto}) => {
  return (
    <>
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"}>
                    <div className='flex flex-col items-center justify-center'>
                        <img className='h-24 w-24 rounded-full' src={profilePhoto} alt='' />
                        <p className='font-semibold py-2'> Synced Profile Photo </p>
                    </div>
                </ModalHeader>
                <ModalBody>

                    <hr />

                    <div className='flex flex-col items-center'>
                        <label 
                            for='profileImage'
                            className='font-bold text-sm py-3 text-blue-600 text-center cursor-pointer w-full'
                        >
                            Upload Photo 
                        </label>
                        <input 
                            type='file' 
                            name='profileImage' 
                            id='profileImage' 
                            onChange={handleProfileImageChange} 
                        />
                    </div>

                    <hr />

                    <p className='font-bold py-3 text-red-600 text-center cursor-pointer'>
                        Remove Current Photo 
                    </p>

                    <hr />

                    <p className='py-3 text-center cursor-pointer' onClick={onClose}>
                        Cancel 
                    </p>

                </ModalBody>
            </ModalContent>
        </Modal>
    </>
  )
}

export default ChagneProfilePhotoModal