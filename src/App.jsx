import { useState } from "react";
import { getCandidateByEmail } from "./services/api";
import JobList from "./components/JobList";

function App() {

  const [email, setEmail] = useState("");
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetCandidate = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getCandidateByEmail(email);

      setCandidate(data);

    } catch (err) {
      setError("No se encontró candidato");

    } finally {
      setLoading(false);
    }
  };

  if (!candidate) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-xl font-bold mb-4">
          Ingresá tu email
        </h1>

        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />

        <button
          onClick={handleGetCandidate}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
        >
          {loading ? "Buscando..." : "Continuar"}
        </button>

        {error && (
          <p className="text-red-500 mt-2">
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        Bienvenido {candidate.firstName}
      </h1>

      <JobList candidate={candidate} />
    </div>
  );
}

export default App;