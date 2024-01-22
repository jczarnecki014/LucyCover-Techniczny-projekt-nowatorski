import { useState, useRef } from "react";

import { color, motion,AnimatePresence } from "framer-motion";

import { Form } from "react-bootstrap";

const LabelInput = ({
  controlId,
  styleId,
  label,
  inputType,
  placeholder,
  validationFunction,
  readonly,
  value,
  boxShadow,
  className,
  id,
}) => {
  const [inputIsValid, setInputIsValid] = useState(true);
  const input = useRef("");

  const InputValidation = () => {
    const inputValue = input.current.value;
    const isValid = validationFunction(inputValue);
    setInputIsValid(isValid);
  };

  return (
    <Form.Group id={id} className={className} controlId={controlId}>
      <Form.Label>{label}</Form.Label>
      <motion.input
        style={
          !inputIsValid && {
            borderColor: "#cf2f74",
            color: "#cf2f74",
            scale: 1.1,
          }
        }
        className={boxShadow && 'boxShadow-light'}
        disabled={readonly}
        value={value}
        type={inputType}
        placeholder={placeholder}
        ref={input}
        onBlur={InputValidation}
      />
      <AnimatePresence>
        {!inputIsValid && 
            <motion.p initial={{x:-200}} animate={{x:0, color:"#cf2f74"}} exit={{x:-200, opacity:0}}>
                To pole zostało błędnie wypełnione
            </motion.p>
        }
      </AnimatePresence>
    </Form.Group>
  );
};

export default LabelInput;
