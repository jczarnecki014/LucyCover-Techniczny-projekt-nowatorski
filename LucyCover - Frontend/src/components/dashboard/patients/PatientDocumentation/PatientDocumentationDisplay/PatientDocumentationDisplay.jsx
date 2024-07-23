import style from './css/PatientDocumentationDisplay.module.css'
import { useSelector,useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';
import useFetchDocumentation from '../../../../../hooks/useFetchDocumentation';
import { OverlayToggle } from '../../../../../context/slices/OverlayModel_SLICE';
import PatientDocumentationDisplay_FIRST from './PatientDocumentationDisplay_FIRST';
import PatientDocumentationDisplay_NEXT from './PatientDocumentationDisplay_NEXT';
import PatientDocumentationForm_FIRST from '../PatientDocumentationSections/FirstDocumentationSections/PatientDocumentationForm_FIRST';
import PatientDocumentationForm_NEXT from '../PatientDocumentationSections/NextDocumentationSections/PatientDocumentationForm_NEXT';
import DeleteConfirmation from '../../../../utility/PatientsPopups/DeleteConfirmation';
import { DeleteDocumentation } from '../../../../../api/https';
import { AnimatePresence } from 'framer-motion';

const PatientDocumentationDisplay = () => {
    const documentation = useLoaderData()
    const {id,child,date,documentationFirstVisit,documentationNextVisit,first,childrenList,patientId} = documentation
    const [popupMode,setFormMode] = useState('AddingForm / DeleteConfirmation');

    const editFormIsVisible = useSelector((state) => state.overlayModel.isVisible)
    const dispatch = useDispatch();

    const {fetchDocumentation,isSuccess,isError} = useFetchDocumentation(patientId);

    const ShowPopupHandler = (popupMode) => {
        dispatch(OverlayToggle(true))
        setFormMode(popupMode)
    }

    const additionalData = {
        visitDate: date,
        patientChildId: child.id
    }

    return (
        <>
            <AnimatePresence>
                {/* ///////////////////////// Show first time documentation /////////////////////////////////////// */}
                {
                    (editFormIsVisible && popupMode === 'AddingForm'  && first === true) && 
                        <PatientDocumentationForm_FIRST 
                            toDisplayValues = {{...documentationFirstVisit,...additionalData}}
                            childrenList = {childrenList} 
                            documentationId = {id}
                            onFormSubmit = {fetchDocumentation}
                            isSuccess={isSuccess} />
                }

                {/* ///////////////////////// Show next time documentation /////////////////////////////////////// */}
                {
                    (editFormIsVisible && popupMode === 'AddingForm' && first === false) && 
                        <PatientDocumentationForm_NEXT 
                            toDisplayValues={{...documentationNextVisit,...additionalData}} 
                            childrenList = {childrenList} 
                            documentationId = {id}
                            onFormSubmit = {fetchDocumentation} 
                            isSuccess={isSuccess}
                            isError={isError} />
                }

                {/* ///////////////////////// Show delete documentation confirmation ///////////////////////////// */}
                {
                    (editFormIsVisible && popupMode === 'DeleteConfirmation') && <DeleteConfirmation what="dokumentacje" day={date} childName={`${child.childFirstName} ${child.childLastName}`} deleteAction={DeleteDocumentation} elementId={id} redirect={-1} />
                }
            </AnimatePresence>

            <div className={style.Container}>
                <div className={style.TopBar}>
                    <h6>{child.childFirstName}</h6>
                    <h6>{first ? 'Pierwsza wizyta' : 'Kolejna wizyta'}</h6>
                    <h6>Wizyta: {date}</h6>
                    <div className={style.ButtonSection}>
                        <button id={style.EditButton} onClick={()=>ShowPopupHandler('AddingForm')}>Modyfikuj</button>
                        <button id={style.DeleteButton} onClick={()=>ShowPopupHandler('DeleteConfirmation')}>Usuń</button>
                    </div>
                </div>
                {
                    first === true && <PatientDocumentationDisplay_FIRST formInputs={documentationFirstVisit} />
                }
                {
                    first === false && <PatientDocumentationDisplay_NEXT formInputs={documentationNextVisit} />
                }
            </div>
        </>
    )
}

export default PatientDocumentationDisplay