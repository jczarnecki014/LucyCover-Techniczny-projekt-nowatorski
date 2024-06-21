import { createSlice } from "@reduxjs/toolkit";

let defaultState = {
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
    documentationReason: {value:'test2', isValid: true},
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
        LoadDefaultData: (state,action) => {
            const recivedData = action.payload
            let newState = defaultState;
            for(let propName in recivedData){
                newState = {
                    ...newState,
                    [propName]: {
                        value: recivedData[propName],
                        isValid: true //after asigned to inputs onChange function automaticaly check validation of recived inputs //
                    }
                }
            }
            state.formInputs = newState;
        },
        SetFormDefault: (state,action) => {
            state.formInputs = defaultState
        }
    }
})

export const {SetInput,LoadDefaultData,SetFormDefault} = AddFirstDocumentationForm.actions
export default AddFirstDocumentationForm
