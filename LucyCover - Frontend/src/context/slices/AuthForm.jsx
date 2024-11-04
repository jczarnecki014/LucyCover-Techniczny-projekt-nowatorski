import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    registerDetails: {
        email:{value:'', isValid: false},
        password: {value:'', isValid: false},
        rePassword: {value:'', isValid: false},
        firstAndLastName: {value:'', isValid: false},
    },
    loginDetails: {
        email:{value:'', isValid: false},
        password: {value:'', isValid: false},
    }
}

const AuthFormSlice = createSlice({
    name: 'AuthFormSlice',
    initialState: defaultState,
    reducers: {
        SetLoginInputs: (state,action) => {
            const {inputId,inputObject} = action.payload
            state.loginDetails = {
                ...state.loginDetails,
                [inputId]:inputObject
            }
        },
        SetRegisterInputs: (state,action) => {
            const {inputId,inputObject} = action.payload
            state.registerDetails = {
                ...state.registerDetails,
                [inputId]:inputObject
            }
        },
    }
})

export const {SetLoginInputs,SetRegisterInputs} = AuthFormSlice.actions
export default AuthFormSlice
