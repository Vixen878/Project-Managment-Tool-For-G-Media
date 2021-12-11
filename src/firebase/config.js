import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAJH8ZLFC9aYdUDbqjnE7J67MICkKW5CcY",
  authDomain: "elik-project-managment-tool.firebaseapp.com",
  projectId: "elik-project-managment-tool",
  storageBucket: "elik-project-managment-tool.appspot.com",
  messagingSenderId: "599744157195",
  appId: "1:599744157195:web:815a6c60466f8f647b590e",
  measurementId: "${config.measurementId}"
};
  
  const app = initializeApp(firebaseConfig);
  
  export const auth = getAuth(app);

  const provider = new GoogleAuthProvider()

//signin with google
  export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
       const name = result.user.displayName;
       const email = result.user.email;
       const profilePic = result.user.photoURL;

       localStorage.setItem("name", name);
       localStorage.setItem("email", email);
       localStorage.setItem("profilePic", profilePic);
       
         
    })
    .catch((error)=>{
      console.log(error);
    });
  }
