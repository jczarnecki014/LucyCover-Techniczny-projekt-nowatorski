//Components
import Form from 'react-bootstrap/Form';
//Hooks
import { useState,useEffect } from 'react';
import { AnimatePresence,motion } from 'framer-motion';

/** 
* SelectInput - component provide SelectInput block element with label, selectInput, and validation information
*
* Functionality:
*
* [1] - Displaying full SelectInput block which contain label, select input and validation information
*
* [2] - Manipulating state of assigned slice via special inputDetails object
*
*
* Params:
* @param {string} className - styling for input group
*
* @param {string} label - label value (it will be displayed)
*
* @param {string} controlId - identifier of textArea, this value indicates property in specific state of slice. 
* Input with specific controlId will be edit property in state of slice with same name
*
* @param {Function} onChange(inputObject) - function which will be invoke when state of input change. Suplied function should take a argument as 
* object (inputId: "ControlId",inputObject:{value:"", isValid:boolean})
*
* @param {string} defaultOption - Value which will be displayed by default
*
* @param {boolean} readonly - boolen which block editing input
*
* @param {boolean} required - boolen which indicates that value can not be null ( if this option is selected you have to supply default option)
*
* @param {Array} options - Array of options which will be listed
*
* @param {boolean} multiple - boolen indicated that select list should take multiple options as selected
*/

function SelectInput({
    className,
    label,
    options,
    defaultOption,
    controlId,
    onChange,
    multiple,
    readonly,
    required
}) 
{
    const [isValid,setIsValid] = useState(true);

    useEffect(()=>{
      if(required && defaultOption.length <= 0){
        setIsValid(false)
      }
    },[])

    if(multiple) {
      defaultOption = defaultOption ? defaultOption.split(';') : []
    }

    const ChangeHandler = (event) => {
      const inputObject = {
        inputId: controlId,
        inputObject: {
          value: event.target.value,
          isValid:true
        }
      }
       onChange(inputObject)
    }

    const MultipleChangeHandler = (event) => {
      const selectedOptions = event.target.selectedOptions;
      const OptionsArray = Array.from(selectedOptions).map(option => option.value)
      let valid = OptionsArray.length > 0;
      const inputObject = {
        inputId: controlId,
        inputObject: {
          value: OptionsArray.join(';'),
          isValid:valid
        }
      }
      setIsValid(valid)
      onChange(inputObject)
    }

  return (
    <Form.Group  className={className}>
      <Form.Label>{label}</Form.Label>
        <Form.Select size='lg' style={{border: '1px solid #888',fontSize: '17px'}} onChange={multiple ? MultipleChangeHandler : ChangeHandler} value={defaultOption} multiple={multiple && true} disabled={readonly}>
          {options.map((option,index) => (
              <option  key={index} value={option}>{option}</option> 
          ))}
        </Form.Select>
        <AnimatePresence>
        {!isValid && 
            <motion.p initial={{x:-200}} animate={{x:0, color:"#cf2f74"}} exit={{x:-200, opacity:0}}>
                Proszę wypełnić te pole
            </motion.p>
        }
      </AnimatePresence>
    </Form.Group>
  );
}

export default SelectInput;