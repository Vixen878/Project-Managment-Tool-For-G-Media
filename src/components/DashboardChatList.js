import React from 'react';
import { Link } from "react-router-dom"

import { UseAuthContext } from '../hooks/useAuthContext';
import { UseCollection } from '../hooks/useCollection';

const DashboardChatList = () => {
    const { user } = UseAuthContext();
    // const [messages, setMessages] = useState([])

    const projects = UseCollection("requests", ["uid", "==", user.uid]).documents;

    const chats = UseCollection("messages", ["Cid", "==", user.uid]).documents;

    chats?.forEach(chat => {
        chat.project = projects.filter(p => p.id == chat.projectId)[0]
    });

    return (
        <div>
            {!chats && <span>No chats</span>}
            {chats &&
                <div className='space-y-3 mt-5'>
                    {chats.map(chat => (
                        <div>
                            {
                                chat.project.isApproved &&
                                <Link to={`/project/${chat.projectId}`} key={chat.projectId}>
                                    <div className="p-4 flex rounded-lg space-x-6 items-center border">
                                        <div className="flex flex-col items-center justify-center">
                                            <img className="rounded-full ml-4 bg-primaryGreen w-12 h-12" src="/images/idea.png" alt="User Avatar" />

                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-primaryGreen text-2xl font-semibold">{chat.project.name}</span>
                                            <span className="text-gray-500 text-lg">Click to show chat</span>
                                        </div>
                                    </div>
                                </Link>
                            }

                            {
                                !chat.project.isApproved &&
                                <Link to={`/requests/${chat.projectId}`} key={chat.projectId}>
                                    <div className="p-4 flex rounded-lg space-x-6 items-center border">
                                        <div className="flex flex-col items-center justify-center">
                                            <img className="rounded-full ml-4 bg-primaryGreen w-12 h-12" src="/images/idea.png" alt="User Avatar" />

                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-primaryGreen text-2xl font-semibold">{chat.project.name}</span>
                                            <span className="text-gray-500 text-lg">Sexy description</span>
                                        </div>
                                    </div>
                                </Link>
                            }
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default DashboardChatList;
