import { color } from 'framer-motion';
import Form from 'react-bootstrap/Form';

function SelectInput({
    className,
    label,
    options,
    defaultOption,
    controlId,
    onChange,
    multiple,
}) {

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

  return (
    <Form.Group  className={className}>
      <Form.Label>{label}</Form.Label>
        <Form.Select size='lg' style={{border: '1px solid #888',fontSize: '17px'}} onChange={ChangeHandler} 
                     defaultValue={defaultOption ? defaultOption : options[0]} multiple={multiple && true}>

          {options.map((option,index) => (
            <option  key={index} value={option}>{option}</option>
          ))}

        </Form.Select>
    </Form.Group>
  );
}

export default SelectInput;