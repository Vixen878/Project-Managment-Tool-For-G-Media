import { UseCollection } from "../hooks/useCollection"
import { Link } from "react-router-dom"

export default function ProjectsList({ projects, props }) {

    return (
        <div className="mt-16 flex gap-10">

            <div className="grid grid-cols-3 gap-10">
                {projects.length === 0 && <div className='w-72 h-72 p-10 bg-red-400 text-white text-2xl text-center shadow-2xl flex flex-col justify-center rounded-3xl items-center space-x-2'>
                    <p>It seems like you dont have any projects yet</p>
                </div>}
                {projects.map(project => (
                    <Link to={`/projects/${project.id}`} key={project.id}>
                        <div onClick={null} className='w-72 h-72 shadow-2xl flex flex-col justify-center rounded-3xl items-center space-x-2'>
                            <h4>{project.name}</h4>
                            <p>Due by: {project.dueDate.toDate().toDateString()}</p>
                            <span>By: {project.createdBy.displayName}</span>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    )
}
