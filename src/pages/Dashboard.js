import React, { useEffect } from 'react'
import Tabs from '../components/dashBoardTabs'
import { motion } from 'framer-motion'
import { Link } from "react-router-dom";
import DashboardChatList from '../components/DashboardChatList'
import { UseNotifications } from "../hooks/UseNotifications";

function Dashboard() {

    const { newNotifications } = UseNotifications();

    return (
        <motion.div
            initial={{ x: '-100vh' }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 60 }}
            className='w-full flex flex-col pl-9 antialiased overflow-hidden'>
            {/* Search */}
            <div className='flex space-x-11 w-[1500PX] text-texts mt-14'>
                <div className='flex flex-row space-x-4 items-center'>
                    <div className='text-primaryGreen w-8 h-8'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Grid</title><rect x="48" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /><rect x="288" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /><rect x="48" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /><rect x="288" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /></svg>
                    </div>
                    <span className='text-4xl font-bold'>
                        Dashboard
                    </span>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex bg-primaryGreen bg-opacity-10 rounded-xl ">
                        <input type="text" className="bg-gray-100 rounded-l-xl bg-opacity-20 px-4 py-2 w-full h-11" placeholder="Search for projects..." />
                        <button className="flex items-center justify-center px-4">
                            <svg className="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className='flex flex-row-reverse items-center pr-6'>
                    <Link to={`notifications`}>
                        <div className="w-6 h-6 cursor-pointer relative">
                            {newNotifications && <span className='absolute right-0 top-[-6px]'>
                                <span className='h-3 w-3 bg-red-600 border inline-block rounded-[50%]'></span>
                            </span>}
                            <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Notifications</title><path d="M427.68 351.43C402 320 383.87 304 383.87 217.35 383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43 73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57zM320 384v16a64 64 0 01-128 0v-16" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" /></svg>
                        </div>
                    </Link>
                </div>
            </div>
            <div className='flex w-full h-[790px] flex-row mt-10'>
                <div className='border shadow-xl bg-opacity-10 w-2/3 py-9 px-7 rounded-tl-3xl'>
                    <Tabs />
                </div>
                <div className='flex w-1/3'>
                    <div className='border shadow-xl bg-opacity-10 w-full py-9 px-7 rounded-tr-3xl mr-10'>
                        <span className='text-4xl'>Chats</span>
                        <DashboardChatList className="my-5" />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Dashboard
