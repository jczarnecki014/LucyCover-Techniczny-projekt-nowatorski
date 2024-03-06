import { color } from 'framer-motion';
import Form from 'react-bootstrap/Form';

function SelectInput({
    className,
    label,
    options,
    defaultOption
}) {
  return (
    <Form.Group  className={className}>
      <Form.Label>{label}</Form.Label>
        <Form.Select size='lg' style={{border: '1px solid #888',fontSize: '17px'}}>
        <option defaultChecked disabled>{defaultOption}</option>
        {options.map((option) => (
            <option value={option}>{option}</option>
        ))}
        </Form.Select>
    </Form.Group>
  );
}

export default SelectInput;