import { createSlice } from "@reduxjs/toolkit";

const AddPatientForm = createSlice({
    name: 'AddPatientForm',
    initialState:{
        patientInputs:{
            firstName: {value:'', isValid: false},
            lastName: {value:'', isValid: false},
            birthDay: {value:'', isValid: false},
            birthPlace: {value:'', isValid: false},
            phoneNumber: {value:'', isValid: false},
            email: {value:'', isValid: false},
            province: {value:'', isValid: false},
            city: {value:'', isValid: false},
            address: {value:'', isValid: false},
            zipCode: {value:'', isValid: false},
        },
        childrenInputs: {
            firstName: {value: '', isValid: false},
            lastName: {value: '', isValid: false},
            birthDay: {value: '', isValid: false},
            birthPlace: {value: '', isValid: false},
        }
    },
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
            state.childrenInputs = {
                firstName: {value: '', isValid: false},
                lastName: {value: '', isValid: false},
                birthDay: {value: '', isValid: false},
                birthPlace: {value: '', isValid: false},
            }
        },
        ClearForm: (state) => {
            state.patientInputs = {
                firstName: {value:'', isValid: false},
                lastName: {value:'', isValid: false},
                birthDay: {value:'', isValid: false},
                birthPlace: {value:'', isValid: false},
                phoneNumber: {value:'', isValid: false},
                email: {value:'', isValid: false},
                province: {value:'', isValid: false},
                city: {value:'', isValid: false},
                address: {value:'', isValid: false},
                zipCode: {value:'', isValid: false},
            },
            state.childrenInputs = {
                firstName: {value: '', isValid: false},
                lastName: {value: '', isValid: false},
                birthDay: {value: '', isValid: false},
                birthPlace: {value: '', isValid: false},
            }
        }
    }
})

export const {SetPatientInput,SetChildrenInput,ResetChildrenInputs,ClearForm} = AddPatientForm.actions
export default AddPatientForm
