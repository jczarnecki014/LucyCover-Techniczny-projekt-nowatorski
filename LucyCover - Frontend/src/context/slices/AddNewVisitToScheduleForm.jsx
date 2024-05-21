import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    firstName: {value:'', isValid: false},
    lastName: {value:'', isValid: false},
    birthDate: {value:'', isValid: false},
    phoneNumber: {value:'', isValid: false},
    childFirstName: {value:'', isValid: false},
    childLastName: {value:'', isValid: false},
    childBirthDate: {value:'', isValid: false},
    patientCity: {value:'', isValid: false},
    patientStreet: {value:'', isValid: false},
    patientStreetNumber: {value:'', isValid: false},
    patientZipCode: {value:'', isValid: false},
    visitDate: {value:'', isValid: false},
    visitClock: {value:'', isValid: false},
    visitNote: {value:'', isValid: false},
}

const AddNewVisitToScheduleForm = createSlice({
    name: 'AddNewVisitToScheduleForm',
    initialState:{
        formInputs: defaultState
    },
    reducers: {
        SetInput: (state,action) => {
            const {inputId,inputObject} = action.payload
            state.formInputs = {
                ...state.formInputs,
                [inputId]:inputObject
            }
        },
        SetFormDefault: (state,action) => {
            state.formInputs = defaultState
        }
    }
})

export const {SetInput,SetFormDefault} = AddNewVisitToScheduleForm.actions
export default AddNewVisitToScheduleForm
