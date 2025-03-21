import React from 'react'
import images from '../../assets/images'
import { Link } from 'react-router-dom'

const DashboardCard = ({ Data }) => {
    return (
        <div className=' w-full  bg-white p-10 rounded-4xl  flex flex-col justify-between' id={Data.id} >
            <div className=' p-2 h-fit' >
                <img src={Data.img} alt="" srcset="" className='min-h-60 max-h-72 object-cover' />
            </div>
            <Link className='bg-green text-black text-xl p-4 font-main min-w-full flex rounded-4xl justify-center mt-4 ' to={Data.link} >{Data.title}</Link>
        </div>
    )
}

export default DashboardCard