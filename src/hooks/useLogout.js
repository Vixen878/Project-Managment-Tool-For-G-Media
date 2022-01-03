import { signOut } from 'firebase/auth'
import { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { UseAuthContext } from './useAuthContext'

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)
    const { dispatch } = UseAuthContext()

    const logout = () => {
        setError(null)
        setIsPending(true)

        // logout user
        try {
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