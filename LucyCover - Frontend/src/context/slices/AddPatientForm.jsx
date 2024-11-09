import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    patientInputs:{
        firstName: {value:'', isValid: false},
        lastName: {value:'', isValid: false},
        birthDate: {value:'', isValid: false},
        birthPlace: {value:'', isValid: false},
        phoneNumber: {value:'', isValid: false},
        email: {value:'', isValid: false},
        province: {value:'', isValid: false},
        city: {value:'', isValid: false},
        address: {value:'', isValid: false},
        zipCode: {value:'', isValid: false},
    },
    childrenInputs: {
        childFirstName: {value: '', isValid: false},
        childLastName: {value: '', isValid: false},
        childBirthDate: {value: '', isValid: false},
        childBirthPlace: {value: '', isValid: false},
    }
}

/**
 * AddPatientForm - Main state for patient form
 */

const AddPatientForm = createSlice({
    name: 'AddPatientForm',
    initialState: defaultState,
    reducers: {
        SetPatientInput: (state,action) => {
            const {inputId,inputObject} = action.payload
            state.patientInputs = {
                ...state.patientInputs,
                [inputId]:inputObject
            }
        },
        SetChildrenInput: (state,action) => {
            const {inputId,inputObject} = action.payload
            state.childrenInputs = {
                ...state.childrenInputs,
                [inputId]:inputObject
            }
        },
        ResetChildrenInputs: (state) => {
            state.childrenInputs = defaultState.childrenInputs
        },
        ClearForm: (state) => {
            state.patientInputs = defaultState.patientInputs,
            state.childrenInputs = defaultState.childrenInputs
        }
    }
})

export const {SetPatientInput,SetChildrenInput,ResetChildrenInputs,ClearForm} = AddPatientForm.actions
export default AddPatientForm
