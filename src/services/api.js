//Hacé una llamada GET a la API pasando tu email como parámetro:

//GET {BASE_URL}/api/candidate/get-by-email?email=TU_EMAIL

const BASE_URL = "https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net"

export async function getCandidateByEmail(email) {
    const response = await fetch(
        `${BASE_URL}/api/candidate/get-by-email?email=${email}`);

    if (!response.ok) {
        throw new Error("Error al obtener candidato")
    }

    return await response.json();
}

//Step 3 — Obtener la lista de posiciones abiertas
//Hacé una llamada GET para obtener las posiciones disponibles:

//GET {BASE_URL}/api/jobs/get-list

export async function getJobs() {
    const response = await fetch(`${BASE_URL}/api/jobs/get-list`);

    if (!response.ok) {
        throw new Error("Error al obtener lista de posiciones");
    }

    return await response.json();
}

//aplicamos a un trabajo
export async function applyToJob(data) {
    const response = await fetch(`${BASE_URL}/api/jobs/apply-to-job`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const result = await response.json();

    if (!response.ok) {

        throw new Error(result.message || "Error al aplicar a la posición");
    }

    return result;
}