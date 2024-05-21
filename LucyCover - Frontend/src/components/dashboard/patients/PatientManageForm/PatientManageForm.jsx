import { Fragment, useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'

import {useFormData} from '../../../../hooks/useFormData'
import CheckFormIsValid from '../../../../assets/Validation/CheckFormIsValid'

import { ClearForm } from '../../../../context/slices/AddPatientForm'
import { OverlayToggle } from '../../../../context/slices/OverlayModel_SLICE'

import PatientForm from './PatientForm/PatientForm'
import ChildrenForm from './ChildrenForm/ChildrenForm'
import Popup from '../../../utility/Popup'

import {DUMMY_CHILDREN} from '../../../../assets/DUMMY_DATA/DUMMY_CHILDREN'

const PatientManageForm = ({activePatient}) => {

    const patientContextInputs = useSelector(state => state.addPatientForm.patientInputs)
    const getValue = useFormData();
    const dispatch = useDispatch()

    const defaultChildrenList = activePatient ? DUMMY_CHILDREN.filter(child => child.patientId === activePatient.id) : []
    const defaultPatientInputs = (activePatient != undefined) ? activePatient : getValue(patientContextInputs)

    const [formMode,setFormMode] = useState('patient')
    const [patientInputs,setPatientInputs] = useState(defaultPatientInputs)
    const [childrenList, setChildrenList] = useState(defaultChildrenList)
    const [childrenInEditMode,setChildrenInEditMode] = useState(null);

    const formIsValid = CheckFormIsValid(patientContextInputs)

    const FormModeChangeHandler = (mode) => {
        setFormMode(mode)
        setPatientInputs(getValue(patientContextInputs))
        setChildrenInEditMode(null);
    }

    const EditChildrenFormDisplay = (childId) => {
        const toEditChildren = childrenList.find(child => (childId === child.id))
        setChildrenInEditMode(toEditChildren)
        setFormMode('children')
    }

    const AddNewPatientHandler = () => {

        const patientDetails = getValue(patientContextInputs)
        
        const newPatient = {
            ...patientDetails,
            children:childrenList
        }
        setFormMode('success')
        dispatch(ClearForm())
    }

    const AddChildrenToListHandler = (children) => {
        const childrenToSave = {
            ...children,
            id: childrenList.length
        }
        setChildrenList(previousState => {
            return [...previousState,childrenToSave]
        })
    }

    console.log(patientContextInputs)

    const RemoveChildrenFromListHandler = (childrenId) =>  {
        setChildrenList((previousState) => {
            const newChildrenList = previousState.filter(children => (childrenId !== children.id))
            return newChildrenList
        })
    }

    const EditChildrenHandler = (updatedChildren) => {
        setChildrenList((previousState) => {
            const updatedList = previousState.map(children => {
                return (children.id === updatedChildren.id) ? updatedChildren : children
            })
            return updatedList;
        })
        setChildrenInEditMode(null);
    }

    const FormClearHandler = () => {
        dispatch(ClearForm())
        dispatch(OverlayToggle(false))
    }

    console.log(patientInputs)

    return (
        <Fragment>
            {formMode === 'patient' && <PatientForm 
                                            changeFormMode={FormModeChangeHandler} 
                                            RemoveChildrenFromList={RemoveChildrenFromListHandler} 
                                            EditChildrenMode={EditChildrenFormDisplay}
                                            childrenList={childrenList} 
                                            AddNewPatient={AddNewPatientHandler} 
                                            PatientInputs={patientInputs} 
                                            formIsValid={formIsValid} 
                                            onFormClose={FormClearHandler} />}
                                                    
            {formMode === 'children' && <ChildrenForm changeFormMode={FormModeChangeHandler} AddChildrenToList={AddChildrenToListHandler} EditChildren={EditChildrenHandler} defaultValue={childrenInEditMode} />}

            {formMode === 'childrenWarning' && <Popup type='warning' description="Czy napewno chcesz dodać pacjenta z pustą listą przypisanych noworodków ?" CancleAction={()=>setFormMode('children')} AcceptAction={()=>AddNewPatientHandler()} /> }

            {formMode === 'success' && <Popup type='success' description="Pacjent został dodany pomyślnie"  AcceptAction={()=>dispatch(OverlayToggle(false))} /> }
        </Fragment>
    )
}

export default PatientManageForm