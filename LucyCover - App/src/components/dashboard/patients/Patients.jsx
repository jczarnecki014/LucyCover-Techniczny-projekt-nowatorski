import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { OverlayToggle } from '../../../context/slices/OverlayModel_SLICE';

import style from './css/PatientsWrapper.module.css'

// import { DUMMY_PATIENTS } from '../../../assets/DUMMY_DATA/DUMMY_PATIENTS';

import PatientSearch from './PatientSearch/PatientSearch';
import PatientDetails from './PatientDetails/PatientDetails';
import PatientAddingForm from './PatientAdding/PatientAddingForm';
import { AnimatePresence } from 'framer-motion';


const Patients = () => {

    const patientsList = useLoaderData();

    const activePatient = useSelector((state) => state.patientSearch.activePatient)
    const patientAddingMode = useSelector((state) => state.overlayModel.isVisible)

    const dispatch = useDispatch();

    const PatientFormToggler = (displayMode) => {
        dispatch(OverlayToggle(displayMode))
    }

    return (
        <div className={style.Container}>
            
            <AnimatePresence>
                {patientAddingMode && <PatientAddingForm />}
            </AnimatePresence>

            <PatientSearch className={style.PatientSearch} patients={patientsList} showNewPatientForm={PatientFormToggler} />
            <PatientDetails>
                <PatientDetails.Header firstName={activePatient.firstName} lastName={activePatient.lastName} />
                <PatientDetails.NameSection firstName={activePatient.firstName} lastName={activePatient.lastName} />
                <PatientDetails.ContactSection city={activePatient.city} street={activePatient.address} zipCode={activePatient.zipCode} province={activePatient.province} 
                                               phone={activePatient.phoneNumber} email={activePatient.email} />
                <PatientDetails.ChildrenSections children={activePatient.children} />
            </PatientDetails>
        </div>
    )
}

export default Patients