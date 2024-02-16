
export function GetPatientsListFilteredByTerm(patientsList,filterTerm=''){

    if(!Array.isArray(patientsList)){
        throw new Error('patientList must be array !')
    }

    patientsList = patientsList.filter((patient)=>{
        
        const patientJSON = JSON.stringify(patient).toLocaleLowerCase();

        const searchTermLoweCase = filterTerm.toLocaleLowerCase()
        
        return (patientJSON.includes(searchTermLoweCase) ? true : false) 
    })

    return patientsList;
}