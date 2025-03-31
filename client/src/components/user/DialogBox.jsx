import React from 'react'
import { useAuth } from './../../contexts'
import { Link } from "react-router-dom";

const DialogBox = () => {

    const { currentUser } = useAuth();

    return (
        <div>
            <div className='fixed flex top-0 left-0 bg-[#ffffff10] justify-center items-center backdrop-blur-sm h-screen w-screen'  >
                <div className='bg-dark w-1/2 p-8 font-sfpro rounded-4xl shadow-md ' >
                    <div>
                        <div className='text-xl p-4  ' >Dear {currentUser ? currentUser.name : "User"}, <span className='text-[#ffffff60] ' >You must enable Face Authenticate and Register that in our Database to Access Your Bank Account. Yes this is 2FA Authentication </span> But you can't skip ! </div>
                        <div className='mt-6 flex justify-end' >
                            <Link to={`/faceauth`} className='bg-green cursor-pointer px-6 py-2 rounded-full text-xl text-dark' >Authenticate</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogBox