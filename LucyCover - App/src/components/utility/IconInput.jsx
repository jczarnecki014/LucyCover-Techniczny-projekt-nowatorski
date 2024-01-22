import React from 'react';

import style from './css/IconInput.module.css'

import { Row,Col } from 'react-bootstrap';

const IconInput = ({children,placeholder,value,onInput}) => {
    return (
            <Row className={style.IconInput_Box}>
                <Col xs={10}>
                    <input placeholder={placeholder} value={value} onInput={onInput} />
                </Col>
                <Col xs={2}>
                    {children}
                </Col>
            </Row>
    );
  };

export default IconInput