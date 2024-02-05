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
        setActivePatient: (state,action) => {
            state.activePatient = action.payload
        },
        removeActivepatient: (state) => {
            state.activePatient = null
        },
    }
})

export const {setActivePatient,removeActivepatient} = PatientSearchSlice.actions
export default PatientSearchSlice