import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    return (
        <div
            className={`${classes.control} ${props.isValid === false ? classes.invalid : ""
                }`}
        >
            <label htmlFor={props.type}>{props.type === 'email' ? "E-mail" : "Password"} </label>
            <input
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.changeHandler}
                onBlur={props.validateHandler}
            />
        </div>
    );
}

export default Input;