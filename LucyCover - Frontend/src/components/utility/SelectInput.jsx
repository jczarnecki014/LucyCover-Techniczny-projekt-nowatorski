
import Form from 'react-bootstrap/Form';

function SelectInput({
    className,
    label,
    options,
    defaultOption,
    controlId,
    onChange,
    multiple,
    readonly
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

    const MultipleChangeHandler = (event) => {
      const selectedOptions = event.target.selectedOptions;
      const OptionsArray = Array.from(selectedOptions).map(option => option.value)
      const inputObject = {
        inputId: controlId,
        inputObject: {
          value: OptionsArray,
          isValid:true
        }
      }
      onChange(inputObject)
    }

  return (
    <Form.Group  className={className}>
      <Form.Label>{label}</Form.Label>
        <Form.Select size='lg' style={{border: '1px solid #888',fontSize: '17px'}} onChange={multiple ? MultipleChangeHandler : ChangeHandler} defaultValue={defaultOption ? defaultOption : options[0]} multiple={multiple && true} disabled={readonly}>

          {options.map((option,index) => (
            <option  key={index} value={option}>{option}</option>
          ))}

        </Form.Select>
    </Form.Group>
  );
}

export default SelectInput;