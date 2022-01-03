import { useState, useEffect } from "react";
import { db } from "../firebase/config";

import { collection, onSnapshot } from 'firebase/firestore'

export const UseCollection = (col, _q) => {
    const [documents, setDocuments] = useState(null)

    // // setup query
    // const q = useRef(_q).current // .current might not work

    useEffect(() => {
        let ref = collection(db, col)

        // if(q) {
        //     ref = query(ref, where(...q))
        // }

        const unsubscribe = onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })
            setDocuments(results)
        })

        return () => unsubscribe()
    }, [col])

    return {documents}
}   