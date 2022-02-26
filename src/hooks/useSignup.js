import React from 'react'
import { auth, fbAuth, googleProvider, db } from '../firebase/config'
import { useState, useEffect } from 'react'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth'
import { UseAuthContext } from './useAuthContext'
import { getDoc, setDoc, doc, updateDoc } from '@firebase/firestore';

export const UseSignup = () => {

    const [isCancelled, setIsCancelled] = useState(false
        )
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = UseAuthContext()

    const Signup = async (displayName, email, password) => {
        setError(null)
        setIsPending(true)

        try {
            //Signup User with email and password
            const response = await createUserWithEmailAndPassword(auth, email, password)
            // console.log(response.user)

            if (!response) {
                throw new Error('Could Not Complete Signup')
            }

            // add display name to user
            await updateProfile(response.user, { displayName })

            // create user document
            await setDoc(doc(db, "clients", response.user.uid), {
                online: true,
                displayName,
                profilePicture: "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg",
                isDefaultProfilePicture: true
            });

            // dispatch login action
            dispatch({ type: 'LOGIN', payload: response.user })

            // update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    // sign in with Google
    const signInWithGoogle = async () => {
        setError(null)
        setIsPending(true)

        try {
            const response = await signInWithPopup(auth, googleProvider)

            const displayName = response.user.displayName;
            let userData = (await getDoc(doc(db, "clients", response.user.uid))).data()

            let profilePicture = (userData == null) ? response.user.photoURL : userData.profilePicture
            let isDefaultProfilePicture = false

            if (userData == null && response.user.photoURL == null) {
                profilePicture = "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
                isDefaultProfilePicture = true
            } else if (userData?.isDefaultProfilePicture && response.user.photoURL != null) {
                profilePicture = response.user.photoURL
                isDefaultProfilePicture = false
            }

            // create user document
            let exists = (await getDoc(doc(db, "clients", response.user.uid))).exists()

            if (!exists) {
                await setDoc(doc(db, "clients", response.user.uid), {
                    online: true,
                    displayName,
                    profilePicture,
                    isDefaultProfilePicture
                })
            } else {
                await updateDoc(doc(db, "clients", response.user.uid), {
                    online: true,
                    profilePicture,
                    isDefaultProfilePicture
                })
            }

            // dispatch login action
            dispatch({ type: 'GOOGLE_LOGIN', payload: response.user })

            // update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        } catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }


    // sign in with facebook
    const FacebookSignIn = async () => {
        setError(null)
        setIsPending(true)

        try {
            const response = await signInWithPopup(auth, fbAuth)

            const displayName = await response.user.displayName;
            let profilePicture = await response.user.photoURL;
            let isDefaultProfilePicture = false

            if (response.user.photoURL == null) {
                profilePicture = "https://icon-library.com/images/default-user-icon/default-user-icon-13.jpg"
                isDefaultProfilePicture = true
            }

            // create user document
            let exists = (await getDoc(doc(db, "clients", response.user.uid))).exists()

            if (!exists) {
                await setDoc(doc(db, "clients", response.user.uid), {
                    online: true,
                    displayName,
                    profilePicture,
                    isDefaultProfilePicture
                })
            }

            // dispatch login action
            dispatch({ type: 'FACEBOOK_LOGIN', payload: response.user })

            // update state
            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }

        } catch (err) {
            if (!isCancelled) {
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            }
        }
    }


    useEffect(() => {
        return () => {
            setIsCancelled(true)
        }
    }, [])

    return { FacebookSignIn, signInWithGoogle, error, isPending, Signup }
}
