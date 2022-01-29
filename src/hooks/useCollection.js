import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";
import { query, where } from "firebase/firestore";

import { collection, onSnapshot } from 'firebase/firestore'

export const UseCollection = (col, _q) => {
    const [documents, setDocuments] = useState(null)

    const q = useRef(_q).current

    useEffect(() => {
        let ref = collection(db, col)

        if (q) {
            ref = query(ref, where(...q))
        }

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })
            setDocuments(results)
        })

        return () => unsubscribe()
    }, [col, q])

    return { documents }
}   