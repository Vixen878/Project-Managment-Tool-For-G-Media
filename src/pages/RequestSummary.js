// import DocViewer, { DocViewerRenderers } from "react-doc-viewer";
import { useState, useEffect } from "react";
import Message from "../components/Message";
import { useParams } from "react-router-dom";
import MessageForm from "../components/MessageForm";
import { UseAuthContext } from "../hooks/useAuthContext"
import { UseDocument } from '../hooks/useDocument';

import { collection, onSnapshot, query, addDoc, doc, where, Timestamp, orderBy, getDoc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { db, storage } from "../firebase/config";
import { UseCollection } from "../hooks/useCollection";


export default function RequestSummary({ request }) {

    const { id } = useParams()
    // const { document, error } = UseDocument("messages", id);
    const { documents } = UseCollection('messages')

    const { user } = UseAuthContext()
    const user1 = user.uid
    //console.log("user1 is: ", user1)

    const [chat, setChat] = useState("")

    const [text, setText] = useState("")
    const [file, setFile] = useState("")
    const [messages, setMessages] = useState([])


    // setChat(user)
    var categories = []
    for (var i = 0; i < request.category.length; i++) {
        categories.push(request.category[i].value.Category);
    }

    

    const selectChat = async (doc) => {
        setChat(doc)

        // user index
        var amID = []
        for (var i = 0; i < doc.length; i++) {
            amID.push(doc[i].Acid)
        }

        const user2 = amID

        console.log("This are the messages: ", user2)

        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`


        // get messages
        const msgsRef = collection(db, 'messages', id, 'chat')
        const q = query(msgsRef, orderBy('createdAt', 'asc'))

        onSnapshot(q, querySnapshot => {
            let msgs = []
            querySnapshot.forEach(d => {
                msgs.push(d.data())
            })
            setMessages(msgs)
        })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // user index
        var cID = []
        for (var i = 0; i < chat.length; i++) {
            cID.push(chat[i].Acid)
        }


        const user2 = cID

        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

        let url;
        if (file) {
            const fileRef = ref(storage, `chatFiles/${new Date().getTime()} - ${file.name}`)
            const snap = await uploadBytes(fileRef, file)
            const downloadUrl = await getDownloadURL(ref(storage, snap.ref.fullPath))
            url = downloadUrl
        }

        await addDoc(collection(db, 'messages', id, 'chat'), {
            text,
            from: user1,
            to: user2,
            createdAt: Timestamp.fromDate(new Date()),
            media: url || ""
        })
        setText("")
    }

    return (
        <div className="h-screen flex px-11 pt-24">
            <div className="w-1/2 p-5">
                <div>
                    <span className="text-4xl text-gray-700 font-bold">{request.name}</span>
                </div>
                <div className="mt-1 flex-col flex">
                    <span className="text-gray-400 space-x-2 text-sm">Project Category: {categories.join(", ")}</span>
                    <span className="text-gray-400 space-x-2 text-sm">Requested on: {request.createdAt.toDate().toDateString()}</span>
                </div>
                <a href={request.BriefUrl}>
                    <div className="flex mt-5 space-x-2 rounded border bg-primaryGreen w-48 h-10 items-center pl-3 hover:bg-green-900">
                        <div className="text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <span className="text-base font-semibold text-white">Download Brief</span>
                    </div>
                </a>
                <div className="mt-7 w-full flex flex-col">
                    <span className="text-xl font-semibold text-gray-700">
                        Additional Details
                    </span>
                    <span className="text-lg mt-1 text-gray-500">
                        {request.description}
                    </span>
                    <div
                        className="rounded-md mt-6 bg-primaryGreen w-auto p-4 cursor-pointer text-white"
                        onClick={() => selectChat(documents)}>
                        <span>
                            Open Chat
                        </span>
                    </div>
                </div>
            </div>
            <div className="w-1/2 p-5 rounded-lg border">
                {chat ?
                    (
                        <div className="font-semibold h-screen w-full">
                            <div className="absolute pb-7 bottom-0 flex flex-col justify-between">
                                <div className="overflow-y-auto text-sm border-b-2">
                                    {messages.length ? messages.map((msg, i) => <Message key={i} msg={msg} user1={user1} />) : null}
                                </div>
                                <MessageForm
                                    handleSubmit={handleSubmit}
                                    text={text}
                                    setText={setText}
                                    setFile={setFile} />
                                )
                            </div>
                        </div>
                    ) :
                    (
                        <div className="flex items-center justify-center">Select The Client To Start Conversation</div>
                    )
                }
            </div>
        </div>

    )
}
