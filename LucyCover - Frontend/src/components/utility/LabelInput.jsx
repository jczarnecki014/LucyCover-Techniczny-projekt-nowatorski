import { useState, useRef, useEffect } from "react";

import { motion,AnimatePresence } from "framer-motion";

import { Form } from "react-bootstrap";

const LabelInput = ({
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
        className={boxShadow && 'boxShadow-light'}
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
};

export default LabelInput;
