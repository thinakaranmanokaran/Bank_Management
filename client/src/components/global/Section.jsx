import React from 'react'
import images from '../../assets/images'

const Section = () => {
    return (
        <div className='bg-dark pb-20 text-white ' >
            <div className='bg-green  h-32 w-full -rotate-3 -mt-32 ' ></div>
            <div className='mt-20 px-32 ' >
                <div className='  flex justify-between w-full' >
                    <div className='w-2/5 flex flex-col space-y-6 ' >
                        <h3 className='  text-4xl font-lato ' >Secure & Reliable Banking with us</h3>
                        <p className='font-main text-[#ffffff90] ' >We prioritize your financial security with advanced encryption, AI-driven fraud detection, and trusted banking solutions.</p>
                        <div>
                            <ul className='grid grid-cols-2 gap-2  font-main ml-4 text-lg' >
                                <li className=' list-disc ' >Secure & Seamless</li>
                                <li className=' list-disc ' >Touch to Access</li>
                                <li className=' list-disc ' >Tap & Pay Securely</li>
                                <li className=' list-disc ' >Bank with Confidence</li>
                                <li className=' list-disc ' >Security on the Go</li>
                                <li className=' list-disc ' >Fraud-Proof Banking</li>
                                <li className=' list-disc ' >Full Control, Always</li>
                                <li className=' list-disc ' >Bank Anytime, Anywhere</li>
                                <li className=' list-disc ' >Simple. Smart. Fast.</li>
                            </ul>
                        </div>
                        <div className='flex mt-6' >
                            <button className='bg-green font-semibold   text-dark px-4 py-2 rounded-full font-main ' >Get Started</button>
                        </div>
                    </div>
                    <div className='w-3/5 flex justify-end' >
                        <img src={images.Wallet} className='h-[450px] object-cover  ' alt="" srcset="" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Section