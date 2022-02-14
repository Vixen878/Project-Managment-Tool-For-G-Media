import { useState, Fragment } from 'react'
import { Tab, Dialog, Transition } from '@headlessui/react'
import CreateProjectModal from './CreateProjectModal'
import { UseCollection } from '../hooks/useCollection'
import ProjectsList from './ProjectsList'
import { motion } from 'framer-motion'
import { OnGoingProjectsCounter } from './OnGoingProjectsCounter'
import { OverallProjectCounter } from './OverallProjectCounter'
import { UseAuthContext } from '../hooks/useAuthContext'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Tabs() {

    const { user } = UseAuthContext()

    const { documents, error } = UseCollection(
        'requests',
        ["uid", "==", user.uid],
        ["isApproved", "==", false]
    )


    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <div className="w-full h-[720px]">
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
                                    className="text-xl font-bold leading-6 text-primaryGreen"
                                >
                                    Request For A New Project
                                </Dialog.Title>

                                {/* Modal Content */}
                                <CreateProjectModal cModal={closeModal} />

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
                                    : 'text-green-300 hover:bg-white/[0.12] hover:text-green-300'
                            )
                        }
                    >
                        <div className='flex flex-col justify-center items-center'>
                            <div className='text-4xl'>
                                {documents && <span>{documents.length}</span>}
                            </div>
                            <div className='text-base font-semibold'>
                                Pending Requests
                            </div>
                        </div>
                    </Tab>
                    <Tab
                        key="Meow 2"
                        className={({ selected }) =>
                            classNames(
                                'w-full h-24 py-2.5 text-sm leading-5 font-medium text-primaryGreen rounded-lg',

                                selected
                                    ? 'border-2 border-primaryGreen bg-green-700 shadow-slate-500'
                                    : 'text-green-300 hover:bg-white/[0.12] hover:text-green-300'
                            )
                        }
                    >
                        <div className='flex flex-col justify-center items-center'>
                            <div className='text-4xl'>
                                {/* Get on going component counter here */}
                                {OnGoingProjectsCounter()}
                            </div>
                            <div className='text-base font-semibold'>
                                On Going
                            </div>
                        </div>
                    </Tab>
                    <Tab
                        key="Meow 3"
                        className={({ selected }) =>
                            classNames(
                                'w-full h-24 py-2.5 text-sm leading-5 font-medium text-primaryGreen rounded-lg',

                                selected
                                    ? 'border-2 border-primaryGreen bg-green-700 shadow-slate-500'
                                    : 'text-green-300 hover:bg-white/[0.12] hover:text-green-300'
                            )
                        }
                    >
                        <div className='flex flex-col justify-center items-center'>
                            <div className='text-4xl'>
                                {/* Get completed component counter here */}
                                0
                            </div>
                            <div className='text-base font-semibold'>
                                Completed
                            </div>
                        </div>
                    </Tab>
                    <Tab
                        key="Meow 4"
                        className={({ selected }) =>
                            classNames(
                                'w-full h-24 py-2.5 text-sm leading-5 font-medium text-primaryGreen rounded-lg',

                                selected
                                    ? 'border-2 border-primaryGreen bg-green-700 shadow-slate-500'
                                    : 'text-green-300 hover:bg-white/[0.12] hover:text-green-300'
                            )
                        }
                    >
                        <div className='flex flex-col justify-center items-center'>
                            <div className='text-4xl'>
                                {/* Get completed component counter here */}
                                {OverallProjectCounter()}
                            </div>
                            <div className='text-base font-semibold'>
                                Over All
                            </div>
                        </div>
                    </Tab>
                </Tab.List>
                <Tab.Panels className="mt-2 flex flex-col h-[610px] overflow-auto">
                    <Tab.Panel>
                        <div className='flex justify-center w-full'>
                            <motion.div
                                whileHover={{ scale: 1.008, originX: 0 }}
                                onClick={openModal}
                                className='mt-7 px-64 h-10 hover:cursor-pointer text-white bg-primaryGreen shadow-xl flex justify-center rounded-3xl items-center space-x-2'>
                                <div className='w-6 h-6'>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="ionicon" viewBox="0 0 512 512"><title>Add</title><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="32" d="M256 112v288M400 256H112" /></svg>
                                </div>
                                <span>
                                    Request a New Project
                                </span>
                            </motion.div>
                        </div>
                        {documents && <ProjectsList projects={documents} />}


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
                    </Tab.Panel>
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}
