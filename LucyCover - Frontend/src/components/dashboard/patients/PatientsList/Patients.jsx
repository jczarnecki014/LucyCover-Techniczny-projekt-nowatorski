import React from 'react';
import { useLoaderData } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import { OverlayToggle } from '../../../../context/slices/OverlayModel_SLICE';

import PatientSearch from './PatientSearch/PatientSearch';
import PatientDetails from '../PatientDetails/PatientDetails';
import PatientManageForm from '../PatientManageForm/PatientManageForm';
import { AnimatePresence } from 'framer-motion';
import PatientLayout from '../PatientLayout/PatientLayout';

import {DUMMY_CHILDREN} from '../../../../assets/DUMMY_DATA/DUMMY_CHILDREN'


const Patients = () => {

    const patientsList = useLoaderData();

    const activePatient = useSelector((state) => state.patientSearch.activePatient)
    const patientAddingMode = useSelector((state) => state.overlayModel.isVisible)

    const {id,firstName,lastName,city,address,province,zipCode,phoneNumber,email} = activePatient
    const children = DUMMY_CHILDREN.filter(child => child.patientId == activePatient.id)

    const dispatch = useDispatch();

    const PatientFormToggler = (displayMode) => {
        dispatch(OverlayToggle(displayMode))
    }


    return (

        <>
            <AnimatePresence>
                {patientAddingMode && <PatientManageForm />}
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