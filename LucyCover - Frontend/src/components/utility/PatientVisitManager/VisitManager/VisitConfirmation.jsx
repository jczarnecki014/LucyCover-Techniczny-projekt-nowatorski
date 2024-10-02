import { useState } from "react"
import PopupMenu from "../../PatientsPopups/PatientPopupMenu";
import Popup from "../../Popup";
import { useSelector } from "react-redux";
import { useFormData } from "../../../../hooks/useFormData";

const VisitConfirmation = ({activePatient,mutate,visitId,activeChildren,isPending}) => {
    // EmailConfirmationMenu / Success / NoEmail / Error
    const [notyficationStep,SetNotyficationStep] = useState('EmailConfirmationMenu');

    const formInputs = useSelector(state => state.addNewVisitToScheduleForm.formInputs)
    const getValue = useFormData(); 

    const generalVisitDetails = getValue(formInputs)

    const OnFormSubmiHandler = (sendEmail=false) => {
        if(sendEmail && !activePatient.email){
            SetNotyficationStep('NoEmail')
            return;
        }

        const visitDetails = {
            id: visitId,
            childId: activeChildren.id,
            ...generalVisitDetails,
            sendEmail
        }

        mutate({visitDetails,patientId:activePatient.id})
    }

    return (
        <>
            {
                notyficationStep === 'EmailConfirmationMenu' && (
                    <PopupMenu 
                        menuTitle='Zaplanuj wizytę' 
                        header="Czy chcesz wysłać powiadomienie email do pacjenta ?" 
                        isPending={isPending}
                        leftBtn={{desc:'Nie wysyłaj', func: ()=>{OnFormSubmiHandler(false)}}}
                        rightBtn={{desc:'Wyślij email', func: ()=>{OnFormSubmiHandler(true)}}} />
                )
            }
            {
                notyficationStep === 'NoEmail' && (
                    <Popup type='warning' title="ZAPLANUJ WIZYTĘ" description={`Pacjent nie ma przypisanego adresu email do swojego konta. Nie mogę wysłać wiadomości email. Skonfiguruj adres email pacjentowi ${activePatient.firstName} ${activePatient.lastName} i zaplanuj wizytę ponownie. `} />
                )
            }
            
        </>
    )
}

export default VisitConfirmation