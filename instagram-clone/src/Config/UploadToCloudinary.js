
export const uploadToCloudinary = async (image) => {
    
    if(image){
        const data = new FormData() ;
        data.append("file", image) ;
        data.append("upload_preset","instagram") ;
        data.append("cloud_name","ddyvyk4eg")

        const response = await fetch("https://api.cloudinary.com/v1_1/ddyvyk4eg/image/upload",{
            method: "post",
            body: data 
        });

        const fileData = await response.json() ;

        console.log("filedata: ", fileData ) ;
        console.log("filedata url: ", fileData.url.toString() ) ;
        return fileData.url.toString() ;
        
    }
    
};

