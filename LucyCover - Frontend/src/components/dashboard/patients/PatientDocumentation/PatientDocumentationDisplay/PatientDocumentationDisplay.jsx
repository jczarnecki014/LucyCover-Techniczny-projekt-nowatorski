import style from './css/PatientDocumentationDisplay.module.css'

import { useSelector,useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import { useState } from 'react';

import { OverlayToggle } from '../../../../../context/slices/OverlayModel_SLICE';

import PatientDocumentationDisplay_FIRST from './PatientDocumentationDisplay_FIRST';
import PatientDocumentationDisplay_NEXT from './PatientDocumentationDisplay_NEXT';
import PatientDocumentationForm_FIRST from '../PatientDocumentationSections/FirstDocumentationSections/PatientDocumentationForm_FIRST';
import PatientDocumentationForm_NEXT from '../PatientDocumentationSections/NextDocumentationSections/PatientDocumentationForm_NEXT';
import DeleteConfirmation from '../../../../utility/PatientsPopups/DeleteConfirmation';
import { AnimatePresence } from 'framer-motion';

const PatientDocumentationDisplay = () => {
    const documentation = useLoaderData()
    const {baby,date,first} = documentation.documentation
    const [popupMode,setFormMode] = useState('AddingForm / DeleteConfirmation');

    const editFormIsVisible = useSelector((state) => state.overlayModel.isVisible)
    const dispatch = useDispatch();

    const ShowPopupHandler = (popupMode) => {
        dispatch(OverlayToggle(true))
        setFormMode(popupMode)
    }

    return (
        <>
            <AnimatePresence>
                {/* ///////////////////////// Show first time documentation /////////////////////////////////////// */}
                {
                    (editFormIsVisible && popupMode === 'AddingForm'  && first === true) && <PatientDocumentationForm_FIRST toDisplayValues={documentation.documentationDetails} />
                }

                {/* ///////////////////////// Show next time documentation /////////////////////////////////////// */}
                {
                    (editFormIsVisible && popupMode === 'AddingForm' && first === false) && <PatientDocumentationForm_NEXT toDisplayValues={documentation.documentationDetails} />
                }

                {/* ///////////////////////// Show delete documentation confirmation ///////////////////////////// */}
                {
                    (editFormIsVisible && popupMode === 'DeleteConfirmation') && <DeleteConfirmation what="dokumentacje" day={date} patient={baby} />
                }
            </AnimatePresence>

            <div className={style.Container}>
                <div className={style.TopBar}>
                    <h6>{baby}</h6>
                    <h6>{first ? 'Pierwsza wizyta' : 'Kolejna wizyta'}</h6>
                    <h6>Wizyta: {date}</h6>
                    <div className={style.ButtonSection}>
                        <button id={style.EditButton} onClick={()=>ShowPopupHandler('AddingForm')}>Modyfikuj</button>
                        <button id={style.DeleteButton} onClick={()=>ShowPopupHandler('DeleteConfirmation')}>Usuń</button>
                    </div>
                </div>
                {
                    first === true && <PatientDocumentationDisplay_FIRST formInputs={documentation.documentationDetails} />
                }
                {
                    first === false && <PatientDocumentationDisplay_NEXT formInputs={documentation.documentationDetails} />
                }
            </div>
        </>
    )
}

export default PatientDocumentationDisplay