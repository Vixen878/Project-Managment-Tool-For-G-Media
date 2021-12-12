import './App.css';
import { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { auth } from "./firebase/config";
import { signInWithGoogle } from './firebase/config';
import Loginform from './components/Loginform';


function App() {

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({});
  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  })

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      console.log(user)
    } catch (error) {
      console.log(error.message)
    }
  }

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
    <div className='antialiased'>
      <div className="flex w-full min-h-screen justify-between">
        <div className='flex-col py-16 px-28'>
          <div className='space-y-7'>
            <img src="/Header_Logo.png" alt="" />
            <h1 className="text-4xl font-semibold text-gray-500 w-4/5">
              Welcome back, please Sign In to your account
            </h1>
          </div>
          <div className='flex'>
            <div className='flex place-content-center mt-8 bg-blue-600 py-2 px-2 w-80 rounded-full text-white font-semibold shadow-lg hover:bg-green-300 hover:text-white cursor-pointer'>
              <img className='w-7 h-7' src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" />
              <span className='px-2 py-0'>Sign In with Facebook</span>
            </div>
            <div className='ml-9'>
              <div className='flex place-content-center mt-8 bg-white py-2 px-2 w-80 rounded-full text-gray-600 font-semibold shadow-lg hover:bg-green-300 hover:text-white cursor-pointer'>
                <img className='w-7 h-7' src="https://img.icons8.com/color/50/000000/google-logo.png" />
                <span className='px-2 py-0'>Sign In with Google</span>
              </div>
            </div>
          </div>
          <div className='px-80 place-content-center mt-9'>
            <span className='text-gray-300'>-OR-</span>
          </div>
          {/* Form */}
          <div>
            <Loginform />
          </div>
        </div>
        <div>
          <span className='text-green-800 text-6xl'>
            Gradient Circles Side
          </span>
        </div>
      </div>
      {/* <div class="flex flex-row justify-between">
        <div class="basis-1/2 bg-red-100 w-full h-full">
          Components Side
        </div>
        <div class="relative bg-gray-500 w-full max-w-lg">
          <div class="absolute top-0 -left-11 bg-red-400 w-96 h-96 rounded-full"></div>
          <div class="absolute bg-red-200 w-96 h-96 rounded-full"></div>
        </div>
      </div> */}


      {/* Firebase Auth using email and password*/}
      <div>
        <h3>
          Register User
        </h3>
        <input placeholder="email"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input placeholder="password"
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }} />
        <button onClick={register}> Register </button>
      </div>
      <div>
        <h3>
          Login
        </h3>
        <input type="text" placeholder='email'
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }} />
        <input type="text" placeholder='password'
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }} />
        <button onClick={Login}>Login</button>
      </div>
      <img src={localStorage.getItem("profilePic")} alt="" />
      <h4>
        Logged In User:
      </h4>
      {user?.email}

      <button onClick={logout}>Signout</button>
      <div>
        <button onClick={signInWithGoogle} className="bg-blue-700 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">SignIn With Google</button>
      </div>
    </div>
  );
}

// function SignIn() {
//   const signInWithGoogle = () => {
//     const provider = new firebase.auth.signInWithGoogle()
//     auth.signinWithPopup(provider)
//   }
//   return(
//     <button onClick = {signInWithGoogle}> Sign in with google</button>
//   )
// }

export default App;
