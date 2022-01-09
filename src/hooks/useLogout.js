import { signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { auth, db } from '../firebase/config'
import { UseAuthContext } from '../hooks/useAuthContext'
import { doc, updateDoc, collection } from '@firebase/firestore'

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const { dispatch, user } = UseAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // logout user
        try {

            // update online status
            const { uid } = user
            await updateDoc(doc(db, "clients", uid), {
                online: false,
            })

            signOut(auth);

            // dispatch 
            dispatch({ type: 'LOGOUT' })

            //update state
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
        return () =>
            setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}