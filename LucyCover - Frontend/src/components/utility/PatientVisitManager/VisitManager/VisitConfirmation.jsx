//Components
import PopupMenu from "../../PatientsPopups/PatientPopupMenu";
import Popup from "../../Popup";
import { useSelector } from "react-redux";
//Hooks
import { useState } from "react"
import { useFormData } from "../../../../hooks/useFormData";

/**
 * VisitConfirmation - Component with e-mail confirmation
 * 
 *  This is children componenent for VisitManager
 * 
 * Props:
 * 
 * @param {boolean} isPending - booleand which information about some processing. If true loading info will display
 * @param {object} activePatient - Details of patient which was selected by user
 * @param {object} activeChildren - Details of patient children which was selected by user
 * @param {string} visitId - If visitId was passed form will work in edit visit mode. In this mode form change slightly
 * @param {Function} mutate - Mutate function invoke when user submit form
 */

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