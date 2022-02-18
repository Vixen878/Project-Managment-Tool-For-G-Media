import { Link } from "react-router-dom"

export default function PendingProjectsList({ projects }) {

    return (
        <div className="h-[500px]">
            {projects.length === 0 &&
                <div className='pt-48 text-gray-700 flex text-2xl text-center justify-center items-center space-x-2'>
                    <p>Why not get started by requesting a project?</p>
                </div>}
            <div className="mt-7">
                <div className="grid grid-cols-3 px-6 gap-6">
                    {projects.map(project => (
                        <Link to={`/requests/${project.id}`} key={project.id}>
                            <div onClick={null} className='w-72 h-72 shadow-xl flex flex-col justify-center rounded-3xl items-center space-x-2'>
                                <h4>{project.name}</h4>
                                <p>Due by: {project.dueDate.toDate().toDateString()}</p>
                                <span>By: {project.createdBy.displayName}</span>
                                <span>Details: {project.description}</span>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </div>
    )
}
