import PageBreakLayout from "../../utility/PageBreakLayout/PageBreakLayout"
import MessagesContainer from "./messagesContainer/MessagesContainer";
import PatientMessageSearchList from "./PatientMessageSearchList/PatientMessageSearchList";
import { useLoaderData } from "react-router-dom";
import PatientMessageSearchListElement from "./PatientMessageSearchList/PatientMessageSearchListElement";

const Messages = () => {
    const patientsList = useLoaderData();
    return (
        <PageBreakLayout narrow>
            <PageBreakLayout.LeftSide>
                <PatientMessageSearchList>
                    {patientsList.map(patient => <PatientMessageSearchListElement patient={patient} />)}
                </PatientMessageSearchList>
            </PageBreakLayout.LeftSide>
            <PageBreakLayout.RightSide>
                <MessagesContainer />
            </PageBreakLayout.RightSide>
        </PageBreakLayout>
    )
}

export default Messages