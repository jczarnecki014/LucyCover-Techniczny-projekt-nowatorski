import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    motherFirstName: {value:'', isValid: false},
    motherLastName: {value:'', isValid: false},
    motherAge: {value:'', isValid: false},
    motherProfesion: {value:'', isValid: false},
    motherAddress: {value:'', isValid: false},
    babyFirstName: {value:'', isValid: false},
    babyAge: {value:'', isValid: false},
    babyBirthDay: {value:'', isValid: false},
    babyBirthPlace: {value:'', isValid: false},
    babyApgarScore: {value:'', isValid: false},
    babyBirthTime: {value:'O czasie', isValid: true},
    babyBirthTime_ADDITIONAL: {value:'', isValid: true},
    babyBirthType: {value:'Naturalny', isValid: true},
    babyBirthTypeReason: {value:'', isValid: true},
    babyBirthMedicine: {value:'', isValid: false},
    documentationReason: {value:'', isValid: true},
    motherBreastfeedBefore: {value:'Pierwsze dziecko', isValid: true},
    motherBreastfeedBefore_HowLong: {value:'', isValid: true},
    motherBreastfeedBefore_Why: {value:'', isValid: true},
}

const AddFirstDocumentationForm = createSlice({
    name: 'AddFirstDocumentationForm',
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

export const {SetInput,SetFormDefault} = AddFirstDocumentationForm.actions
export default AddFirstDocumentationForm
