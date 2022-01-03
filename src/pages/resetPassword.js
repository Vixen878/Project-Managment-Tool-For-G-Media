import { sendPasswordResetEmail } from 'firebase/auth';
import React, { useState } from 'react'
import { UseForgotPassword } from '../hooks/useForgotPassword'
import { useHistory } from 'react-router-dom';

function ResetPassword() {

    const history = useHistory()

    const [email, setLoginEmail] = useState(null);
    const { forgotPassword, isPending } = UseForgotPassword()

    const handleForgotPassword = () => {
        forgotPassword(email)
            .then(() => {
                // Password reset email sent!
                // ..
                history.push('/login', { status: 'Password reset email sent!'})
            })
            .catch((error) => {
                console.log(error)
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }


    return (
        <div className='w-1/2 h-screen flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-gray-700'>
                Reset Password
            </h1>
            <div class="relative mt-4">
                <input onChange={(event) => {
                    setLoginEmail(event.target.value);
                }}
                    id="email" name="email" type="text" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="john@doe.com" />
                <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Account Email Address</label>
            </div>
            {!isPending && <button onClick={handleForgotPassword} class="w-full mt-5 px-4 py-2 rounded bg-primaryGreen hover:bg-secondaryGreen text-white font-semibold text-center block focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primaryGreen">Reset Password</button>}
            {isPending && <button className="cursor-not-allowed w-full mt-5 px-4 py-2 rounded bg-primaryGreen hover:bg-secondaryGreen text-white font-semibold text-center block focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primaryGreen">Loading</button>}
        </div>
    )
}

export default ResetPassword
