import React, { useEffect, useState } from 'react'
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { IoNotificationsOutline } from "react-icons/io5";
import UserNavigation from '../../database/user/Navigation';
import { RiSettings4Fill } from "react-icons/ri";
import { RiCloseLargeLine } from "react-icons/ri";
import { LiaPowerOffSolid } from "react-icons/lia";
import formattedTime from '../../utils/Time';
import axios from 'axios';
import { useAcc } from '../../contexts';

const Header = () => {

    const API_URL = import.meta.env.VITE_API_URL;

    const [notifcationData, setNotificationData] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const { currentAcc } = useAcc();


    const [options, showOptions] = useState(false);
    const [notifications, showNotifications] = useState(false);
    const [logout, setLogout] = useState(false);

    const navigate = useNavigate(); // Initialize navigate function

    function LogOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("accountToken")
        localStorage.removeItem("faceToken")
        navigate('/');
    }


    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/users/notification/${currentAcc?.accountno}`);
                setNotificationData(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching deposits');
            } finally {
                setLoading(false);
            }
        };

        if (currentAcc?.accountno) {
            fetchNotifications();
        }
    }, [API_URL, currentAcc?.accountno]);


    if (loading) {
        return <div>Loading...</div>;
    }

    // if (error) {
    //     return <div className='text-red-500' >Error while Data fetch</div>;
    // }

    const handleClear = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/users/notification/${id}`);
            // alert('Notification cleared successfully!');
            setNotificationData((prevData) => prevData.filter((item) => item._id !== id)); // Update state after deletion
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting notification');
        }
    };

    // clear Notification
    const handleClearAll = async () => {
        try {
            await axios.delete(`${API_URL}/api/users/notifications/${currentAcc?.accountno}`);
            // alert('All notifications cleared successfully!');
            setNotificationData([]); // Clear all notifications in state
        } catch (err) {
            setError(err.response?.data?.message || 'Error deleting all notifications');
        }
    };

    return (
        <div className='bg-[#ffffff10] p-4 rounded-full flex justify-between  ' >
            <div className='flex  items-center space-x-8 ' >
                <div>
                    <Link to="/user/dashboard" className='flex gap-x-2 items-center bg-green  w-fit  px-4 py-3 text-xl  font-main rounded-full text-dark ' ><HiArrowLeft />Back to Home</Link>
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
                <div className='text-xl mr-4 font-jet ' >
                    <div>{formattedTime}</div>
                </div>
                <div className='flex items-center -space-x-1' >
                    <div onClick={() => showNotifications(true)} className='text-2xl p-3 relative hover:bg-[#ffffff20]  cursor-pointer transition-all duration-300 rounded-full text-white  ' > <IoNotificationsOutline /> {notifcationData.length > 0 ? <div className={` absolute font-sfreg text-[12px] top-2 right-2 w-4 h-4 rounded-full flex justify-center items-center   bg-white text-dark  ${notifcationData.length > 10 ? "w-6 -mr-2" : ""}`} >{notifcationData.length > 9 ? "9+" : notifcationData.length}</div> : ""}</div>
                    <div className='text-2xl p-3 hover:bg-[#ffffff20]  cursor-pointer transition-all duration-300 rounded-full text-white  ' onClick={() => showOptions(true)} > <RiSettings4Fill /></div>
                    <div className='text-3xl p-2 ml-6 bg-green  cursor-pointer transition-all duration-300 rounded-full text-black  ' onClick={() => setLogout(true)} > <LiaPowerOffSolid /></div>
                </div>
                {logout && <div className=' absolute bg-black p-6 max-w-60 w-full h-fit max-h-60 font-sfpro top-32 right-6 rounded-3xl' >
                    <div className='text-center text-lg ' >Did you want Logout the Current Account ?</div>
                    <div className=' flex space-x-2 mt-5 items-center ' >
                        <button onClick={() => setLogout(false)} className='bg-white text-dark  px-4 py-1.5 rounded-full w-full  cursor-pointer ' >Cancel</button>
                        <button className='bg-green text-dark  px-4 py-1.5 rounded-full w-full  cursor-pointer ' onClick={LogOut} >Sure</button>
                    </div>
                </div>}
                <div className={`${options ? "right-0" : "right-[-100%]"} shadow-lg bg-[#00000020] backdrop-blur-2xl   transition-transform duration-300 w-80 fixed p-6 py-10  top-0  h-full z-30 `} >
                    <div className='flex justify-between items-center ' >
                        <div className='font-sfpro  text-2xl ' >Settings</div>
                        <button onClick={() => showOptions(false)} className='text-base p-2 rounded-full hover:bg-[#ffffff20] transition-all duration-300 ' ><RiCloseLargeLine /></button>
                    </div>
                </div>
                <div className={`${notifications ? "right-0" : "right-[-100%]"} bg-[#00000020] backdrop-blur-2xl  oveflow-scroll transition-transform duration-300 w-80 fixed p-6 py-10  top-0  h-full z-30 `} >
                    <div className='flex justify-between items-center ' >
                        <div className='font-sfpro  text-2xl ' >Notifications</div>
                        <button onClick={() => showNotifications(false)} className='text-base p-2 rounded-full hover:bg-[#ffffff20] transition-all duration-300 ' ><RiCloseLargeLine /></button>
                    </div>
                    <div className="mt-6 h-full overflow-y-auto max-h-[77vh] py-6 "  style={{  scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
    {
        notifcationData.map((Data) => (
            <div key={Data._id} className="bg-white mt-4 text-dark relative rounded-2xl p-4 min-h-20">
                <div className="flex">
                    {Data?.type === "transaction" ? (
                        <div className="text-2xl font-gotham bg-dark text-white rounded-full min-w-12 h-12 flex justify-center items-center">
                            {Data?.name.charAt(0)}
                        </div>
                    ) : null}
                    <div className="ml-2 text-base font-sfreg">
                        <div>{Data.message}</div>
                        <button
                            className="absolute bottom-2 right-2 bg-green text-dark px-3 py-1 text-xs rounded-full font-sfreg cursor-pointer"
                            onClick={() => handleClear(Data._id)}
                        >
                            clear
                        </button>
                    </div>
                </div>
            </div>
        ))
    }
</div>

                    {
                        notifcationData.length === 0 ?
                            <div className='font-sfreg text-lg ' >No notifications</div> :
                            <div className="flex justify-end mt-2" >
                                <button className="bg-[#ffffff20] backdrop-blur-2xl font-sfreg text-white px-3 py-1 text-sm rounded-full cursor-pointer" onClick={handleClearAll} >clear all</button>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header