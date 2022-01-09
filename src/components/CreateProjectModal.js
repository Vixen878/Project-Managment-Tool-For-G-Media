import { Timestamp } from "firebase/firestore"
import { useState } from "react"
import { UseAuthContext } from "../hooks/useAuthContext"
import { UseFirestore } from '../hooks/useFirestore'
import { useHistory } from "react-router-dom"

function CreateProjectModal(props) {

    const history = useHistory()

    const { user } = UseAuthContext()
    const { addDocument, response } = UseFirestore('pending-projects')

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [category, setCategory] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const createdBy = {
            displayName: user.displayName,
            id: user.uid
        }

        const project = {
            name: name,
            description: description,
            dueDate: Timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy: createdBy
        }

        await addDocument(project)
        if (!response.error) {
            props.cModal()
        } else {
            console.log(response.error)
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="relative mt-4">
                    <input
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        id="pName" required name="pName" type="text" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="Project Title" />
                    <label for="pName" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Project Title</label>
                </div>
                <div class="relative mt-7">
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        id="pDescription" required name="pDescription" type="text" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="Project Description" />
                    <label for="pDescription" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Project Description</label>
                </div>
                <div class="relative mt-7">
                    <input
                        onChange={(e) => setDueDate(e.target.value)}
                        value={dueDate}
                        id="dueDate" required name="dueDate" type="date" class="peer h-10 w-full border-b-2 border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600" placeholder="Project Description" />
                    <label for="dueDate" className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Due Date</label>
                </div>
                <button
                    className="inline-flex mt-4 justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                    Create
                </button>
            </form>
        </div >
    )
}

export default CreateProjectModal
