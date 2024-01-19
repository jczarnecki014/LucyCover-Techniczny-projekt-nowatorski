import {useState,useRef} from 'react'
import {Form} from 'react-bootstrap'


const LabelInput = ({id,label,inputType,placeholder}) => {

    return (
        <Form.Group className="mb-3" controlId={id}>
            <Form.Label>{label}</Form.Label>
            <input type={inputType} placeholder={placeholder}/>
        </Form.Group> 
    )
}

export default LabelInput