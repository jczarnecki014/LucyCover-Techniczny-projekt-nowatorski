import { createSlice } from "@reduxjs/toolkit";

const PatientSearchSlice = createSlice({
    name: 'PatientSearch',
    initialState:{
        activePatient: {
            id: '',
            firstName: '',
            lastName: '',
            city: '',
            address: '',
            province: '',
            zipCode: '',
            phoneNumber:'',
            email:'',
            children: []
        },
    },
    reducers: {
        SetActivePatient: (state,action) => {
            state.activePatient = action.payload
        },
        RemoveActivepatient: (state) => {
            state.activePatient = null
        },
    }
})

export const {SetActivePatient,RemoveActivepatient} = PatientSearchSlice.actions
export default PatientSearchSlice