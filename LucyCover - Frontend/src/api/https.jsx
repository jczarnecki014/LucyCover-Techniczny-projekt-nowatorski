import { QueryClient } from "@tanstack/react-query"; //query client invalidateQueris 


export const queryClient = new QueryClient();

export async function fetchPatientsForSearchList({signal}) {
    const response = await fetch('https://localhost:7014/api/patients',{signal}) //signal to abort request whe left page

    const data= await response.json()
    return data;
}