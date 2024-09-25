import PageBreakLayout from "../../utility/PageBreakLayout/PageBreakLayout"
import style from './css/Education.module.css'
import MaterialsList from "./MaterialsList/MaterialsList";
import FileInfo from "./FileInfo/FileInfo";
import AssignedPatients from "./AssignedPatients/AssignedPatients";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { OverlayToggle } from "../../../context/slices/OverlayModel_SLICE";
import { fetchAllEducationMaterial,fetchAllAssignedPatientsToMaterial,queryClient } from "../../../api/https";
import { assignPatientToMaterial } from "../../../api/https";
import ChoosePatientList from "../patients/PatientsList/PatientSearch/ChoosePatientList";
import GetPatientsId from "../../../assets/main/GetPatientsId";
import Popup from "../../utility/Popup";
import AddMaterial from "./AddMaterial/AddMaterial";

const Education = () => {
    const [activeMaterial,setActiveMaterial] = useState({id:null});
    const [assignedPatients,setAssignedPatients] = useState([])
    const [overlayDisplay,setOverlayMode] = useState() //patientSearch // success // error // addMaterial
    const [errorMessage,setErrorMessage] = useState();
    const overlayMode = useSelector(state => state.overlayModel.isVisible)
    const selectedPatient = useSelector(state=>state.patientSearch.activePatient)

    const {data} = useQuery({
        queryKey: ['educationMaterials'],
        queryFn: ({signal}) => fetchAllEducationMaterial({signal}),
        refetchInterval: 5000,
    })

    const {mutate} = useMutation({
        mutationFn: assignPatientToMaterial,
        onError: (error) => {
            console.log(error)
            setOverlayMode("error")
            setErrorMessage(error.message)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['educationMaterials',"assignedPatients"])
            setOverlayMode("success")
        }
    })

    useEffect(()=>{
        const fetchData = async () => {
            const assignedPatients = await queryClient.fetchQuery({
                queryKey:['educationMaterials',"assignedPatients"],
                queryFn: ({signal}) => fetchAllAssignedPatientsToMaterial({signal,materialId:activeMaterial.id})                     
            })
            setAssignedPatients(assignedPatients)
        }

        if(activeMaterial.id !== null) fetchData();

    },[activeMaterial,overlayDisplay,setAssignedPatients])

    const AssignPatientToMaterial = () => {
        mutate({materialId:activeMaterial.id,patientId:selectedPatient.id})
    }


    return (
        <>
            {
                overlayMode && overlayDisplay == "patientSearch"  && 
                                    <ChoosePatientList 
                                        disabledPatients={GetPatientsId(assignedPatients,"patientId")} 
                                        onSelect={{btnLabel:"wybierz",func:AssignPatientToMaterial}}
                                        />
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
                overlayMode && overlayDisplay == "addMaterial"  && <AddMaterial title="Dodaj plik" 
                                                                                setOverlayMode={setOverlayMode}
                                                                                setErrorMessage={setErrorMessage} />
            }
            <PageBreakLayout>
                <PageBreakLayout.LeftSide overflowY>
                    <MaterialsList
                        materials={data} 
                        setActiveMaterial={setActiveMaterial} 
                        activeElement={activeMaterial} 
                        setNewMaterialCreatorMode={()=>setOverlayMode("addMaterial")} />
                </PageBreakLayout.LeftSide>
                <PageBreakLayout.RightSide>
                    <div className={style.container}>
                        <FileInfo 
                            file={activeMaterial} 
                            setOverlayMode={setOverlayMode}
                            setErrorMessage={setErrorMessage} />
                        <AssignedPatients 
                            patients={assignedPatients} 
                            setPatientSearchMode ={()=>setOverlayMode("patientSearch")} 
                            activeMaterial={activeMaterial}/>
                    </div>
                </PageBreakLayout.RightSide>
            </PageBreakLayout>
        </>
    )
}

export default Education