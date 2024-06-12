import { Form } from "react-bootstrap"

import { AnimatePresence,motion } from "framer-motion"

import { useState,useEffect } from "react"

const TextArea = ({
    label,
    className,
    controlId,
    onChange,
    required,
    readonly,
    defaultValue='',
    rows=3,
}) => {
    const [value,setValue] = useState(defaultValue)
    const [textAreaIsValid,setTextAreaIsValid] =useState(true)

    useEffect(()=>{
      setValue(value)
    },[value])

    useEffect(()=>{
      const timeout = setTimeout(()=>{
        let isValid = true;

        if(required && value.trim().length === 0) {
          isValid=false;
        }

        const inputObject = {
          inputId: controlId,
          inputObject: {
            value: value,
            isValid
          }
        }

        setTextAreaIsValid(isValid)

        if(onChange){
          onChange(inputObject)
        }
      },500)

      return () => {
        clearTimeout(timeout)
      }
    },[value])


    const stylex = textAreaIsValid ? {borderColor: '#888', marginBottom:'25px',width:'100%',borderRadius:'5px'} 
                                  : {borderColor: "#cf2f74",  color: "#cf2f74",width:'100%',borderRadius:'5px' }

    return (
        <Form.Group className={className} controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <motion.textarea rows={rows} style={stylex}  onChange={(event)=>setValue(event.target.value)} disabled={readonly} 
                             value={value} />
            <AnimatePresence>
              {!textAreaIsValid && 
                  <motion.p initial={{x:-200}} animate={{x:0, color:"#cf2f74"}} exit={{x:-200, opacity:0}}>
                      Prosze wypełnić te pole
                  </motion.p>
              }
            </AnimatePresence>
        </Form.Group>
    )
}

export default TextArea
