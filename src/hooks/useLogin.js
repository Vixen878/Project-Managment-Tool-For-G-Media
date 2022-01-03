import React from 'react'
import { auth, fbAuth, googleProvider, db } from '../firebase/config'
import { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { UseAuthContext } from './useAuthContext'
import { getDoc, setDoc, doc } from '@firebase/firestore';

export const UseLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const { dispatch } = UseAuthContext()

    const UserLogin = async (email, password) => {
        setError(null)
        setIsPending(true)

        // sign in the user with email and password
        try {
            const res = await signInWithEmailAndPassword(auth, email, password)
            

            // dispatch a login action
            dispatch({ type: 'LOGIN', payload: res.user })

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

            const displayName = await response.user.displayName;

            // create user document
            let exists = (await getDoc(doc(db, "clients", response.user.uid))).exists()

            if (!exists) {
                await setDoc(doc(db, "clients", response.user.uid), {
                    online: true,
                    displayName
                })
            }

            // dispatch google login action
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

            // create user document
            let exists = (await getDoc(doc(db, "clients", response.user.uid))).exists()

            if (!exists) {
                await setDoc(doc(db, "clients", response.user.uid), {
                    online: true,
                    displayName
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

    return { UserLogin, FacebookSignIn, signInWithGoogle, error, isPending }
}