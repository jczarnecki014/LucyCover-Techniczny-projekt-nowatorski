import { Form } from "react-bootstrap"

const TextArea = ({
    label,
    className,
    controlId
}) => {
    return (
        <Form.Group className={className} controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="textarea" rows={3}  style={{borderColor: '#888', marginBottom:'25px'}}/>
        </Form.Group>
    )
}

export default TextArea