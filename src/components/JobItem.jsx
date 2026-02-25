import { useState } from "react";
import { applyToJob } from "../services/api";


function JobItem({ job, candidate }) {


    const [repoUrl, setRepoUrl] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");


    const handleSubmit = async () => {


        if (!repoUrl) {
            setMessage("Ingresá la URL del repo");
            return;
        }

        try {

            setLoading(true);

            setMessage("");

            await applyToJob({
                uuid: candidate.uuid,
                jobId: job.id,
                candidateId: candidate.candidateId,
                repoUrl: repoUrl,
            });

            setMessage("Aplicación enviada correctamente");

        } catch (error) {

            setMessage(error.message);

        } finally {

            setLoading(false);
        }
    };


    return (
        <div className="border p-4 rounded mb-4 bg-white shadow">

            <h2 className="font-semibold">{job.title}</h2>

            <input
                type="text"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="URL del repo"
                className="border p-2 w-full mt-2"
            />

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded disabled:bg-gray-400"
            >
                {loading ? "Enviando..." : "Submit"}
            </button>

            {message && <p className="mt-2 text-sm">{message}</p>}
        </div>
    );
}

export default JobItem;
