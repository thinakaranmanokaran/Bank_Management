import React from 'react';
import { useAuth } from '../../contexts';
import images from '../../assets/images';

const Profile = () => {
    const { currentUser } = useAuth();

    return (
        <div className="w-full flex items-center justify-center ">
            <div className=" shadow-lg items-center space-x-6  flex ">
                <div className="flex  justify-center mb-6">
                    <img
                        src={images.Profile}
                        alt="Profile"
                        className="min-w-60 h-60 rounded-full object-cover "
                    />
                </div>
                <div className='' >
                    <h2 className="text-5xl font-gotham mb-2 ">{currentUser?.name}</h2>
                    {/* <p className=" mb-6">{currentUser?.position || 'No Position'}</p> */}

                    <div className="space-y-4">
                        <p className='text-light font-main' >{currentUser?.email}</p>
                        <p>+{currentUser?.phone}</p>
                        {/* <p> {currentUser?.dob}</p> */}
                        {/* <p> {currentUser?.gender}</p> */}
                        {/* <p> {currentUser?.role}</p> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
