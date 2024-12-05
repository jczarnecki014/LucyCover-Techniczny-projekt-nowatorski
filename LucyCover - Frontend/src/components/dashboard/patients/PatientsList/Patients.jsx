import React from 'react';
//Components
import PatientSearch from './PatientSearch/PatientSearch';
import PatientDetails from '../PatientDetails/PatientDetails';
import PatientManageForm from '../PatientManageForm/PatientManageForm';
import { AnimatePresence } from 'framer-motion';
import PatientLayout from '@components/utility/PageBreakLayout/PageBreakLayout';
//Hooks
import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
//Store
import { OverlayToggle } from '@context/slices/OverlayModel_SLICE';
//Api
import { FetchPatientsForSearchList } from '@api/https';

/**
 * Patients - component to display list of available patients for users. 
 * 
 * Functionality:
 * 
 *  [1] - Displaying list of patients
 * 
 *  [2] - Displaying option to create new patient
 * 
 *  [3] - Displaying details of selected patient
 */

const Patients = () => {

    //take data from cache
    const {data} = useQuery({
        queryKey:['patients'],
        refetchOnWindowFocus:true,
        queryFn: ({signal}) => FetchPatientsForSearchList(signal)                     
    })
    
    const activePatient = useSelector((state) => state.patientSearch.activePatient)
    const patientAddingMode = useSelector((state) => state.overlayModel.isVisible)

    const {id,firstName,lastName,city,address,province,zipCode,phoneNumber,email,children} = activePatient

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
                    <PatientSearch patients={data} showNewPatientForm={PatientFormToggler} />
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