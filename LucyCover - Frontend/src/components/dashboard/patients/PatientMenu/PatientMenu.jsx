import { useLoaderData } from 'react-router-dom' 
import { useSelector, useDispatch } from 'react-redux';
import { OverlayToggle } from '../../../../context/slices/OverlayModel_SLICE';
import {AnimatePresence} from 'framer-motion'
import PatientManageForm from '../PatientManageForm/PatientManageForm'
import PatientLayout from '../PatientLayout/PatientLayout'
import PatientDetails from '../PatientDetails/PatientDetails'

import Menu from './Menu';

const PatientMenu = () => {

    const dispatch = useDispatch();
    const patientFormIsDisplay = useSelector((state) => state.overlayModel.isVisible)

    const activePatient = useLoaderData()

    const {firstName,lastName,city,address,province,zipCode,children,phoneNumber,email} = activePatient


    return (
        <>
            <AnimatePresence>
                {patientFormIsDisplay && <PatientManageForm activePatient={activePatient} />}
            </AnimatePresence>

            <PatientLayout>
                <PatientLayout.LeftSide overflowY>
                    <PatientDetails>
                        <PatientDetails.NameSection firstName={firstName} lastName={lastName}/>
                        <PatientDetails.ContactSection city={city} street={address} zipCode={zipCode} province={province} phone={phoneNumber} email={email} />
                        <PatientDetails.ChildrenSection children={children} />
                    </PatientDetails>
                </PatientLayout.LeftSide>

                <PatientLayout.RightSide>
                    <Menu ShowPatientFormToggler={()=>{dispatch(OverlayToggle(true))}} />
                </PatientLayout.RightSide>
            </PatientLayout>
        </>
    )
}

export default PatientMenu