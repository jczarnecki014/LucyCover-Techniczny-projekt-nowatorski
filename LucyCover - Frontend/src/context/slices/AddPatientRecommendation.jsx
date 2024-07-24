import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    title: {value:'', isValid: false},
    date: {value:'', isValid: false},
    text: {value:'', isValid: false},
}

const AddPatientRecommendation = createSlice({
    name: 'AddPatientRecommendation',
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

export const {SetInput,SetFormDefault} = AddPatientRecommendation.actions
export default AddPatientRecommendation
