import { useParams } from "react-router-dom"
import { UseDocument } from "../hooks/useDocument"
import ProjectSummary from "./ProjectSummary"
function Projects() {

    const { id } = useParams()
    const { document, error } = UseDocument('projects', id)

    if (error) {
        return <div className="text-red-900">{error}</div>
    }

    if (!document) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <ProjectSummary project={document} />
        </div>
    )
}

export default Projects
