import React, { useState } from 'react'
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { Link, NavLink } from 'react-router-dom';
import { IoNotificationsOutline } from "react-icons/io5";
import UserNavigation from '../../database/user/Navigation';
import { RiSettings4Fill } from "react-icons/ri";
import { RiCloseLargeLine } from "react-icons/ri";

const Header = () => {

    const [options, showOptions] = useState(false);
    const [notifications, showNotifications] = useState(false);

    return (
        <div className='bg-[#ffffff10] p-4 rounded-full flex justify-between  ' >
            <div className='flex  items-center space-x-8 ' >
                <div>
                    <Link to="/" className='flex gap-x-2 items-center bg-green  w-fit  px-4 py-3 text-xl  font-main rounded-full text-dark ' ><HiArrowLeft />Back to Home</Link>
                </div>
                <div className=' flex space-x-4 items-center text-sm  font-halo' >
                    {
                        UserNavigation.map((Data, index) => (
                            <NavLink to={Data.link} key={index} className={({ isActive }) => isActive ? " overflow-hidden cursor-pointer  text-green transition-all duration-300" : "group overflow-hidden cursor-pointer hover:text-green transition-all duration-300 "} >
                                <div>{Data.title}</div>
                                <div className='h-[1px] w-full bg-green -translate-x-[110%]  group-hover:translate-x-0 transi duration-300  ' ></div>
                            </NavLink>
                        ))
                    }
                </div>
            </div>
            <div className=' flex items-center' >
                <div className='flex items-center space-x-0' >
                    <div onClick={() => showNotifications(true)} className='text-2xl p-3 hover:bg-[#ffffff20]  cursor-pointer transition-all duration-300 rounded-full text-white  ' > <IoNotificationsOutline /></div>
                    <div className='text-2xl p-3 hover:bg-[#ffffff20]  cursor-pointer transition-all duration-300 rounded-full text-white  ' onClick={() => showOptions(true)} > <RiSettings4Fill /></div>
                </div>
                <div className={`${options ? "right-0" : "right-[-100%]"} shadow-lg bg-[#00000020] backdrop-blur-2xl   transition-transform duration-300 w-80 absolute p-6 py-10  top-0  h-full z-30 `} >
                    <div className='flex justify-between items-center ' >
                        <div className='font-sfpro  text-2xl ' >Settings</div>
                        <button onClick={() => showOptions(false)} className='text-base p-2 rounded-full hover:bg-[#ffffff20] transition-all duration-300 ' ><RiCloseLargeLine /></button>
                    </div>
                </div>
                <div className={`${notifications ? "right-0" : "right-[-100%]"} bg-[#00000020] backdrop-blur-2xl   transition-transform duration-300 w-80 absolute p-6 py-10  top-0  h-full z-30 `} >
                    <div className='flex justify-between items-center ' >
                        <div className='font-sfpro  text-2xl ' >Notifications</div>
                        <button onClick={() => showNotifications(false)} className='text-base p-2 rounded-full hover:bg-[#ffffff20] transition-all duration-300 ' ><RiCloseLargeLine /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header