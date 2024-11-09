import { createSlice } from "@reduxjs/toolkit";

const activePatient_DEFAULT = {
    id: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    birthPlace:'',
    city: '',
    address: '',
    province: '',
    zipCode: '',
    phoneNumber:'',
    email:'',
    children: []
}

const activeChildren_DEFAULT = {
    id: '',
    childFirstName: '',
    childLastName: '',
    childBirthDate: '',
    childBirthPlace:'',
}

/**
 * PatientSearchSlice - State keep information about selected patient and children. It is use by many forms which dependece on selected patient
 */

const PatientSearchSlice = createSlice({
    name: 'PatientSearch',
    initialState:{
        activePatient:activePatient_DEFAULT, 
        activeChildren:activeChildren_DEFAULT,
    },
    reducers: {
        SetActivePatient: (state,action) => {
            state.activeChildren = activeChildren_DEFAULT
            state.activePatient = action.payload
        },
        SetActiveChildren: (state,action) => {
            state.activeChildren = action.payload
        },
        ResetActivePatients: (state) => {
            state.activePatient = activePatient_DEFAULT
            state.activeChildren = activeChildren_DEFAULT
        },
    }
})

export const {SetActivePatient,SetActiveChildren,ResetActivePatients} = PatientSearchSlice.actions
export default PatientSearchSlice