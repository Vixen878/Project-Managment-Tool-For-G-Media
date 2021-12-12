import React from 'react'
import { useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "../firebase/config";


function Loginform() {

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [user, setUser] = useState({});
    onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
    })

    const Login = async () => {
        try {
            const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
            console.log(user)
        } catch (error) {
            console.log(error.message)
        }
    }

    const logout = async () => {
        await signOut(auth);
    }


    return (
        <div class="  pt-10 pl-5 pr-10 pb-8 bg-white">
            <div class="relative">
                <input onChange={(event) => {
                    setLoginEmail(event.target.value);
                }}
                    id="email" name="email" type="text" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="john@doe.com" />
                <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email address</label>
            </div>
            <div class="mt-10 relative">
                <input onChange={(event) => {
                    setLoginPassword(event.target.value);
                }}
                    id="password" type="password" name="password" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="Password" />
                <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
            </div>
            <a href="#" class="mt-6 block text-sm font-medium text-secondaryGreen hover:underline focus:outline-none focus:ring-2 focus:ring-green-500"> Forgot your password? </a>

            <button onClick={Login} class="w-full mt-3 px-4 py-2 rounded bg-primaryGreen hover:bg-secondaryGreen text-white font-semibold text-center block focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primaryGreen">Sign In</button>
            <button class="w-full mt-3 px-4 py-2 rounded bg-gradient-to-r from-gred to-gorange hover:bg-secondaryGreen text-white font-semibold text-center block focus:outline-none focus:ring focus:ring-offset-2 focus:ring-primaryGreen">Create an Account</button>

            <h4>
                Logged In User:
            </h4>
            {user?.email}
            <button onClick={logout}>Signout</button>
        </div>
    )
}

export default Loginform
