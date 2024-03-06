import { color } from 'framer-motion';
import Form from 'react-bootstrap/Form';

function SelectInput({
    className,
    label,
    options,
    defaultOption,
    controlId,
    onChange
}) {

    const ChangeHandler = (event) => {
       onChange(event.target.value)
    }

  return (
    <Form.Group  className={className}>
      <Form.Label>{label}</Form.Label>
        <Form.Select size='lg' style={{border: '1px solid #888',fontSize: '17px'}} onChange={ChangeHandler} >
        <option defaultChecked disabled>{defaultOption}</option>
        {options.map((option,index) => (
            <option key={index} value={option}>{option}</option>
        ))}
        </Form.Select>
    </Form.Group>
  );
}

export default SelectInput;