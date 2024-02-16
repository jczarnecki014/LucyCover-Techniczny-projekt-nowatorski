import { Fragment, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'

import { ClearForm } from '../../../../context/slices/AddPatientForm'
import { OverlayToggle } from '../../../../context/slices/OverlayModel_SLICE'

import PatientForm from './PatientForm/PatientForm'
import ChildrenForm from './ChildrenForm/ChildrenForm'
import Popup from '../../../utility/Popup'


const PatientAddingForm = () => {

    const [formMode,setFormMode] = useState('patient')
    const [childrenList, setChildrenList] = useState([])
    const PatientInputs = useSelector(state => state.addPatientForm.patientInputs)
    const dispatch = useDispatch()

    const {firstName,lastName,birthDay,birthPlace,phoneNumber,email,province,city,address,zipCode} = PatientInputs

    const FormModeChangeHandler = (mode) => {
        setFormMode(mode)
    }

    const AddNewPatientHandler = () => {

        const patientDetails = {
            firstName: firstName.value,
            lastName: lastName.value,
            birthDay: birthDay.value,
            birthPlace: birthPlace.value,
            phoneNumber: phoneNumber.value,
            email: email.value,
            province: province.value,
            city: city.value,
            address: address.value,
            zipCode: zipCode.value,
        }
        
        const newPatient = {
            ...patientDetails,
            children:childrenList
        }

        console.log(newPatient)
        setFormMode('success')
        dispatch(ClearForm())

    }

    const AddChildrenToListHandler = (children) => {
        children = {
            ...children,
            listId: childrenList.length
        }
        setChildrenList(previousState => {
            return [...previousState,children]
        })
    }

    const RemoveChildrenFromListHandler = (childrenId) =>  {
        setChildrenList((previousState) => {
            const newChildrenList = previousState.filter(children => (childrenId !== children.listId))
            return newChildrenList
        })
    }

    return (
        <Fragment>
            {formMode === 'patient' && <PatientForm changeFormMode={FormModeChangeHandler} RemoveChildrenFromList={RemoveChildrenFromListHandler} 
                                                    childrenList={childrenList} AddNewPatient={AddNewPatientHandler} />}
                                                    
            {formMode === 'children' && <ChildrenForm changeFormMode={FormModeChangeHandler} AddChildrenToList={AddChildrenToListHandler} />}

            {formMode === 'childrenWarning' && <Popup type='warning' description="Czy napewno chcesz dodać pacjenta z pustą listą przypisanych noworodków ?" 
                                                    CancleAction={()=>setFormMode('children')} AcceptAction={()=>AddNewPatientHandler()} /> }

            {formMode === 'success' && <Popup type='success' description="Pacjent został dodany pomyślnie"  AcceptAction={()=>dispatch(OverlayToggle(false))} /> }
        </Fragment>
    )
}

export default PatientAddingForm