import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button
} from '@chakra-ui/react'
import { FaPhotoVideo } from 'react-icons/fa'
import { GrEmoji } from 'react-icons/gr'
import { GoLocation } from 'react-icons/go'
import './CreatePostModal.css' 

const CreatePostModal = ({
    onClose,
    isOpen
}) => {

    const [ isDragOver, setIsDragOver ] = useState(false) ;
    const [ file, setFile ] = useState() ;
    const [ caption, setCaption ] = useState("") ;

    const handleDrop = (event) => {
        event.preventDefault() ;
        const droppedFile = event.dataTransfer.file[0] ;
        if(droppedFile.type.startsWith("image/") || droppedFile.type.startsWith("video/")){
            setFile(droppedFile) ;
        }

    }

    const handleDragOver = (event) => {
        event.preventDefault() ;
        event.dataTransfer.dropEffect = "copy" ;
        setIsDragOver(true) ;
        console.log("file: " , file);
    }

    const handleDragEnd = () => {
        setIsDragOver(false) ;
    }

    const handleOnChange = (event) => {
        const file = event.target.files[0] ;
        if(file && ( file.type.startsWith("image/") || file.type.startsWith("video/"))){
            setFile(file);
        }
        else{
            setFile(null) ;
            alert("please select an image or video") 
        }
    }

    const handleCaptionChange = (e) => {
        setCaption(e.target.value) ;
    }

  return (
    <div>
        <Modal size={"4xl"} onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent>
            
            <div className='flex items-center justify-between px-5 py-1'>
                <p> Create New Post </p>
                <Button className='inline-flex' variant="ghost" size="sm" colorScheme='blue'> Share </Button>
            </div>

            <hr/>

            <ModalBody>
                <div className='h-[70vh] justify-between flex'>
                    <div className='w-[50%]'>
                        {!file && <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragEnd={handleDragEnd}
                            className='drag-drop h-full' 
                        >
                            <div>
                                <FaPhotoVideo className='text-3xl ml-20' />
                                <p> Drag Photos and Videos here </p>
                            </div>
                            <label htmlFor='file-upload' className='custom-file-upload'> Select From Computer </label>
                            <input type='file'className='fileInput' id='file-upload' accept='image/*, video/*' onChange={handleOnChange} />
                        </div>
                        }

                        {file && <img src={URL.createObjectURL(file)} alt='' />}
                    </div>

                    <div className='w-[1px] border-2 h-full'></div>

                    <div className='w-[50%]'>
                        <div className='flex items-center px-3'>
                            <img className='w-7 h-7 rounded-full' src='image.png' alt='' />
                            <p className='font-semibold ml-4'> username </p>
                        </div>
                        <div className='mt-1 px-2'>
                            <textarea 
                                placeholder='Write a caption...' 
                                className='captionInput' 
                                name="caption" 
                                rows="8"
                                onChange={handleCaptionChange}
                            />
                        </div>
                        <div className='flex justify-between px-2'>
                            <GrEmoji />
                            <p className='opacity-70 text-xs'> {caption?.length} / 2200 </p>
                        </div>
                        <hr className='mt-1' />
                        <div className='p-2 flex justify-between items-center'>
                            <input 
                                type='text'
                                placeholder='location...'
                                name='location'
                                className='locationInput'
                            />     
                            <GoLocation />
                        </div>
                        <hr className='mt-1' />
                    </div>
                </div>
            </ModalBody>
            
            </ModalContent>
        </Modal>
    </div>
  )
}

export default CreatePostModal