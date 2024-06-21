import { useState } from 'react';
import Form from 'react-bootstrap/Form';

function SelectList({
    className,
    label,
    options,
    defaultOption=null,
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
        <Form.Select size='lg' style={{border: '1px solid #888',fontSize: '17px'}} onChange={multiple ? MultipleChangeHandler : ChangeHandler} defaultValue={!defaultOption ? null : options[0].value} multiple={multiple && true} disabled={readonly}>
          {!defaultOption && ( 
            <option disabled selected>Wybierz dziecko</option>
          )}
          {options.map((option,index) => (
              <option  key={index} value={option.value}>{option.label}</option> 
          ))}

        </Form.Select>
    </Form.Group>
  );
}

export default SelectList;