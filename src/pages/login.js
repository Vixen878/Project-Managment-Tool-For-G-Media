import React from 'react'
import Loginform from '../components/Loginform'
import { signInWithGoogle } from '../firebase/config';

function LoginPage() {
    return (
        <div className='min-h-full justify-between'>
            <div className='flex flex-col p-8 md:p-0 md:grid md:grid-cols-2 md:flex-row  bg-white'>
                <div className='flex flex-col md:px-28 md:py-20'>
                    <div>
                        <img src="Header_Logo.png" alt="" />
                        <h1 className='font-bold text-3xl md:text-4xl text-gray-600 mt-5 md:w-4/5'>
                            Welcome back, please Sign In to your account.
                        </h1>
                    </div>
                    <div className='w-full flex flex-col md:flex-row'>
                        <div className='mt-6'>
                            <div className='flex place-content-center mt-8 bg-blue-600 py-2 px-2 md:w-80 rounded-lg text-white font-semibold shadow-lg hover:bg-blue-400 hover:text-white cursor-pointer'>
                                <img className='w-7 h-7' src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" />
                                <span className='px-2 py-0'>Sign In with Facebook</span>
                            </div>
                            {/* <button className="bg-blue-600 w-full hover:bg-blue-400 hover:text-white text-white font-bold py-2 px-4 rounded shadow-lg">Sign In With Facebook</button> */}
                        </div>
                        <div className='mt-4 md:mt-6'>
                            <div className='md:ml-9'>
                                <div className='flex place-content-center md:mt-8 bg-white hover:bg-gred py-2 px-2 md:w-80 rounded-lg text-gray-600 font-semibold shadow-lg hover:text-white cursor-pointer'>
                                    <img className='w-7 h-7' src="https://img.icons8.com/color/50/000000/google-logo.png" />
                                    <span className='px-2 py-0'>Sign In with Google</span>
                                </div>
                            </div>
                            {/* <button onClick={signInWithGoogle} className="bg-white w-full hover:bg-gred hover:text-white text-gray-500 font-bold py-2 px-4 rounded shadow-lg">Sign In With Google</button> */}
                        </div>

                    </div>
                    <div className='mt-6 text-center md:text-left md:pl-80 text-gray-500'>
                        <span>
                            -OR-
                        </span>
                    </div>
                    <div className='mt-4 md:w-full rounded-lg shadow-lg md:shadow-none md:rounded-none'>
                        <Loginform />
                    </div>
                    <div>

                    </div>
                </div>
                <div className='relative invisible md:visible bg-circlesBG overflow-hidden max-h-full'>
                    <div className='absolute z-40 right-[25rem] -top-[4rem] w-[50rem] h-[50rem] bg-gradient-to-bl from-primaryGreen via-secondaryGreen to-gorange rounded-full'>
                    </div>
                    <div className='relative z-20'>
                        <div className='absolute z-20 right-[20rem] top-[30rem] w-[50rem] h-[50rem] bg-gradient-to-tr from-primaryGreen via-secondaryGreen to-gorange rounded-full'></div>
                    </div>
                    <div className='relative z-30'>
                        <div className='absolute z-30 -right-[2rem] top-[13rem] w-[35rem] h-[35rem] bg-gradient-to-bl from-primaryGreen via-secondaryGreen to-circlesBG rounded-full'></div>
                    </div>
                    <div className='relative z-10'>
                        <div className='absolute z-10 left-[26rem] -top-[-1rem] w-[37rem] h-[37rem] bg-gradient-to-tr from-primaryGreen via-green-300 to-circlesBG rounded-full'></div>
                    </div>

                </div>
            </div>
            {/* <Loginform /> */}
        </div>
    )
}

export default LoginPage
