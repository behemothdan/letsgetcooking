import React from "react";
import "./Input.css";

/* Required is an optional parameter */
const Input = ({name, labelValue, required = ""}) => {
    return (
        <span>
            <label htmlFor={name}>{labelValue}</label>
            <input type="text" name={name} required={required} />
        </span>
    )
}

export default Input