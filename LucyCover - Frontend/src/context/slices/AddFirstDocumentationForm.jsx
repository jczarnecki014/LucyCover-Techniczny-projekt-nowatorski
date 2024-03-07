import { createSlice } from "@reduxjs/toolkit";

const AddFirstDocumentationForm = createSlice({
    name: 'AddFirstDocumentationForm',
    initialState:{
        formInputs:{
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
            babyBirthTime: {value:'', isValid: false},
            babyBirthTime_ADDITIONAL: {value:'', isValid: false},
            babyBirthType: {value:'', isValid: false},
            babyBirthTypeReason: {value:'', isValid: false},
            babyBirthMedicine: {value:'', isValid: false},
            documentationReason: {value:'', isValid: false},
            motherBreastfeedBefore: {value:'', isValid: false},
            motherBreastfeedBefore_HowLong: {value:'', isValid: false},
            motherBreastfeedBefore_Why: {value:'', isValid: false},
        }
    },
    reducers: {
        SetInput: (state,action) => {
            const {inputId,inputObject} = action.payload
            state.formInputs = {
                ...state.formInputs,
                [inputId]:inputObject
            }
        },
    }
})

export const {SetInput} = AddFirstDocumentationForm.actions
export default AddFirstDocumentationForm
