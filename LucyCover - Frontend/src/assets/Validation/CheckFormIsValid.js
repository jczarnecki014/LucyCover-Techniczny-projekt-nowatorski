 const CheckFormIsValid = (inputs) => {
    for( let id in inputs){
        if(!inputs[id].isValid){
            return false;
        }
    }

    return true;
}

export default CheckFormIsValid;