//Components
import { Form } from "react-bootstrap"
import { AnimatePresence,motion } from "framer-motion"
//Hooks
import { useState,useEffect } from "react"

/** 
* TextArea - component provide textArea block element with label, text area, and validation information
*
* Functionality:
*
* [1] - Displaying full textArea block which contain label, text area and validation information
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
* @param {string} defaultValue - Value which will be displayed by default
*
* @param {boolean} readonly - boolen which block editing input
*
* @param {boolean} required - boolen which indicates that value can not be null
*/

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
    const [textAreaIsValid,setTextAreaIsValid] =useState(true)
    const [value,setValue] = useState("")

    useEffect(()=>{
      setValue(defaultValue)
    },[defaultValue])

    const InputChangeHandler = (event) => {
      setValue(event.target.value)
    }

    useEffect(()=>{
      const timeout = setTimeout(()=>{
        if(readonly){
          return;
        }
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
            <motion.textarea rows={rows} style={stylex}  onChange={InputChangeHandler} disabled={readonly} 
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
