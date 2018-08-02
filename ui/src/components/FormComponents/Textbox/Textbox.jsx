import React from "react";
import "./Textbox.css";
import PropTypes from "prop-types";

const Textbox = ({name, labelValue, required, placeholder, value, className, feedback, rows, onChange = () => {}}) => {
    return(
        <span>
            <label htmlFor={name}>{labelValue}</label>
            <textarea
                name={name}
                required={required}
                placeholder={placeholder}
                value={value}
                className={className}
                onChange={onChange}
                rows={rows}
                aria-describedby={name + '_error'}
            >
            </textarea>
            <span id={name + '_error'} className="error" role="alert">{feedback}</span>
        </span>
    )

}

Textbox.propTypes = {
    name: PropTypes.string.isRequired,
    labelValue: PropTypes.string.isRequired,
    required: PropTypes.oneOf(['true']), // Don't pass in required prop if you don't want it to be required
    placeholder: PropTypes.string,
    value: PropTypes.string,
    className: PropTypes.string,
    feedback: PropTypes.string,
    rows: PropTypes.oneOf([1,2,3,4,5]),
    onChange: PropTypes.func
}

Textbox.defaultProps = {
    labelValue: "",
    placeholder: "",
    value: "",
    className: "",
    row:4,
    feedback: ""
};

export default Textbox