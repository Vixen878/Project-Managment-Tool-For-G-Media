import { useEffect, useState } from "react";
import { db } from "../firebase/config";

import { collection, onSnapshot, getDocs, doc } from 'firebase/firestore'

export const UseDocument = (col, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // realtime data for document
    useEffect(() => {
        // const ref = db.collection(collection).document(id)
        const ref = doc(collection(db, col), id)

        // const unsub = ref.onSnapshot((snapshot) => {
        //     setDocument({ ...snapshot.data(), id: snapshot.id })
        //     setError(null)
        // }, (err) => {
        //     console.log(err.message)
        //     setError('Failed to get documents')
        // })

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            if (snapshot.data()) {
                setDocument({ ...snapshot.data(), id: snapshot.id })
                setError(null)
            }
            else {
                setError('No Documents')
            }
        }, (err) => {
            console.log(err.message)
            setError('Failed to get documents')
        })

        return () => unsubscribe()

    }, [col, id])

    return { document, error }
}