//Components
import PageBreakLayout from "../../utility/PageBreakLayout/PageBreakLayout"
import MaterialsList from "./MaterialsList/MaterialsList";
import FileInfo from "./FileInfo/FileInfo";
import AssignedPatients from "./AssignedPatients/AssignedPatients";
import ChoosePatientList from "../../utility/PatientSearchList/ChoosePatientList";
import Popup from "../../utility/Popup";
import AddMaterial from "./AddMaterial/AddMaterial";
//Style
import style from './css/Education.module.css'
//hooks
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
//assets
import GetPatientsId from "../../../assets/main/GetPatientsId";
//api
import { FetchAllEducationMaterial,FetchAllAssignedPatientsToMaterial,queryClient } from "../../../api/https";
import { AssignPatientToMaterial } from "../../../api/https";

/**
 * Education - component to storing and scharing education materials
 * 
 * Functionality: 
 * 
 *  [1] - Work as wrapper to other education components
 * 
 *  [2] - Controling overlay displaying as form overlay, success or error popup
 * 
 *  [3] - This component fetch material list, push new assigment to material and fetch every patients assigned to material
 * 
 */

const Education = () => {
    const [activeMaterial,SetActiveMaterial] = useState({id:null});
    const [assignedPatients,SetAssignedPatients] = useState([])
    const [overlayDisplay,SetOverlayMode] = useState() //patientSearch, addMaterial
    const [errorMessage,SetErrorMessage] = useState();
    const overlayMode = useSelector(state => state.overlayModel.isVisible)
    const selectedPatient = useSelector(state=>state.patientSearch.activePatient)

    const {data} = useQuery({
        queryKey: ['educationMaterials'],
        queryFn: ({signal}) => FetchAllEducationMaterial({signal}),
        refetchInterval: 5000,
    })

    const {mutate,isPending} = useMutation({
        mutationFn: AssignPatientToMaterial,
        onError: (error) => {
            SetOverlayMode("error")
            SetErrorMessage(error.message)
        },
        onSuccess: () => {
            SetOverlayMode("success")
            queryClient.invalidateQueries(['educationMaterials',"assignedPatients"])
        },
        onMutate: () => {
            SetOverlayMode("pending");
        }
    })

    useEffect(()=>{
        const fetchData = async () => {
            const assignedPatients = await queryClient.fetchQuery({
                queryKey:['educationMaterials',"assignedPatients"],
                queryFn: ({signal}) => FetchAllAssignedPatientsToMaterial({signal,materialId:activeMaterial.id})                     
            })
            SetAssignedPatients(assignedPatients)
        }

        if(activeMaterial.id !== null) fetchData();

    },[activeMaterial,overlayDisplay,SetAssignedPatients])

    const AssignPatientHandler = () => {
        mutate({materialId:activeMaterial.id,patientId:selectedPatient.id})
    }


    return (
        <>
            {
                overlayMode && overlayDisplay == "patientSearch"  && <ChoosePatientList 
                                                                        disabledPatients={GetPatientsId(assignedPatients,"patientId")} 
                                                                        onSelect={{btnLabel:"wybierz",func:AssignPatientHandler}} />
            }
            {
                overlayMode && overlayDisplay == "addMaterial"  && <AddMaterial
                                                                            SetOverlayMode={SetOverlayMode}
                                                                            SetErrorMessage={SetErrorMessage} />
            }
            {
                overlayMode && overlayDisplay == "error"  && <Popup 
                                                type="error" 
                                                title="Wystąpił błąd" 
                                                description="Podczas wykonywania operacji coś poszło nie tak. Proszę spróbować ponownie" 
                                                additionalInfo={errorMessage}  />
            }
            {
                overlayMode && overlayDisplay == "success"  && <Popup 
                                                    type="success" 
                                                    title="Sukces !!" 
                                                    description="Operacja zakończona pomyślnie" />
            }
            {
                overlayMode && overlayDisplay == "pending"  && <Popup 
                                                    type="warning" 
                                                    title="Wysyłanie" 
                                                    description="Zaczekaj ! Trwa wysyłanie materiałów do pacjenta" />
            }
            <PageBreakLayout>
                <PageBreakLayout.LeftSide overflowY>
                    <MaterialsList
                        materials={data} 
                        SetActiveMaterial={SetActiveMaterial} 
                        activeElement={activeMaterial} 
                        SetNewMaterialCreatorMode={()=>SetOverlayMode("addMaterial")} />
                </PageBreakLayout.LeftSide>
                <PageBreakLayout.RightSide>
                    <div className={style.container}>
                        <FileInfo 
                            file={activeMaterial} 
                            SetOverlayMode={SetOverlayMode}
                            SetErrorMessage={SetErrorMessage} />
                        <AssignedPatients 
                            patients={assignedPatients} 
                            SetPatientSearchMode ={()=>SetOverlayMode("patientSearch")} 
                            activeMaterial={activeMaterial}/>
                    </div>
                </PageBreakLayout.RightSide>
            </PageBreakLayout>
        </>
    )
}

export default Education