import PageBreakLayout from "../../utility/PageBreakLayout/PageBreakLayout"
import MessagesContainer from "./messagesContainer/MessagesContainer";
import PatientMessageSearchList from "./PatientMessageSearchList/PatientMessageSearchList";

const Messages = () => {
    return (
        <PageBreakLayout narrow>
            <PageBreakLayout.LeftSide>
                <PatientMessageSearchList>
                    <PatientMessageSearchList.Patient />
                    <PatientMessageSearchList.Patient />
                    <PatientMessageSearchList.Patient />
                    <PatientMessageSearchList.Patient />
                    <PatientMessageSearchList.Patient />
                </PatientMessageSearchList>
            </PageBreakLayout.LeftSide>
            <PageBreakLayout.RightSide>
                <MessagesContainer />
            </PageBreakLayout.RightSide>
        </PageBreakLayout>
    )
}

export default Messages