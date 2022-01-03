import React from 'react'
import AnimatedBlurBlobs from '../components/AnimatedBlurBlobs'
import LoginLeftSideComponent from '../components/LoginLeftSideComponent';
import RegisterForm from '../components/RegisterForm'
import { UseSignup } from '../hooks/useSignup';


function Register() {

    const {FacebookSignIn, signInWithGoogle, error, isPending} = UseSignup()

    return (
        <div className='w-screen h-screen relative flex justify-center items-center px-16 overflow-hidden'>
            {/* Top Blobs */}
            <div className='text-2xl absolute top-64 left-44 w-full max-w-lg blur-xl'>
                <AnimatedBlurBlobs />
            </div>
            {/* Bottom Blobs */}
            <div className='text-2xl absolute top-[48rem] left-[85rem] w-full max-w-lg blur-xl'>
                <AnimatedBlurBlobs />
            </div>
            <div className='absolute'>
                <div className='w-[76rem] h-[43rem] grid grid-cols-2 bg-white shadow-lg rounded-xl '>
                    {/* Left content */}

                    <LoginLeftSideComponent />

                    {/* Right Content */}
                    <div className='flex flex-col p-10 justify-center'>
                        <div>
                        <img src="Header_Logo.png" alt="" />
                            <h1 className='font-bold text-3xl  text-gray-600 mt-5 md:w-4/5'>
                                Lets get you started
                            </h1>
                            <h3>
                                Choose one of the following signup methods.
                            </h3>
                            <div className='flex flex-row justify-evenly'>
                                <div onClick={FacebookSignIn} className='flex place-content-center mt-8 bg-blue-600 py-2 px-2 w-80 rounded-lg text-white font-semibold shadow-lg hover:bg-blue-400 hover:text-white cursor-pointer'>
                                    <img className='w-7 h-7' src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" />
                                    <span className='px-2 py-0'>Continue with Facebook</span>
                                </div>
                                {!isPending && <div onClick={signInWithGoogle} className=' mt-8 ml-3 flex place-content-center bg-white hover:bg-gred py-2 px-2 w-80 rounded-lg text-gray-600 font-semibold shadow-lg hover:text-white cursor-pointer'>
                                    <img className='w-7 h-7' src="https://img.icons8.com/color/50/000000/google-logo.png" />
                                    <span className='px-2 py-0'>Continue with Google</span>
                                </div>}
                                {isPending && <div className=' mt-8 ml-3 flex place-content-center bg-white py-2 px-2 w-80 rounded-lg text-gray-600 font-semibold shadow-lg cursor-pointer'>
                                    <img className='w-7 h-7' src="https://img.icons8.com/color/50/000000/google-logo.png" />
                                    <span className='px-2 py-0'>Loading</span>
                                </div>}
                            </div>
                            <div className='mt-6 flex justify-center text-gray-500'>
                                <span>
                                    -OR-
                                </span>
                            </div>
                            <div className='mt-5 pr-10'>
                                <RegisterForm />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Register
