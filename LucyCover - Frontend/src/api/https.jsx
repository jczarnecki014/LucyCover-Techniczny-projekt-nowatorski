import { QueryClient } from "@tanstack/react-query"; //query client invalidateQueris 


export const queryClient = new QueryClient();

export async function fetchPatients({signal}) {
    const response = await fetch('https://localhost:7014/api/patients',{signal}) //signal to abort request whe left page

    const x= await response.json()
    return x;
}