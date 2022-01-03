import React, { useEffect } from 'react'
import Tabs from '../components/dashBoardTabs'
import { motion } from 'framer-motion'

function Dashboard() {
    return (
        <motion.div
            initial={{ x: '-100vh' }}
            animate={{ x: 0 }}
            transition={{type: 'spring', stiffness: 60}}
            className='w-screen h-screen flex flex-col pl-9 antialiased overflow-auto'>
            {/* Search */}
            <div className='flex space-x-11 w-[1500PX] text-texts mt-14'>
                <div className='flex flex-row space-x-4 items-center'>
                    <div className='text-primaryGreen w-8 h-8'>
                        <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Grid</title><rect x="48" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><rect x="288" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><rect x="48" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><rect x="288" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>
                    </div>
                    <span className='text-4xl font-bold'>
                        Dashboard
                    </span>
                </div>
                <div className="flex items-center justify-center">
                    <div className="flex bg-primaryGreen bg-opacity-10 rounded-xl ">
                        <input type="text" className="bg-gray-100 rounded-l-xl bg-opacity-20 px-4 py-2 w-[900px] h-11" placeholder="Search for projects..." />
                        <button className="flex items-center justify-center px-4">
                            <svg className="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24">
                                <path
                                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className='flex flex-row mt-10'>
                <div className='border shadow-xl bg-opacity-10 h-screen w-[1000px] p-9 rounded-tl-3xl'>
                    <Tabs />
                </div>
                <div className='flex items-center justify-center p-11 w-[500px] text-4xl'>Chat Side</div>
            </div>
        </motion.div>


    )

}

export default Dashboard
