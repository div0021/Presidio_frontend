import axios from 'axios';
import { useRef, useState } from 'react';
import { BiImageAdd } from 'react-icons/bi';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import PropTypes from "prop-types"
import toast from 'react-hot-toast';
import "./UploadImage.css"

const UploadImage = ({handleImage}) => {  
    
    const [image,setImage]=useState(null);

    const inputRef = useRef(null);

    const [isLoading,setIsLoading] = useState(false);
    const handleChange = async (e)=>{

        if(e.currentTarget.files){
        setImage(e.currentTarget.files[0])

        }
    }

    const saveImage = async (e) => {
        e.stopPropagation()
        const data = new FormData();
        data.append("file",image);

        // Preset name
        data.append("upload_preset",import.meta.env.VITE_CLOUDINARY_PRESET);

        // cloudName
        data.append("cloud_name",import.meta.env.VITE_CLOUDINARY_CLOUD_NAME)

        setIsLoading(true);

        try{
            if(image===null){
                return toast.error("Please upload image.");
            }

            const res = await axios.post(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,data);

            const cloudData = await res.data;
            handleImage(cloudData.url)
            toast.success("Image uploaded");
            setImage(null);
        }catch(error){
            console.log("Upload image error",error);
            toast.error("Upload Image error!");
        }
        setIsLoading(false);
    }
  return (
    <div className='uploadimage_container' >

    <div  className={`uploadimage_box`} onClick={()=>inputRef.current?.click()} data-image={image ? "true" : "false"}>

    {image ? (
        <>
        <img className='' width={208} src={image ? URL.createObjectURL(image): ""} />
        <button className='uploadimage_button' type='button' onClick={saveImage}>
            {isLoading ? (
                <p>Loading...</p>
            ) :(<>
                <AiOutlineCloudUpload className="uploadimage_icon"/>
            <span>Upload</span>
            </>)}
        </button>
        </>
    ) : (
        <>
        <BiImageAdd className="uploadimage_icon" />
        <span>Upload</span>
        </>
    )}
    </div>

    <input ref={inputRef} type="file" accept='image/png, image/jpeg,  image/jpg' id="image-upload" className='' style={{display:'none'}} onChange={handleChange}/>

    </div>
  );
};

UploadImage.propTypes = {
    handleImage:PropTypes.func.isRequired,
}
export default UploadImage;