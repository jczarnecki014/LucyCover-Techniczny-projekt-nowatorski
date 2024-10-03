import PageBreakLayout from "../../utility/PageBreakLayout/PageBreakLayout"
import MessagesContainer from "./messagesContainer/MessagesContainer";
import PatientMessageSearchList from "./PatientMessageSearchList/PatientMessageSearchList";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";

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