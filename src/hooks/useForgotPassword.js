import { useState, useEffect } from 'react'
import { auth } from '../firebase/config'
import { sendPasswordResetEmail } from 'firebase/auth'

export const UseForgotPassword = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(null)


    const forgotPassword = async (email) => {
        setError(null)
        setIsPending(true)

        try {
            const result = await sendPasswordResetEmail(auth, email)
            
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

    return { forgotPassword, error, isPending }
}