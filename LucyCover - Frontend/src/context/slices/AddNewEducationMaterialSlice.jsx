import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    formInputs:{
        id: {value:"00000000-0000-0000-0000-000000000000",isValid:true},
        title: {value:'', isValid: false},
        fileName: {value:'', isValid: false},
        file: {value:'', isValid: false},
    }
}
/**
 * AddNewEducationMaterialSlice - Main form state for education material form (validation and value)
 */

const AddNewEducationMaterialSlice = createSlice({
    name: 'AddNewEducationMaterial',
    initialState: defaultState,
    reducers: {
        SetInput: (state,action) => {
            const {inputId,inputObject} = action.payload
            state.formInputs = {
                ...state.formInputs,
                [inputId]:inputObject
            }
        },
        SetFormDefault: (state,action) => {
            state.formInputs.title={value:'', isValid: false}
            state.formInputs.fileName={value:'', isValid: false}
            state.formInputs.file={value:'', isValid: false}
            state.formInputs.id={value:'00000000-0000-0000-0000-000000000000', isValid: true}
        },
        LoadDefaultData: (state,action) => {
            const recived = action.payload
            if(!recived.id) throw new Error("Id propery is required to load default data");

            state.formInputs.id = {value:recived.id,isValid:true};
            state.formInputs.title = {value:recived.fileTitle,isValid:true};
            state.formInputs.fileName = {value:recived.fileName,isValid:true};
            state.formInputs.file = {value:recived.filePath,isValid:true};
        },
    }

})


export const {SetInput,SetFormDefault,LoadDefaultData} = AddNewEducationMaterialSlice.actions
export default AddNewEducationMaterialSlice
