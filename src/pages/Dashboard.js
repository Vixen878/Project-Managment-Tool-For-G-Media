import React, { useEffect } from 'react'
import Tabs from '../components/dashBoardTabs'
import { motion } from 'framer-motion'
import DashboardChatList from '../components/DashboardChatList'

function Dashboard() {
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
