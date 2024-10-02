import { Fragment, useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useMutation } from '@tanstack/react-query'
import { createNewPatient } from '../../../../api/https'
import { queryClient } from '../../../../api/https'

import {useFormData} from '../../../../hooks/useFormData'
import CheckFormIsValid from '../../../../assets/Validation/CheckFormIsValid'

import { ClearForm } from '../../../../context/slices/AddPatientForm'
import { OverlayToggle } from '../../../../context/slices/OverlayModel_SLICE'

import PatientForm from './PatientForm/PatientForm'
import ChildrenForm from './ChildrenForm/ChildrenForm'
import Popup from '../../../utility/Popup'

const PatientManageForm = ({activePatient}) => {
    const patientContextInputs = useSelector(state => state.addPatientForm.patientInputs)
    const getValue = useFormData();
    const dispatch = useDispatch()
    
    const defaultPatientInputs = (activePatient != undefined) ? activePatient : getValue(patientContextInputs)

    const [formMode,setFormMode] = useState('patient')
    const [patientInputs,setPatientInputs] = useState(defaultPatientInputs)
    const [childrenList, setChildrenList] = useState()
    const [childrenInEditMode,setChildrenInEditMode] = useState(null);

    const {mutate,isPending} = useMutation({
        mutationFn: createNewPatient,
        onSuccess: () => {
            setFormMode("success")
            queryClient.invalidateQueries(["patients",defaultPatientInputs.id])
        },
        onError: (error) => {
            console.error(error)
            setFormMode("error")
        }
    })

    useEffect(()=>{
        let defaultChildrenList = [];
        let incrementer = 0;
        if(activePatient){
            defaultChildrenList = activePatient.children.map((childElement)=>{
                return {
                    ...childElement,
                    index: incrementer++
                }
            })
        }
        setChildrenList(defaultChildrenList)
    },[])

    const formIsValid = CheckFormIsValid(patientContextInputs)

    const FormModeChangeHandler = (mode) => {
        setFormMode(mode)
        setPatientInputs(getValue(patientContextInputs))
        setChildrenInEditMode(null);
    }

    const EditChildrenFormDisplay = (childIndex) => {
        const toEditChildren = childrenList.find(child => (childIndex === child.index))
        setChildrenInEditMode(toEditChildren)
        console.log(toEditChildren)
        setFormMode('children')
    }

    const AddNewPatientHandler = () => {

        const patientDetails = getValue(patientContextInputs)
        const newPatient = {
            ...patientDetails,
            children:childrenList,
            patientId: activePatient ? activePatient.id : null
        }
        mutate(newPatient)
        dispatch(ClearForm())
    }

    const AddChildrenToListHandler = (children) => {
        const childrenToSave = {
            ...children,
            id: '00000000-0000-0000-0000-000000000000',
            index: childrenList.length
        }
        setChildrenList(previousState => {
            return [...previousState,childrenToSave]
        })
    }

    console.log(childrenList)

    const RemoveChildrenFromListHandler = (childrenIndex) =>  {
        setChildrenList((previousState) => {
            const newChildrenList = previousState.filter(children => (childrenIndex !== children.index))
            return newChildrenList
        })
    }

    const EditChildrenHandler = (updatedChildren) => {
        setChildrenList((previousState) => {
            const updatedList = previousState.map(children => {
                return (children.index === updatedChildren.index) ? updatedChildren : children
            })
            return updatedList;
        })
        setChildrenInEditMode(null);
    }

    const FormClearHandler = () => {
        dispatch(ClearForm())
        dispatch(OverlayToggle(false))
    }

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
                                            onFormClose={FormClearHandler}
                                            isPending={isPending} />
        }
                                                    
            {formMode === 'children' && <ChildrenForm changeFormMode={FormModeChangeHandler} AddChildrenToList={AddChildrenToListHandler} EditChildren={EditChildrenHandler} defaultValue={childrenInEditMode} />}

            {formMode === 'childrenWarning' && <Popup type='warning' description="Czy napewno chcesz dodać pacjenta z pustą listą przypisanych noworodków ?" CancleAction={()=>setFormMode('children')} AcceptAction={()=>AddNewPatientHandler()} /> }

            {formMode === 'success' && <Popup type='success' description="Pacjent został dodany pomyślnie"  AcceptAction={()=>dispatch(OverlayToggle(false))} /> }

            {formMode === 'error' && <Popup type='error' title="Coś poszło nie tak.." description="Pacjent nie został zapisany w systemie"  AcceptAction={()=>dispatch(OverlayToggle(false))} /> }

        </Fragment>
    )
}

export default PatientManageForm