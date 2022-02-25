import Avatar from "./Avatar";
import { NavLink } from "react-router-dom";
import { UseAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import AnimatedBlurBlobs from "./AnimatedBlurBlobs";
import { motion } from "framer-motion";
import { UseDocument } from "../hooks/useDocument"

export default function NavBar() {

    const { user } = UseAuthContext()
    const { logout, isPending } = useLogout()
    const { document, error } = UseDocument('clients', user.uid)

    return (
        <div
            // initial={{ x: '-100vw' }}
            // animate={{ x: 0 }}
            // transition={{ type: 'spring', stiffness: 80}}
            className="antialiased relative overflow-hidden">
            <div className="absolute top-[700px] -left-32 blur-lg">
                < AnimatedBlurBlobs />
            </div>
            <div className="flex flex-col w-[350px] h-screen bg-gred bg-opacity-[0.04] backdrop-blur-xl justify-between">

                <nav className="flex flex-col mt-24 ml-24 space-y-10">
                    <div className="pb-10">
                        <img src="/Header_Logo.png" alt="" />
                    </div>
                    <motion.div
                        whileHover={{ scale: 1.1, originX: 0 }}
                        className="w-full text-primaryGreen text-lg">
                        <NavLink className="flex flex-row space-x-2 items-center" exact to="/">
                            <div className="w-6 h-6">
                                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Grid</title><rect x="48" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><rect x="288" y="48" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><rect x="48" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /><rect x="288" y="288" width="176" height="176" rx="20" ry="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>
                            </div>
                            <span>Dashboard</span>
                        </NavLink>
                    </motion.div >
                    <motion.div
                        whileHover={{ scale: 1.1, originX: 0 }}
                        className="w-full text-primaryGreen text-lg">
                        <NavLink className="flex flex-row space-x-2 items-center" exact to="/projects">
                            <div className="w-6 h-6">
                                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><title>Briefcase</title><rect x="32" y="128" width="448" height="320" rx="48" ry="48" fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="32" /><path d="M144 128V96a32 32 0 0132-32h160a32 32 0 0132 32v32M480 240H32M320 240v24a8 8 0 01-8 8H200a8 8 0 01-8-8v-24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>
                            </div>
                            <span>Projects</span>
                        </NavLink>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.1, originX: 0 }}
                        className="w-full text-primaryGreen text-lg">
                        {!isPending &&
                            <button className="flex flex-row items-center space-x-2" onClick={logout} >
                                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon w-6 h-6" viewBox="0 0 512 512"><title>Power</title><path d="M378 108a191.41 191.41 0 0170 148c0 106-86 192-192 192S64 362 64 256a192 192 0 0169-148M256 64v192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>
                                <span>Logout</span>
                            </button>}
                        {isPending &&
                            <button className="flex flex-row items-center space-x-2" onClick={logout} >
                                <svg xmlns="http://www.w3.org/2000/svg" class="ionicon w-6 h-6" viewBox="0 0 512 512"><title>Power</title><path d="M378 108a191.41 191.41 0 0170 148c0 106-86 192-192 192S64 362 64 256a192 192 0 0169-148M256 64v192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" /></svg>
                                <span>Logging Out...</span>
                            </button>}
                    </motion.div>
                </nav>
                <div>
                    <Avatar src={document?.profilePicture} userName={document?.displayName} emailAddress={user.email} />
                </div>
            </div>
        </div>

    )
}
