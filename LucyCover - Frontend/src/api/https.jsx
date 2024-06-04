import { QueryClient } from "@tanstack/react-query"; //query client invalidateQueris 


export const queryClient = new QueryClient();

export async function fetchPatientsForSearchList({signal}) {
    const response = await fetch('https://localhost:7014/api/patients',{signal}) //signal to abort request when left page
    if(!response.ok){
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    
    return data;
}

export async function fetchPatient({signal,patientId}) {
    const response = await fetch(`https://localhost:7014/api/patients/${patientId}`,{signal}) //signal to abort request when left page
    if(!response.ok){
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    
    return data;
}


export async function createNewPatient(patient) {
    const response = await fetch('https://localhost:7014/api/patients',{
        method: 'POST',
        body: JSON.stringify(patient),
        headers:{
            'Content-Type': 'application/json'
        }
    })

    if(response.status !== 201) {
        throw new Error("Error during creating patient")
    }
}