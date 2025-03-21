import React from 'react'

const PayCard = () => {
    return (
        <div>
            <div className='bg-[#ffffff10] p-6 rounded-4xl w-fit  min-w-80  max-w-96' >
                <div className='space-y-6' >
                    <h1 className='font-gotham text-4xl  ' >Sender</h1>
                    <div className='flex font-sfpro space-x-2 text-xl  ' >
                        <div>Acc.No: </div>
                        <div>123456789</div>
                    </div>
                    <div>
                        <label className='relative ' >
                            <input className="py-4 border-b-[1px] border-white w-full focus:outline-none text-5xl text-end font-jet peer "  type="number" name="" id="" />
                            <label className='font-sfpro text-3xl absolute -bottom-2 left-0 peer-focus:text-xl  peer-focus:bottom-12 transition-all duration-300 peer-focus:text-green  '  >Enter a Amount</label>
                        </label>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    )
}

export default PayCard