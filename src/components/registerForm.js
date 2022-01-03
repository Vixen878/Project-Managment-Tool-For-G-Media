import React from 'react'
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase/config';
import { UseSignup } from '../hooks/useSignup'
import { useHistory } from 'react-router-dom'

function RegisterForm() {

    const [email, setRegisterEmail] = useState("");
    const [password, setRegisterPassword] = useState("");
    const [displayName, setDisplayName] = useState("")
    const { Signup, error, isPending } = UseSignup()
    let history = useHistory();

    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const handleRegister = (e) => {
        e.preventDefault();
        Signup(displayName, email, password).then((val) => {
            console.log("meow: ", val)

        }).catch((err) => {
            console.log("Wow Girma: ", err)
        });
    }

    const redirectRegister = () => {
        history.push('/login')
    }


    return (
        <div>
            {error && <p className='text-red-600'>{error}</p>}
            <div class="relative mt-4">
                <input onChange={(event) => {
                    setDisplayName(event.target.value);
                }}
                    id="displayName" name="displayName" type="text" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="john@doe.com" />
                <label for="displayName" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Full Name</label>
            </div>
            <div class="relative mt-4">
                <input onChange={(event) => {
                    setRegisterEmail(event.target.value);
                }}
                    id="email" name="email" type="text" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="john@doe.com" />
                <label for="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email address</label>
            </div>
            <div class="mt-6 relative">
                <input onChange={(event) => {
                    setRegisterPassword(event.target.value);
                }}
                    id="password" type="password" name="password" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="Password" />
                <label for="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
            </div>
            <div className='mt-7'>
                {!isPending && <button onClick={handleRegister} class="w-full mt-5 px-4 py-2 rounded bg-primaryGreen hover:bg-secondaryGreen text-white font-semibold text-center block focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primaryGreen">Sign Up</button>}
                {isPending && <button class="cursor-not-allowed w-full mt-5 px-4 py-2 rounded bg-primaryGreen hover:bg-secondaryGreen text-white font-semibold text-center block focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primaryGreen">Loading</button>}
                <button onClick={redirectRegister} className="w-full mt-3 px-4 py-2 rounded bg-gradient-to-r from-gred to-gorange hover:bg-secondaryGreen text-white font-semibold text-center block focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primaryGreen">Already have an account?</button>

            </div>
        </div>
    )
}

export default RegisterForm
