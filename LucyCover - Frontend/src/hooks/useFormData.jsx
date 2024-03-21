export const useFormData = () => {
    return (formData) => {
        if(Object.prototype.toString.call(formData) !== '[object Object]'){
            throw Error('formData must be object')
        }

        let FormDataValues = {};

        for(let element in formData){
            if(formData[element].value === undefined){
                throw Error('formData props must include "value" property')
            }
            FormDataValues = {
                ...FormDataValues,
                [element]: formData[element].value
            }
        }

        return FormDataValues;

    }
}