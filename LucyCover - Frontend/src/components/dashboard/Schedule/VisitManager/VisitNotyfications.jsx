import { useState } from "react"
import PopupMenu from "../../../utility/PatientsPopups/PatientPopupMenu";
import Popup from "../../../utility/Popup";

const VisitNotyfications = ({activePatient}) => {

    // EmailConfirmationMenu / Success / NoEmail / Error
    const [notyficationStep,SetNotyficationStep] = useState('EmailConfirmationMenu');

    const OnNoSendEmailHandler = () => {
        SetNotyficationStep('Success')
    }

    const OnSendEmailHandler = () => {
        if(!activePatient.email){
            SetNotyficationStep('NoEmail')
            return;
        }
        SetNotyficationStep('Success')
    }

    return (
        <>
            {
                notyficationStep === 'EmailConfirmationMenu' && (
                    <PopupMenu 
                        menuTitle='Zaplanuj wizytę' 
                        header="Czy chcesz wysłać powiadomienie email do pacjenta ?" 
                        leftBtn={{desc:'Nie wysyłaj', func: ()=>{OnNoSendEmailHandler()}}}
                        rightBtn={{desc:'Wyślij email', func: ()=>{OnSendEmailHandler()}}} />
                )
            }

            {
                notyficationStep === 'Success' && (
                    <Popup type='success' title="ZAPLANUJ WIZYTĘ" description="Wizyta została zaplanowana" />
                )
            }

            {
                notyficationStep === 'NoEmail' && (
                    <Popup type='warning' title="ZAPLANUJ WIZYTĘ" description="Pacjent nie ma przypisanego adresu email do swojego konta. Nie mogę wysłać wiadomości email. Wizyta została zaplanowana w twoim kalendarzu." />
                )
            }
            
        </>
    )
}

export default VisitNotyfications