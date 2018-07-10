import React from "react";
import "./Input.css";

/* Props list */
const Input = ({name, labelValue = "", required = "", placeholder = "", value = "", className = ""}) => {
    return (
        <span className={className}>
            <label htmlFor={name}>{labelValue}</label>
            <input
                name={name}
                type="text"
                required={required}
                placeholder={placeholder}
                value={value}
            />
        </span>
    )
}

export default Input