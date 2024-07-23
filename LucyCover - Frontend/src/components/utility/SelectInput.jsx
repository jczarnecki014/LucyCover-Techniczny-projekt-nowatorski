import Form from 'react-bootstrap/Form';
import { useState,useEffect } from 'react';
import { AnimatePresence,motion } from 'framer-motion';

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
}) {
  const [isValid,setIsValid] = useState(true);
    console.log(defaultOption)
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