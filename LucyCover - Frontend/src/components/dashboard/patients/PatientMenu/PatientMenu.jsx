//Components
import {AnimatePresence} from 'framer-motion'
import PatientManageForm from '../PatientManageForm/PatientManageForm'
import PatientLayout from '../../../utility/PageBreakLayout/PageBreakLayout'
import PatientDetails from '../PatientDetails/PatientDetails'
import Menu from './Menu';
//Style
//Hooks
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useSelector, useDispatch } from 'react-redux';
//Store
import { OverlayToggle } from '../../../../context/slices/OverlayModel_SLICE';
//Api
import { FetchPatient } from '../../../../api/https';


/**
 * PatientMenu - component to display patient main page
 * 
 * Functionality: 
 * 
 *  [1] - Displaying menu for patient
 * 
 *  [2] - Displaying basis information about patient
 * 
 *  [3] - Adding new patient
 */

const PatientMenu = () => {
    const dispatch = useDispatch();
    const patientFormIsDisplay = useSelector((state) => state.overlayModel.isVisible)
    const params = useParams();

    const {data} = useQuery({
        queryKey:["patients",params.patientId],
        queryFn: ({signal}) => FetchPatient({signal,patientId:data.id})  
    })

    const {firstName,lastName,city,address,province,zipCode,children,phoneNumber,email} = data

    return (
        <>
            <AnimatePresence>
                {patientFormIsDisplay && <PatientManageForm activePatient={data} />}
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