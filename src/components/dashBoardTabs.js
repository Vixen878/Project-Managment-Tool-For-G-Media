import { useState, Fragment } from 'react'
import { Tab, Dialog, Transition } from '@headlessui/react'
import CreateProjectModal from './CreateProjectModal'
import { UseCollection } from '../hooks/useCollection'
import ProjectsList from './ProjectsList'
import { motion } from 'framer-motion'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Tabs() {

    const { documents, error } = UseCollection('pending-projects')

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }


    return (
        <div className="w-full px-2 sm:px-0">
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed bg-black opacity-30 inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Create a New Project
                                </Dialog.Title>

                                <CreateProjectModal cModal={closeModal} />

                                <div className=" flex space-x-3 mt-4">

                                    <button
                                        type="button"
                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-red-900 bg-gred rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
            <Tab.Group>
                <Tab.List className="flex p-1 space-x-1 border divide-x bg-opacity-25 rounded-xl">
                    <Tab
                        key="Meow"
                        className={({ selected }) =>
                            classNames(
                                'w-full h-24 py-2.5 text-sm leading-5 font-medium text-primaryGreen rounded-lg',

                                selected
                                    ? 'border-2 border-primaryGreen bg-green-700 shadow-slate-500'
                                    : 'text-red-300 hover:bg-white/[0.12] hover:text-primaryGreen'
                            )
                        }
                    >
                        <div className='flex flex-col justify-center items-center'>
                            <div className='text-4xl'>
                                05
                            </div>
                            <div className='text-base font-semibold'>
                                In progress
                            </div>
                        </div>
                    </Tab>
                    <Tab
                        key="Meow 2"
                        className={({ selected }) =>
                            classNames(
                                'w-full h-24 py-2.5 text-sm leading-5 font-medium text-primaryGreen rounded-lg',

                                selected
                                    ? 'border-b-primaryGreen bg-white shadow-slate-500'
                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                    >
                        <div className='flex flex-col justify-center items-center'>
                            <div>
                                ##
                            </div>
                            <div>
                                Upcoming
                            </div>
                        </div>
                    </Tab>
                    <Tab
                        key="Meow 2"
                        className={({ selected }) =>
                            classNames(
                                'w-full h-24 py-2.5 text-sm leading-5 font-medium text-primaryGreen rounded-lg',

                                selected
                                    ? 'border-b-primaryGreen bg-white shadow-slate-500'
                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                    >
                        <div className='flex flex-col justify-center items-center'>
                            <div>
                                ##
                            </div>
                            <div>
                                Completed
                            </div>
                        </div>
                    </Tab>
                    <Tab
                        key="Meow 3"
                        className={({ selected }) =>
                            classNames(
                                'w-full h-24 py-2.5 text-sm leading-5 font-medium text-primaryGreen rounded-lg',

                                selected
                                    ? 'border-b-primaryGreen bg-white shadow-slate-500'
                                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                            )
                        }
                    >
                        <div className='flex flex-col justify-center items-center'>
                            <div>
                                ##
                            </div>
                            <div>
                                Total
                            </div>
                        </div>
                    </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2 flex flex-col justify-evenly">
                    <Tab.Panel>
                        <div>
                            <motion.div
                                whileHover={{ scale: 1.02, originX: 0 }}
                                onClick={openModal} className='mt-7 h-10 hover:cursor-pointer text-white bg-primaryGreen shadow-2xl flex justify-center rounded-3xl items-center space-x-2'>
                                <div className='w-6 h-6'>
                                    <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Add</title><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M256 112v288M400 256H112" /></svg>
                                </div>
                                <span>
                                    Request a New Project
                                </span>
                            </motion.div>
                            <div className='flex '>
                                {documents && <ProjectsList projects={documents} />}
                            </div>


                            {/* <div className='bg-[#70ffcf] flex flex-col justify-evenly items-center w-72 h-72 rounded-3xl shadow-lg'>
                                <div className='flex flex-col items-center'>
                                    <div className='text-lg font-bold'>
                                        Motion Graphics
                                    </div>
                                    <div className='text-base'>
                                        Prototype
                                    </div>
                                </div>
                                <div className='text-sm flex flex-col justify-start w-full p-5'>
                                    <div>
                                        Progress (100%)
                                    </div>
                                    <div className='h-2 mt-2 w-full rounded-md bg-gradient-to-tr from-emerald-300 via-purple-500 to-red-400'>

                                    </div>
                                </div>
                                <div>

                                </div>
                            </div>
                            
                            </div> */}
                        </div>
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}
