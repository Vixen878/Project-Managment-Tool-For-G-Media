import './App.css';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/authnpm ins';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyAJH8ZLFC9aYdUDbqjnE7J67MICkKW5CcY",
  authDomain: "elik-project-managment-tool.firebaseapp.com",
  projectId: "elik-project-managment-tool",
  storageBucket: "elik-project-managment-tool.appspot.com",
  messagingSenderId: "599744157195",
  appId: "1:599744157195:web:815a6c60466f8f647b590e",
  measurementId: "G-GSBHHRC959"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

const [user] = useAuthState(auth);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>

     <section>
       {user ? <chatroom /> : <SignIn />}
     </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {

  }
  return(
    <button onClick = {signInWithGoogle}> Sign in with google</button>
  )
}

export default App;
