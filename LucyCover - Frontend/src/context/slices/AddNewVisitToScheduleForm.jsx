import { createSlice } from "@reduxjs/toolkit";
import { act } from "react";

const defaultState = {
    city: {value:'', isValid: false},
    street: {value:'', isValid: false},
    streetNumber: {value:'', isValid: false},
    zipCode: {value:'', isValid: false},
    date: {value:'', isValid: false},
    clock: {value:'', isValid: false},
    description: {value:'', isValid: false},
    status: {value:'Zaplanowana', isValid: true}
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
        SetStatus: (state,action) => {
            const recivedData = action.payload
            state.formInputs.status.value = recivedData
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

export const {SetInput,SetFormDefault,LoadDefaultData,SetStatus} = AddNewVisitToScheduleForm.actions
export default AddNewVisitToScheduleForm
