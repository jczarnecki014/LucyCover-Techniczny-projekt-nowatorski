import { Form } from "react-bootstrap"

const TextArea = ({
    label,
    className,
    controlId,
    onChange
}) => {
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
        <Form.Group className={className} controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="textarea" rows={3}  style={{borderColor: '#888', marginBottom:'25px'}} onBlur={ChangeHandler} />
        </Form.Group>
    )
}

export default TextArea