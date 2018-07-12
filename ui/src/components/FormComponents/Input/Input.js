import React from "react";
import "./Input.css";

const Input = ({name, labelValue = "", required = "", placeholder = "", value = "", className = "", onChange = () => {}}) => {
    return (
        <span className={className}>
            <label htmlFor={name}>{labelValue}</label>
            <input
                name={name}
                type="text"
                required={required}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </span>
    )
}
export default Input