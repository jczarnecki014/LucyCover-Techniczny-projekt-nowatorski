import React from 'react';
//Components
import { motion,AnimatePresence } from "framer-motion";
import { Form } from "react-bootstrap";
//Style
import style from "./css/LabelInput.module.css"
//Hooks
import { useState, useEffect } from "react";

/** 
* LabelInput - component provide input block element with label, input, and validation information
*
* Functionality:
*
* [1] - Displaying full input block which contain label, input and validation information
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
* @param {Function} onInput(inputObject) - function which will be invoke when state of input change. Suplied function should take a argument as 
* object (inputId: "ControlId",inputObject:{value:"", isValid:boolean})
*
* @param {string} value - Value which will be displayed by default
*
* @param {boolean} readonly - boolen which block editing input
*
* @param {boolean} required - boolen which indicates that value can not be null
*
* @param {string} inputType - There is type of input
*
* @param {int} max - if inputType = "number" this property specify number of maximal value in input
*
* @param {int} min - if inputType = "number" this property specify number of minimal value in input
*
* @param {int} placeholder - it set a placeholder of input
*
* @param {function} validateFunction - Predicate to custom validating of input
*
* @param {int} maxLength - value to specify max number of characters in input
*
* @param {boolean} disabled - input is anavaiable to click
*
* @param {boolean} boxShadow - boolean which set boxshadow arround input
*/

const LabelInput = React.memo(({
  controlId,
  label,
  inputType,
  max,
  min,
  placeholder,
  validationFunction,
  required=false,
  maxLenght,
  readonly,
  disabled,
  value='',
  boxShadow,
  className,
  id,
  onInput,
}) => {
  const [isValid,setIsValid] = useState(true)
  const [inputValue,setInputValue] = useState('')
  const InputChangeHandler = (event) => {
    setInputValue(event.target.value)
  }

  let timeout;

  useEffect(()=>{
    setInputValue(value)
  },[value])

  useEffect(()=>{
    timeout = setTimeout(()=>{
      if(readonly){
        return;
      }

      let inputIsValid = true
  
      if(required){
        inputIsValid = inputValue.trim().length > 0
        setIsValid(inputIsValid)
      }

      if(validationFunction !== undefined){
        inputIsValid = validationFunction(inputValue);
        setIsValid(inputIsValid);
      }
  
      const inputObject = {
        inputId: controlId,
        inputObject: {
          value: inputValue,
          isValid:inputIsValid
        }
      }
  
      if(onInput){
        onInput(inputObject)
      }
    },400)

    return () => {
      clearTimeout(timeout)
    }
  },[inputValue])


  return (
    <Form.Group id={id} className={className} controlId={controlId}>
      {
        label && <Form.Label>{label}</Form.Label>
      }
      <motion.input
        style={
          !isValid && {
            borderColor: "#cf2f74",
            color: "#cf2f74",
          }
        }
        className={`${boxShadow && 'boxShadow-light'} ${style.Input}`}
        disabled={readonly || disabled }
        required={required}
        value={inputValue}
        maxLength={maxLenght}
        type={inputType}
        max={max}
        min={min}
        placeholder={placeholder}
        name={controlId}
        onChange={InputChangeHandler}
      />
      <AnimatePresence>
        {!isValid && !disabled && 
            <motion.p initial={{x:-200}} animate={{x:0, color:"#cf2f74"}} exit={{x:-200, opacity:0}}>
                Proszę wypełnić te pole
            </motion.p>
        }
        {!isValid && disabled && 
            <motion.p initial={{x:-200}} animate={{x:0, color:"#cf2f74"}} exit={{x:-200, opacity:0}}>
                Te pole nie może być puste 
            </motion.p>
        }
      </AnimatePresence>
    </Form.Group>
  );
});

export default LabelInput;
