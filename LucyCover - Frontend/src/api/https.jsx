import { QueryClient } from "@tanstack/react-query"; //query client invalidateQueris 


export const queryClient = new QueryClient();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               GET                                                                         //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function FetchPatientsForSearchList({signal}) {
    const response = await fetch('https://localhost:7014/api/patients',{
        signal,
        credentials:"include"
    })
    if(!response.ok){
        throw new Error(`Coś poszło nie tak podczas pobierania listy pacjentów`)
    }
    const data = await response.json()
    
    return data;
}

export async function FetchPatient({signal,patientId}) {
    const response = await fetch(`https://localhost:7014/api/patients/${patientId}`,{
        signal,
        credentials:"include"
    }) 
    if(!response.ok){
        throw new Error(`Coś poszło nie tak podczas wyświetlania profilu pacjenta`)
    }
    const data = await response.json()
    
    return data;
}

export async function FetchDocumentation({signal,patientId}) {
    const response = await fetch(`https://localhost:7014/api/documentation/${patientId}`,{
        signal,
        credentials:"include"
    }) 
    if(!response.ok){
        throw new Error(`Coś poszło nie tak podczas pobierania dokumentacji`)
    }
    const data = await response.json()
    
    return data;
}

export async function FetchDocumentationDetails({signal,patientId,documentId}) {
    const response = await fetch(`https://localhost:7014/api/documentation/${patientId}/${documentId}`,{
        signal,
        credentials:"include"
    }) 
    if(!response.ok){
        throw new Error(`Coś poszło nie tak podczas pobierania dokumentacji`)
    }
    const data = await response.json()
    
    return data;
}


export async function FetchRecommendation({patientId,signal}) {
    const response = await fetch(`https://localhost:7014/api/recommendation/${patientId}`,{
        signal,
        credentials: "include"
    },) 
    if(!response.ok){
        throw new Error(`Coś poszło nie tak podczas pobierania zalecenia`)
    }
    const data = await response.json()
    
    return data;
}

export async function FetchRecommendationDetails({signal,patientId,recommendationId}) {
    const response = await fetch(`https://localhost:7014/api/recommendation/${patientId}/${recommendationId}`,{
        signal,
        credentials: 'include'
    }) 
    if(!response.ok){
        throw new Error(`Coś poszło nie tak podczas wyświetlania zaleceń`)
    }
    const data = await response.json()
    
    return data;
}

export async function FetchAllPatientVisits({signal,patientId}) {
    const response = await fetch(`https://localhost:7014/api/schedule/patients/${patientId}`,{
        signal: signal,
        credentials: "include"
    }) 
    
    if(!response.ok){
        throw new Error(`Coś poszło nie tak podczas wyświetlania wizyt.`)
    }

    const data = await response.json()
   
    return data;
}

export async function FetchAllAssignedPatientsToMaterial({signal,materialId}) {
    const response = await fetch(`https://localhost:7014/api/educationMaterials/${materialId}`,{
        signal,
        credentials: 'include',
    }) 
    
    if(!response.ok){
        throw new Error(`Wystąpił poroblem podczas pobierania listy pacjentów`)
    }

    const data = await response.json()
   
    return data;
}

export async function FetchAllEducationMaterial({signal}) {
    const response = await fetch(`https://localhost:7014/api/educationMaterials`,{
        signal,
        credentials: 'include',
    }) 
    
    if(!response.ok){
        throw new Error(`Nie można pobrać listy materiałów edukacyjnych.`)
    }

    const data = await response.json()
   
    return data;
}

export async function DownloadEducationMaterial({materialId}) {
    const response = await fetch(`https://localhost:7014/api/educationMaterials/file/${materialId}`,{
        signal,
        credentials: 'include',
    }) 
    if(!response.ok){
        throw new Error("Coś poszło nie tak podczas próby pobrania pliku z serwera !")
    }

    const fileName = response.headers.get("filename");

    return {blob:await response.blob(),fileName};
}

export async function GetVisitsByDate({date,signal}) {
    const response = await fetch(`https://localhost:7014/api/schedule/${date}`,{
        signal,
        credentials: "include"
    }) 
    if(!response.ok){
        throw new Error(`Coś poszło nie tak podczas wyświetlania wizyt.`)
    }
    const data = await response.json()
   
    return data;
}

export async function GetVisitsByMonth({month}) {
    const response = await fetch(`https://localhost:7014/api/schedule/month/${month}`,
    {
        method:'GET',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    }
    ) 
    if(!response.ok){
        throw new Error(`Coś poszło nie tak podczas wyświetlania wizyt.`)
    }

    const data = await response.json()
   
    return data;
}

export async function GetPatientsForPatientsListInMessages({signal}) {
    const response = await fetch(`https://localhost:7014/api/messages/patientsList`,{
        signal,
        credentials:"include"
    }) 
    if(!response.ok){
        throw new Error(`Coś poszło nie tak podczas pobierania listy pacjentów`)
    }

    const data = await response.json()
   
    return data;
}

export async function GetMessagesForEmailAddress({signal,email}) {
    const response = await fetch(`https://localhost:7014/api/messages?patientEmail=${email}`,{
        signal,
        credentials:"include"
    }) 
    if(!response.ok){
        throw new Error(`Coś poszło nie tak podczas pobierania wiadomości`)
    }

    const data = await response.json()
    return data;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               POST                                                                         //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function CreateNewPatient(patient) {
    const response = await fetch('https://localhost:7014/api/patients',{
        method: 'POST',
        body: JSON.stringify(patient),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:"include"
    })
    if(response.status == 409)
    {
        throw new Error("Wystąpił konflikt ! Najprawdopodobniej próbujesz usunać dziecko lub pacjenta dla, którego wciąż istnieje dokumentacja. Pamiętaj a by w pierwszej kolejności usunąć dokumentację przypisaną do dziecka !")
    }
    if(response.status !== 201) {
        throw new Error("Podczas dodwania pacjenta coś poszło nie tak")
    }
}


export async function CreateNewDocumentation({documentationDetails,patientId}) {
    const response = await fetch(`https://localhost:7014/api/documentation/${patientId}`,{
        method: 'POST',
        body: JSON.stringify(documentationDetails),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:"include"
    })

    if(response.status !== 201) {
        throw new Error("Coś poszło nie tak podczas dodawania dokumentacji")
    }
}

export async function CreateNewRecommendation({recommendationDetails,patientId}) {
    const response = await fetch(`https://localhost:7014/api/recommendation/${patientId}`,{
        method: 'POST',
        body: JSON.stringify(recommendationDetails),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if(response.status !== 201) { 
        throw new Error("Coś poszło nie tak podczas dodawania zaleceń.")
    }
}

export async function UpsertVisit({visitDetails,patientId}) {
    const response = await fetch(`https://localhost:7014/api/schedule/${patientId}`,{
        method: 'POST',
        body: JSON.stringify(visitDetails),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if(response.status === 422){
        throw new Error("Błąd podczas walidowania adresu email pacjenta. Wizyta została zaplanowana jednak powiadomienie nie zostało wysłane.")
    }
    if(response.status == 400)
    {
        throw new Error("Wysłano nieprawidłowy formularz proszę upewnić się, że wszystkie pola wypełnione są prawidłowo")
    }
    if(response.status !== 201) { 
        throw new Error("Coś poszło nie tak podczas planowania wizyty, porszę spróbować jeszcze raz lub skontaktować się z administratorem")
    }
}

export async function AssignPatientToMaterial({materialId,patientId}) {
    const response = await fetch(`https://localhost:7014/api/educationMaterials/${materialId}/${patientId}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })

    if(response.status === 422){
        throw new Error ("Użtkownik nie ma przypisanego prawidłowego adresu email do konta !")
    }
    if(!response.ok) {
        throw new Error("Coś poszło nie tak podczas przypisywania pacjenta")
    }
}

export async function AddNewMaterial({formData}) {
    const response = await fetch(`https://localhost:7014/api/educationMaterials`,{
        method: 'POST',
        body: formData,
        credentials: 'include',
    })

    if(response.status == 409) {
        throw new Error("Plik o takiej nazwie już istnieje. Jeżeli chcesz go nadpisać edytuj istniejący materiał")
    }
    if(response.status == 422) {
        throw new Error("Plik jest uszkodzony lub pusty !")
    }
    if(response.status !== 201){
        throw new Error(`Podczas operacji coś poszło nie tak`)
    }
    
}

export async function SendNewMessage({message,patientEmail}) {
    const response = await fetch(`https://localhost:7014/api/messages?patientEmail=${patientEmail}`,{
        method: 'POST',
        body: JSON.stringify(message),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:"include"
    })

    if(!response.ok){
        throw new Error(`Podczas operacji coś poszło nie tak`)
    }
    
    const data = await response.json()
    return data;
}

export async function LogIn(authDetails) {
    const response = await fetch(`https://localhost:7014/api/auth/login`,{
        method: 'POST',
        body: JSON.stringify(authDetails),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if(response.status == 401){
        throw new Error("Podane dane logowania są błędne !")
    }
    if(response.status == 400)
    {
        throw new Error("Nie znaleziono użytkownika")
    }
    else if(!response.ok){
        throw new Error(`Podczas operacji coś poszło nie tak`)
    }
    
    const data = await response.json()
    return data;
}

export async function Logout() {
    const response = await fetch(`https://localhost:7014/api/auth/logout`,{
        method: 'POST',
        credentials: 'include'
    })

    if(response.status == 401){
        throw new Error("Nie jestes zalogowany")
    }
    else if(!response.ok)
    {
        throw new Error("coś poszło nie tak")
    }
    
    return "Zostałeś wylogowany"
}

export async function CreateAccount(authDetails) {
    const response = await fetch(`https://localhost:7014/api/auth/createAccount`,{
        method: 'POST',
        body: JSON.stringify(authDetails),
        headers:{
            'Content-Type': 'application/json'
        },
    })


    if(response.status == 409)
    {
        throw new Error(["Użytkownik z takim adresem email istnieje !"])
    }
    else if(response.status == 400){
        const data = await response.json()
        const errors = data.errors;
        const result = Object.values(errors).join("|")
   
        throw new Error(result)
    }
    else if(!response.ok){
        throw new Error(`Podczas operacji coś poszło nie tak`)
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                               DELETE                                                                      //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export async function DeleteDocumentation({elementId}) {
    const response = await fetch(`https://localhost:7014/api/documentation/${elementId}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials:"include"
    })

    if(response.status !== 204) {
        throw new Error("Coś poszło nie tak podczas usuwania pliku")
    }
}

export async function DeleteRecommendation({elementId}) {
    const response = await fetch(`https://localhost:7014/api/recommendation/${elementId}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include'
    })

    if(response.status !== 204) {
        throw new Error("Coś poszło nie tak podczas usuwania pliku")
    }
}

export async function DeleteEducationMaterial({materialId}) {
    const response = await fetch(`https://localhost:7014/api/educationMaterials/${materialId}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include',
    })

    if(response.status == 404) {
        throw new Error("W systemie nie znaleziono wskazanego pliku")
    }
    if(response.status !== 204){
        throw new Error(`Podczas operacji coś poszło nie tak`)
    }
}

export async function DeleteSchedule({elementId}) {
    const response = await fetch(`https://localhost:7014/api/schedule/${elementId}`,{
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: "include"
    })

    if(response.status !== 204) {
        throw new Error("Coś poszło nie tak podczas usuwanie wizyty ? Czy ta wizyta istnieje ?")
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
        },
        credentials: "include"
    })

    if(!response.ok) {
        throw new Error("Coś poszło nie tak podczas aktualizacji wizyty")
    }
}