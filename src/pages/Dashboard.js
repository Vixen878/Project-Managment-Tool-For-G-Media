import React from 'react'


function Dashboard() {

    const btn = document.querySelector(".mobile-menu-button");
    const sidebar = document.querySelector(".sidebar");

    const mobileButtonClick = () => {
        btn.addEventListener("click", () => {
            sidebar.classList.toggle("-translate-x-full");
        });
    }

    return (

        // <div className="relative min-h-screen md:flex">

        //     {/* <!-- mobile menu bar --> */}
        //     <div className="bg-gray-800 text-gray-100 flex justify-between md:hidden">
        //         {/* <!-- logo --> */}
        //         <a href="#" className="block p-4 text-white font-bold">Better Dev</a>

        //         {/* <!-- mobile menu button --> */}
        //         <button onClick={mobileButtonClick} className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-700">
        //             <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        //             </svg>
        //         </button>
        //     </div>

        //     {/* <!-- sidebar --> */}
        //     <div className="sidebar bg-blue-800 text-blue-100 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">

        //         {/* <!-- logo --> */}
        //         <a href="#" class="text-white flex items-center space-x-2 px-4">
        //             <svg class="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        //                 <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        //             </svg>
        //             <span class="text-2xl font-extrabold">Better Dev</span>
        //         </a>

        //         {/* <!-- nav --> */}
        //         <nav>
        //             <a href="#" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
        //                 Home
        //             </a>
        //             <a href="" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
        //                 About
        //             </a>
        //             <a href="" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
        //                 Features
        //             </a>
        //             <a href="" class="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700 hover:text-white">
        //                 Pricing
        //             </a>
        //         </nav>
        //     </div>

        //     {/* content */}
        //     <div class="flex-1 p-10 text-2xl font-bold">
        //         content goes here
        //     </div>

        // </div>

        <div className='antialiased min-h-screen relative bg-[#F8F8F8] lg:flex' >
            <nav className='sidebar flex flex-col absolute inset-y-0 left-0 transform -translate-x-full duration-200 ease-in-out lg:relative lg:translate-x-0 lg:transform-none z-10 w-80 bg-white text-texts h-screen p-3 justify-between'>
                <div>
                    <div className='flex justify-between'>
                        <img className='mt-2 ml-2' src="Header_Logo.png" alt="" />
                        <button onClick={mobileButtonClick} className='lg:hidden  pl-3 pr-3 focus:outline-none focus:bg-gray-300 hover:bg-gray-200 rounded-md'>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>
                    <div className='mt-8 ml-2'>
                        <ul>
                            <li>
                                <a href="#" className='block px-4 py-2 rounded-md bg-gray-100 hover:bg-primaryGreen'>Dashboard</a>
                            </li>
                            <li>
                                <a href="#" className='block px-4 py-2 mt-2 rounded-md bg-gray-100 hover:bg-primaryGreen'>Inbox</a>
                            </li>
                        </ul>
                        <hr className='mt-16 text-gray-300' />
                    </div>
                </div>
                <div className='text-primaryGreen'>
                    <hr />
                    User Profile Icon
                </div>
            </nav >
            <div className='w-full'>
                <div className='realtive flex flex-col z-0 lg:flex-grow items-center lg:items-start px-3'>
                    <header className='flex ml-0'>
                        <button onClick={mobileButtonClick} className=' lg:hidden mobile-menu-button pl-3 pr-3 mt-1  focus:outline-none focus:bg-gray-300 hover:bg-gray-200 rounded-md' >
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-primaryGreen" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <span className='block text-2xl text-texts font-bold py-3 pl-5 mt-2 sm:text-3xl'>Dashboard</span>
                    </header>
                    <div class="container mt-8 sm:px-5 lg:px-5">
                        <div class="relative">
                            <input type="text" class="py-2 w-full pr-8 pl-2 rounded-lg shadow-lg z-0 focus:shadow focus:outline-none" placeholder="Search anything..." />
                            <div class="absolute top-4 right-3"> <i class="fa fa-search text-gray-400 z-20 hover:text-gray-500"></i> </div>
                        </div>
                    </div>
                </div>
                <div className='flex w-full'>
                    <div className='flex flex-row gap-2 justify-between ml-5 mt-8'>
                        <div className='bg-primaryGreen rounded-md text-white'>Create new project</div>
                        <div>Projects in progress</div>
                        <div>Projects completed</div>
                    </div>
                </div>
            </div >
        </div >

    )

}

export default Dashboard
