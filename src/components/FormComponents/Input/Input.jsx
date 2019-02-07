import React from "react";
import PropTypes from "prop-types";
import './Input.css';

const Input = ({ name, labelValue, required, placeholder, value, className, feedback, onChange = () => { } }) => {
    return (
        <div className="input">
            {labelValue &&
                <label htmlFor={name}>{labelValue}</label>
            }
            <input
                name={name}
                type="text"
                required={required}
                placeholder={placeholder}
                value={value}
                {...className && { 'className': className }}
                onChange={onChange}
                aria-describedby={name + '_error'}
            />
            <span id={name + '_error'} className="error" role="alert">{feedback}</span>
        </div>
    )
}

Input.propTypes = {
    name: PropTypes.string.isRequired,
    labelValue: PropTypes.string,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    feedback: PropTypes.string,
    onChange: PropTypes.func,
    icon: PropTypes.object
};

Input.defaultProps = {
    placeholder: "",
    value: "",
    className: "",
    feedback: ""
};

export default Input