//Components
import style from '../css/PatientAddingForm.module.css'
import OverlayModel from "@components/utility/OverlayModel"
import PatientFormContactSection from './PatientFormContactSection'
import PatientFormPlaceSection from './PatientFormPlaceSection'
import PatientFormChildrenSection from './PatientFormChildrenSection'
import { AnimatePresence } from 'framer-motion'
//Hooks
import { useCallback } from "react";
import useInputsSilce from "@hooks/useInputsSlice";
//Context
import { SetPatientInput } from '@context/slices/AddPatientForm'

/**
 * PatientForm - component to display patient details inputs in form 
 * 
 *  Parrent component : <PatientManageForm />
 */

const PatientForm = (
    {
        changeFormMode,
        childrenList=[],
        RemoveChildrenFromList,
        AddNewPatient,
        EditChildrenMode,
        PatientInputs,
        inEditMode,
        formIsValid,
        onFormClose,
        isPending
    }
) => {
    const SetPatientInputHandler = useCallback(useInputsSilce(SetPatientInput),[SetPatientInput])

    const FormSubmitHandler = (event) => {
        event.preventDefault();
        if(!formIsValid){
            return;
        }
        if(childrenList.length === 0){
            changeFormMode("childrenWarning")
            return;
        }
        AddNewPatient()
    }

    return (
        <OverlayModel title='Edytuj pacjenta' OnQuitButtonClick={onFormClose} >
            <form className={style.PatientAddingForm} onSubmit={FormSubmitHandler}>
                <PatientFormContactSection setPatientInput={SetPatientInputHandler} patientInputs={PatientInputs}/>
                <PatientFormPlaceSection setPatientInput={SetPatientInputHandler} FormSubmit={FormSubmitHandler} formIsValid={formIsValid} patientInputs={PatientInputs} isPending={isPending} inEditMode={inEditMode} />
                <PatientFormChildrenSection>
                    <AnimatePresence>
                        {childrenList.map((children)=>(
                            <PatientFormChildrenSection.ChildrenElement key={children.index} childrenDetails={children} RemoveChildrenFromList={RemoveChildrenFromList} EditChildrenMode={EditChildrenMode}/>
                        ))}
                    </AnimatePresence>
                    <PatientFormChildrenSection.ChildrenElement setChildrenFormMode={changeFormMode}/>
                </PatientFormChildrenSection>
            </form>
        </OverlayModel>
    )
}

export default PatientForm