import { useParams } from "react-router-dom"
import { UseDocument } from "../hooks/useDocument"
import RequestSummary from "./RequestSummary"
import happy from "../components/undraw_Happy_announcement_re_tsm0.png"

function Requests() {

    const { id } = useParams()
    const { document, error } = UseDocument('requests', id)

    if (error) {
        return (
            <div className="flex mt-16 flex-col w-full justify-center items-center">
                <span className="text-6xl font-bold text-primaryGreen">HOORAY!!!</span>
                <img className="w-72 " src={happy} alt="" />
                <span className="text-4xl text-primaryGreen font-bold">
                    Your Request Has Been Approved!
                </span>
                <div className="bg-primaryGreen rounded-md cursor-pointer p-3 mt-10">
                    <span className="text-white">
                        Go to projects Dashboard
                    </span>
                </div>
            </div>
        )
    }

    if (!document) {
        return <div>Loading...</div>
    }

    return (
        <div className="w-full">
            <RequestSummary request={document} />
        </div>
    )
}

export default Requests
