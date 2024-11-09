//Components
import PageBreakLayout from "../../utility/PageBreakLayout/PageBreakLayout"
import MessagesContainer from "./messagesContainer/MessagesContainer";
import PatientMessageSearchList from "./PatientMessageSearchList/PatientMessageSearchList";
//Hooks
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

/**
 * Message - component to display corespondetion between user and patient
 * 
 * Functionality: 
 * 
 *  [1] - This component work as a wrapper to other child components. It defines structure of page
 * 
 *  [2] - This component is responsible for taking data from loader ( list of patients ) and pass it to child component
 * 
 *  [3] - This compoent set selected patient from list as acctive (this information is using to fetch correspondention with specific 
 *  patient)
 * 
 */

const Messages = () => {
    const patientsList = useLoaderData();
    const [activePatientEmail,SetActivePatientEmail] = useState(null);

    const SetActivePatientHandler = (email) => {
        SetActivePatientEmail(email);
    }

    return (
        <PageBreakLayout narrow>
            <PageBreakLayout.LeftSide>
                <PatientMessageSearchList 
                    patientsList={patientsList} 
                    activePatientEmail={activePatientEmail} 
                    SetActivePatientHandler={SetActivePatientHandler} />
            </PageBreakLayout.LeftSide>
            <PageBreakLayout.RightSide>
                <MessagesContainer activeEmail={activePatientEmail} />
            </PageBreakLayout.RightSide>
        </PageBreakLayout>
    )
}

export default Messages