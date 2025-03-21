import React from 'react'
import images from './../../assets/images'
import { UserDashboardCard } from '../../components'

const DashBoard = () => {

    const Data = [
        {
            id: 1,
            title: "Deposit",
            link: "/user/deposit",
            img: images.Deposit,
        },
        {
            id: 2,
            title: "Transfer Money",
            link: "/user/mobpay",
            img: images.MobPay,
        },
        {
            id: 3,
            title: "Loan Application",
            link: "/user/loan-application",
            img: images.Loan,
        },
        {
            id: 4,
            title: "Print History",
            link: "/user/print-history",
            img: images.PrintHistory,
        },
    ]

    return (
        <div className='w-full' >
            <div className=' w-full flex justify-center ' >  
                <div className='grid grid-cols-3 gap-10  ' >
                    { Data.map((Data, index) => (<UserDashboardCard Data={Data} key={index} />)) }
                </div>
            </div>
        </div>
    )
}

export default DashBoard