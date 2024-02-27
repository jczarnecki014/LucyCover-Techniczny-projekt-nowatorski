import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { OverlayToggle } from '../../../../context/slices/OverlayModel_SLICE';

import PatientSearch from './PatientSearch/PatientSearch';
import PatientDetails from '../PatientDetails/PatientDetails';
import PatientAddingForm from './PatientAdding/PatientAddingForm';
import { AnimatePresence } from 'framer-motion';
import PatientLayout from '../PatientLayout/PatientLayout';


const Patients = () => {

    const patientsList = useLoaderData();

    const activePatient = useSelector((state) => state.patientSearch.activePatient)
    const patientAddingMode = useSelector((state) => state.overlayModel.isVisible)

    const {id,firstName,lastName,city,address,province,zipCode,children,phoneNumber,email} = activePatient

    const dispatch = useDispatch();

    const PatientFormToggler = (displayMode) => {
        dispatch(OverlayToggle(displayMode))
    }


    return (

        <>
            <AnimatePresence>
                {patientAddingMode && <PatientAddingForm />}
            </AnimatePresence>

            <PatientLayout>
                <PatientLayout.LeftSide>
                    <PatientSearch patients={patientsList} showNewPatientForm={PatientFormToggler} />
                </PatientLayout.LeftSide>

                <PatientLayout.RightSide>
                    <PatientDetails>
                        <PatientDetails.Header id={id} firstName={firstName} lastName={lastName} />
                        <PatientDetails.NameSection firstName={firstName} lastName={lastName} />
                        <PatientDetails.ContactSection city={city} street={address} zipCode={zipCode} province={province} phone={phoneNumber} email={email} />
                        <PatientDetails.ChildrenSection children={children} />
                    </PatientDetails>
                </PatientLayout.RightSide>
            </PatientLayout>
        </>
    )
}

export default Patients