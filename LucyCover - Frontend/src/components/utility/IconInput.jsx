import React from 'react';

import style from './css/IconInput.module.css'

import { Row,Col } from 'react-bootstrap';

/**
 * IconInput - component which combine icon and input
 * It usualy is use to create search input
 * @param {React.Component} children - react components wrapped by IconInput
 * @param {string} placeholder - placeholder in input
 * @param {string} value - value in input
 * @param {Function} onInput - function will be invoke when input value change
 * @returns 
 */

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