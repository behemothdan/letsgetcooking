import React from "react";
import "./Input.css";
import PropTypes from "prop-types";

const Input = ({name, labelValue, required, placeholder, value, className, feedback, onChange = () => {}}) => {
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
                aria-describedby={name + '_error'}
            />
            <span id={name + '_error'} className="error" role="alert">{feedback}</span>
        </span>
    )
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    labelValue: PropTypes.string.isRequired,
    required: PropTypes.oneOf(['true']),
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    feedback: PropTypes.string,
    onChange: PropTypes.func
};

Input.defaultProps = {
    placeholder: "",
    value: "",
    className: "",
    feedback: ""
};

export default Input