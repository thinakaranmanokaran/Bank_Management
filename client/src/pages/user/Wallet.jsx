import React from 'react'
import formattedTime from '../../utils/Time'
import { useAcc, useAuth, useBalance } from '../../contexts'

const Wallet = () => {

    const { currentAcc } = useAcc(); 
    const { currentUser } = useAuth(); 
    const { balance, error } = useBalance(); 

    return (
        <div>
            <div>
                <div className=' text-4xl font-lato ' >My Wallet</div>
                <div>
                    <div className='my-8 flex  space-x-6' >
                        <div className='bg-green w-96 h-60  rounded-4xl  flex flex-col overflow-hidden justify-between '  >
                            <div className='flex justify-between font-jet p-4  px-5 text-xl  items-center' >
                                <div className='bg-dark px-4 py-1 rounded-full text-base font-main ' >Today</div>
                                <div className='text-dark ' >{formattedTime}</div>
                            </div>
                            <div className='flex-col items-end flex font-jet pb-4 ' >
                                <div className='text-dark text-6xl p-4  px-5 ' >{balance}.00</div>
                                <div className='text-dark w-full text-lg px-4 py-1 bg-white' >{currentAcc?.accountno || 12304040404040}</div>
                            </div>
                        </div>
                        <div className='bg-white w-96 h-60  rounded-4xl  flex flex-col overflow-hidden justify-between '  >
                            <div className='flex justify-between font-jet p-4  px-5 text-xl  items-center' >
                                <div className='bg-dark px-4 py-1 rounded-full text-base font-main ' >Yesterday</div>
                                {/* <div className='text-dark ' >{formattedTime}</div> */}
                            </div>
                            <div className='flex-col items-end flex font-jet pb-4 ' >
                                <div className='text-dark text-6xl p-4  px-5 ' >{balance}.00</div>
                                <div className='text-dark w-full text-lg px-4 py-1 bg-green' >{currentUser?.name}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Wallet