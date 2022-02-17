import React from 'react'
import { useState, useEffect } from "react"
import Select from "react-select"

function Settings() {

    const [cat, setCat] = useState([])

    const [progress, setProgress] = useState(0)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [category, setCategory] = useState([])
    const [fileInputName, setInputFileName] = useState(null);
    const [isPending, setIsPending] = useState(false);

    function fileInput(event) {
        setInputFileName(event.target.files[0].name)
    }

    return (
        <div className="w-full flex flex-col mx-9 my-4 antialiased overflow-hidden">
            <div className='flex flex-row space-x-4 items-center'>
                    <div className='text-primaryGreen w-8 h-8'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Grid</title><rect x="48" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /><rect x="288" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /><rect x="48" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /><rect x="288" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /></svg>
                    </div>
                    <span className='text-4xl font-bold'>
                        Settings
                    </span>
                </div>
            
            <div className="mt-6">
                    <span className="text-lg text-gray-600 font-semibold">Profile picture</span>
                    <div className="relative mt-2 h-40 rounded-lg border-dashed border-2 border-gray-200 bg-white flex justify-center items-center hover:cursor-pointer">
                        <div className="absolute">
                            {!fileInputName &&
                                <div className="flex flex-col items-center text-gray-400">
                                    <svg className=" w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                                        <path d="M9 13h2v5a1 1 0 11-2 0v-5z" />
                                    </svg>
                                    <span className="block text-gray-400 font-normal">Attach you files here</span>
                                    <span className="block text-gray-400 font-normal">or</span>
                                    <span>{fileInputName}</span>
                                    <span className="block text-blue-400 font-normal">Browse files</span>
                                    
                                </div>
                            }
                            {fileInputName &&
                                <div>
                                    <span>{fileInputName}</span>
                                </div>
                            }

                        </div>
                        <input
                            type="file"
                            required onChange={fileInput}
                            className="h-full w-full opacity-0" name="" accept=".doc, .docx, .pdf" />
                    </div>
                    <div className="flex justify-between items-center text-sm mt-2 text-gray-400">
                        <span>Accepted file type: .doc, .docx, .pdf </span>
                        <span className="font-bold">{progress}%</span>
                    </div>
                </div>
                <div className="mt-6">
                    <span className="text-lg text-gray-600 font-semibold  ">Project Name</span>
                    <input
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                        value={name}
                        type="text"
                        required
                        placeholder="E.g. Company Brand Sprint"
                        className="p-2 mt-2 rounded-md focus:outline-none focus:ring-1 focus:to-blue-700 border w-full" />
                </div>
                <div className="mt-6 flex flex-col space-y-2">
                    <span className="text-lg text-gray-600 font-semibold">
                        Project Category
                    </span>
                    <Select
                        onChange={(option) => setCategory(option)}
                        required
                        options={cat}
                        isMulti
                    />
                </div>
                <div className="relative mt-6 space-y-2">
                    <span className="text-lg text-gray-600 font-semibold">
                        Project Deadline
                    </span>
                    <input
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                        id="dueDate"
                        required
                        name="dueDate"
                        type="date"
                        placeholder="Project Description"
                        className="w-full border focus:outline-none focus:ring-1 border-slate-300  focus:to-blue-700 h-10 p-2 rounded-md" />
                </div>
                <div className="relative mt-6 space-y-2">
                    <span className="text-lg text-gray-600 font-semibold">Additional Details</span>
                    <textarea onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        name="pDescription"
                        id="pDescription"
                        required
                        className="w-full border h-28 p-2 focus:outline-none focus:ring-1 border-slate-300  focus:to-blue-700 resize-none  rounded-md">
                    </textarea>
                </div>
                <div>
                    <span className="text-[12px] text-primaryGreen">
                        * We'll review your request and get back to you shortly.
                    </span>
                </div>
                <div className=" flex space-x-4 mt-6 justify-end">
                    <button
                        type="button"
                        className="justify-center px-4 py-2 text-sm font-medium text-red-900 bg-red-400 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                        Cancel
                    </button>
                    {!isPending && <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-primaryGreen border border-transparent rounded-md hover:bg-green-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                        Request Project
                    </button>}
                    {isPending && <button
                        type="button" disabled
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-black bg-gray-500 border border-transparent rounded-md cursor-not-allowed">
                        Loading...
                    </button>}
                    
                </div>
        </div>
    );
}

export default Settings
