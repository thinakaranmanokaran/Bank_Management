import React, { useEffect, useState } from 'react'
import images from './../../assets/images'
import axios from 'axios'
import { useAuth } from '../../contexts'

const Profile = () => {

    const [selectProfile, setSelectProfile] = useState(false)
    const { currentUser } = useAuth();
    const API_URL = import.meta.env.VITE_API_URL;


    const ImageChoose = [
        { id: 1, gender: "men", img: images.Men1 },
        { id: 2, gender: "men", img: images.Men2 },
        { id: 3, gender: "men", img: images.Men3 },
        { id: 4, gender: "men", img: images.Men4 },
        { id: 5, gender: "men", img: images.Men5 },
        { id: 6, gender: "men", img: images.Men6 },
        { id: 7, gender: "men", img: images.Men7 },
        { id: 8, gender: "men", img: images.Men8 },
        { id: 9, gender: "women", img: images.Women1 },
        { id: 10, gender: "women", img: images.Women2 },
        // { id: 11, gender: "women", img: images.Women3 },
        { id: 12, gender: "women", img: images.Women4 },
        { id: 13, gender: "women", img: images.Women5 }
    ];

    const selectedImage = ImageChoose.find((data) => data.id === selectProfile);

    const updateImage = async () => {
        try {
            if (!selectedImage) {
                console.error("No image selected");
                return;
            }

            const response = await axios.put(
                `${API_URL}/api/users/register/update/${currentUser?.email}`,
                { img: selectedImage.id }
            );

            alert(response.data.message);
        } catch (error) {
            console.error(error.response?.data?.message || 'An error occurred');
        }
    };



    return (
        <div className='flex w-full' >
            <div className='w-full mr-4' >
                <div>
                    <h1 className='text-4xl font-lato mb-6' >Change Profile</h1>
                </div>
                <div className='grid grid-cols-4 gap-4 ' >
                    {
                        ImageChoose.map((Data, index) => (
                            <div key={Data.id} className={` transitiona-all duration-300 rounded-full cursor-pointer p-1 w-fit ${selectProfile === Data.id ? "border-2 border-green " : "border-none"}  `}  >
                                <img onClick={() => setSelectProfile(Data.id)} className={`${selectProfile === Data.id ? "max-h-[108px] w-[108px]" : "w-28 max-h-28 "} object-cover object-top rounded-full  `} src={Data.img} alt="" srcset="" />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex justify-center  w-full mt-6 ' >
                <div>
                    <div className='w-full flex justify-center ' >
                        {selectedImage ? (
                            <img src={selectedImage.img} className='w-80 h-80 object-cover object-top rounded-full ' alt={`Selected Profile`} />
                        ) : (
                            <p className='font-sfreg text-lg ' >Select a picture to set as profile</p>
                        )}
                    </div>
                    {selectedImage && <div className=' flex justify-center w-full p-4 mt-4 space-x-4 ' >
                        <button className='bg-[#ffffff20] text-white px-12 py-3 cursor-pointer text-xl font-sfreg rounded-3xl  ' >cancel</button>
                        <button className='bg-green text-dark px-12 py-3 cursor-pointer text-xl font-sfreg rounded-3xl  ' onClick={updateImage} >update</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Profile