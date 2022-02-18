import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import AnimatedBlurBlobs from '../components/AnimatedBlurBlobs';
import LoginLeftSideComponent from '../components/LoginLeftSideComponent';
import { auth } from '../firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {

    const history = useHistory()

    const [email, setLoginEmail] = useState(null);
    const [isPending, setIsPending] = useState(null)

    const handleForgotPassword = async () => {
        setIsPending(true)

        try {
            await sendPasswordResetEmail(auth, email)

            toast.info('Password reset email sent.', { autoClose: 5000 })

            history.push('/login', { status: 'Password reset email sent!' })
        } catch (err) {
            toast.error(err.message, { autoClose: 5000 })
        }

        setIsPending(false)
    }

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
                                Forgot Password
                            </h1>
                            <div className='flex justify-center mt-5'>
                                <div className='w-full  pr-20'>
                                    <div class="relative mt-4">
                                        <input onChange={(event) => {
                                            setLoginEmail(event.target.value);
                                        }}
                                            id="email" name="email" type="text" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="john@doe.com" />
                                        <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Account Email Address</label>
                                    </div>
                                    <div className='mt-5'>
                                        {!isPending && <button onClick={handleForgotPassword} class="w-full mt-5 px-4 py-2 rounded bg-primaryGreen hover:bg-secondaryGreen text-white font-semibold text-center block focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primaryGreen">Reset Password</button>}
                                        {isPending && <button className="cursor-not-allowed w-full mt-5 px-4 py-2 rounded bg-primaryGreen hover:bg-secondaryGreen text-white font-semibold text-center block focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primaryGreen">Loading</button>}
                                    </div>
                                </div>
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

export default ResetPassword
