import { useLoaderData } from 'react-router-dom' 

import PatientLayout from '../PatientLayout/PatientLayout'
import PatientDetails from '../PatientDetails/PatientDetails'

import Menu from './Menu';

import style from './css/PatientMenu.module.css'

const PatientMenu = () => {

    const activePatient = useLoaderData()

    const {firstName,lastName,city,address,province,zipCode,children,phoneNumber,email} = activePatient


    return (
        <PatientLayout>
            <PatientLayout.LeftSide overflowY>
                <PatientDetails>
                    <PatientDetails.NameSection firstName={firstName} lastName={lastName}/>
                    <PatientDetails.ContactSection city={city} street={address} zipCode={zipCode} province={province} phone={phoneNumber} email={email} />
                    <PatientDetails.ChildrenSection children={children} />
                </PatientDetails>
            </PatientLayout.LeftSide>

            <PatientLayout.RightSide>
                <Menu />
            </PatientLayout.RightSide>
        </PatientLayout>
    )
}

export default PatientMenu