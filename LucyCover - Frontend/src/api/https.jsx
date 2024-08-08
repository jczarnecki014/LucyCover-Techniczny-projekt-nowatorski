import { QueryClient } from "@tanstack/react-query"; //query client invalidateQueris 


export const queryClient = new QueryClient();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               GET                                                                         //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function fetchPatientsForSearchList({signal}) {
    const response = await fetch('https://localhost:7014/api/patients',{signal})
    if(!response.ok){
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    
    return data;
}

export async function fetchPatient({signal,patientId}) {
    const response = await fetch(`https://localhost:7014/api/patients/${patientId}`,{signal}) 
    if(!response.ok){
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    
    return data;
}

export async function fetchDocumentation({signal,patientId}) {
    const response = await fetch(`https://localhost:7014/api/documentation/${patientId}`,{signal}) 
    if(!response.ok){
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    
    return data;
}

export async function fetchDocumentationDetails({signal,patientId,documentId}) {
    const response = await fetch(`https://localhost:7014/api/documentation/${patientId}/${documentId}`,{signal}) 
    if(!response.ok){
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    
    return data;
}


export async function fetchRecommendation({patientId,signal}) {
    const response = await fetch(`https://localhost:7014/api/recommendation/${patientId}`,{signal}) 
    if(!response.ok){
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    
    return data;
}

export async function fetchRecommendationDetails({signal,patientId,recommendationId}) {
    const response = await fetch(`https://localhost:7014/api/recommendation/${patientId}/${recommendationId}`,{signal}) 
    if(!response.ok){
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    
    return data;
}

export async function fetchAllPatientVisits({signal,patientId}) {
    const response = await fetch(`https://localhost:7014/api/schedule/${patientId}`,{signal}) 
    
    if(!response.ok){
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
   
    return data;
}


export async function fetchAllEducationMaterial({signal}) {
    const response = await fetch(`https://localhost:7014/api/educationMaterials`,{signal}) 
    
    if(!response.ok){
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
   
    return data;
}

export async function fetchAllAssignedPatientsToMaterial({signal,materialId}) {
    const response = await fetch(`https://localhost:7014/api/educationMaterials/${materialId}`,{signal}) 
    
    if(!response.ok){
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
   
    return data;
}

export async function downloadEducationMaterial({materialId}) {
    const response = await fetch(`https://localhost:7014/api/educationMaterials/file/${materialId}`) 
    if(!response.ok){
        throw new Error(`Request failed with status ${response.status}: ${response.statusText}`)
    }

    const fileName = response.headers.get("filename");

    return {blob:await response.blob(),fileName};
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               POST                                                                         //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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


export async function createNewDocumentation({documentationDetails,patientId}) {
    const response = await fetch(`https://localhost:7014/api/documentation/${patientId}`,{
        method: 'POST',
        body: JSON.stringify(documentationDetails),
        headers:{
            'Content-Type': 'application/json'
        }
    })

    if(response.status !== 201) {
        throw new Error("Something went wrong during posting new documentation")
    }
}

export async function createNewRecommendation({recommendationDetails,patientId}) {
    console.log(recommendationDetails)
    const response = await fetch(`https://localhost:7014/api/recommendation/${patientId}`,{
        method: 'POST',
        body: JSON.stringify(recommendationDetails),
        headers:{
            'Content-Type': 'application/json'
        }
    })

    if(response.status !== 201) {   /// zmien na 201
        throw new Error("Something went wrong during posting new recommendation")
    }
}

export async function upsertVisit({visitDetails,patientId}) {
    const response = await fetch(`https://localhost:7014/api/schedule/${patientId}`,{
        method: 'POST',
        body: JSON.stringify(visitDetails),
        headers:{
            'Content-Type': 'application/json'
        }
    })

    if(response.status !== 200) {   /// zmien na 201
        throw new Error("Something went wrong during posting new shedule")
    }
}

export async function assignPatientToMaterial({materialId,patientId}) {
    const response = await fetch(`https://localhost:7014/api/educationMaterials/${materialId}/${patientId}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        }
    })

    if(response.status === 404){
        throw new Error ("Użtkownik nie ma przypisanego prawidłowego adresu email do konta !")
    }
    if(response.status !== 200) {   /// zmien na 201
        throw new Error("Something went wrong during assigning patient")
    }
}

export async function AddNewMaterial({formData}) {
    const response = await fetch(`https://localhost:7014/api/educationMaterials`,{
        method: 'POST',
        body: formData,
    })

    if(response.status == 409) {
        throw new Error("Plik o takiej nazwie już istnieje. Jeżeli chcesz go nadpisać edytuj istniejący materiał")
    }
    if(response.status !== 201){
        throw new Error(`Podczas operacji coś poszło nie tak`)
    }
    
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               DELETE                                                                      //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function DeleteDocumentation({documentId}) {
    const response = await fetch(`https://localhost:7014/api/documentation/${documentId}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })

    if(response.status !== 204) {
        throw new Error("Something went wrong during deleting documentation")
    }
}

export async function DeleteRecommendation({documentId}) {
    const response = await fetch(`https://localhost:7014/api/recommendation/${documentId}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })

    if(response.status !== 204) {
        throw new Error("Something went wrong during deleting recommendation")
    }
}

export async function DeleteEducationMaterial({materialId}) {
    const response = await fetch(`https://localhost:7014/api/educationMaterials/${materialId}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })

    if(response.status == 409) {
        throw new Error("W systemie nie znaleziono wskazanego pliku")
    }
    if(response.status !== 204){
        throw new Error(`Podczas operacji coś poszło nie tak`)
    }
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               PUT                                                                         //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function ChangeVisitStatus({visitId,visitStatus}) {
    const response = await fetch(`https://localhost:7014/api/schedule/${visitId}?visitStatus=${visitStatus}`,{
        method:'PUT',
        headers:{
            'Content-Type': 'application/json'
        }
    })

    if(response.status !== 200) {
        throw new Error("Something went wrong during updating visit status")
    }
}