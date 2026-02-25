import { useEffect, useState } from "react";
import { getJobs } from "../services/api";
import JobItem from "./JobItem";

function JobList({ candidate }) {


    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        async function fetchJobs() {
            try {

                const data = await getJobs();

                setJobs(data);

            } catch (err) {

                setError("Error al cargar jobs");

            } finally {

                setLoading(false);
            }
        }

        fetchJobs();

    }, []);

    if (loading) return <p>Cargando posiciones...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            {jobs.map((job) => (
                <JobItem
                    key={job.id}
                    job={job}
                    candidate={candidate}
                />
            ))}
        </div>
    );
}

export default JobList;