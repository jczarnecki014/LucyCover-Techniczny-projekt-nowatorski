import { useDispatch } from "react-redux";

/**
 * useInputsSilce - this hook is interface between specific form state slice in the store and onInputChange functions in forms inputs
 * 
 * Functionality:
 * 
 *  1. Get input change result object {inputIdExist:id,inputObject:{value,isValid:boolean}} and push it to specific form state in slice
 * 
 *  2. Validating struct of input result object that is passed to the slice
 * 
 * @param {Function} SliceEditFunction  - Action from store slice to edit state
 * 
 * @returns onInputChangeHandler function
 */

const useInputsSilce = (SliceEditFunction) => {
    const dispatch = useDispatch();

    return (inputValueObject) => {
        const inputIdExist = inputValueObject.hasOwnProperty("inputId");
        const inputObjectExist = inputValueObject.hasOwnProperty("inputObject");
        if(!inputIdExist || !inputObjectExist) 
            throw new Error("inputValueObject has to contain inputId and inputObject properties")
        
        const {inputId,inputObject} = inputValueObject
        if(inputObject.value == undefined || inputObject.isValid == undefined ) 
            throw new Error("inputObject has to contain value and isValid property")

        if(inputObject.isValid == null || typeof(inputObject.isValid) == "boolean")
            throw new Error("inputObject.isValid can not be null and has to be boolean")
        dispatch(SliceEditFunction({inputId,inputObject}))
    }
}

export default useInputsSilce