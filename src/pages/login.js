import React, {useEffect} from 'react'
import AnimatedBlurBlobs from '../components/AnimatedBlurBlobs';
import Loginform from '../components/Loginform'
import LoginLeftSideComponent from '../components/LoginLeftSideComponent';
import { UseLogin } from '../hooks/useLogin';


function LoginPage(stat) {

    const { FacebookSignIn, signInWithGoogle, error, isPending } = UseLogin()

   useEffect(() => {
       console.log(stat)
       return () => {
           
       };
   });


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
                <div className='w-[76rem] h-[43rem] items-center grid grid-cols-2 bg-white shadow-lg rounded-xl '>
                    {/* Left Content */}
                    <div className='flex flex-col p-10'>
                        <div>
                            <img src="Header_Logo.png" alt="" />
                            <h1 className='font-bold text-3xl  text-gray-600 mt-5 md:w-4/5'>
                                Welcome back, please Sign In to your account.
                            </h1>
                            <div className='flex flex-row justify-evenly'>
                                <div onClick={FacebookSignIn} className='flex place-content-center mt-8 bg-blue-600 py-2 px-2 w-80 rounded-lg text-white font-semibold shadow-lg hover:bg-blue-400 hover:text-white cursor-pointer'>
                                    <img className='w-7 h-7' src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" />
                                    <span className='px-2 py-0'>Sign In with Facebook</span>
                                </div>
                                {!isPending && <div onClick={signInWithGoogle} className=' mt-8 ml-3 flex place-content-center bg-white hover:bg-gred py-2 px-2 w-80 rounded-lg text-gray-600 font-semibold shadow-lg hover:text-white cursor-pointer'>
                                    <img className='w-7 h-7' src="https://img.icons8.com/color/50/000000/google-logo.png" />
                                    <span className='px-2 py-0'>Sign In with Google</span>
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
                            <div className='flex justify-center mt-5'>
                                <Loginform />
                            </div>
                        </div>
                    </div>
                    {/* Right content */}
                    <div className='rounded-r-xl'>
                        {/* <iframe className='rounded-r-xl' src='https://my.spline.design/untitled-bacab23fa961e5d4d49bfd3be724c30d/' frameborder='0' width='100%' height='688px'></iframe> */}
                        <LoginLeftSideComponent />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
