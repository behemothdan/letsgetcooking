import React from "react";
import "./Textbox.css";
import Proptypes from "prop-types";

const Textbox = ({name, labelValue, required, placeholder, value, className, rows, onChange = () => {}}) => {
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
            >
            </textarea>
        </span>
    )

}

Textbox.propTypes = {
    name: Proptypes.string.isRequired,
    labelValue: Proptypes.string.isRequired,
    required: Proptypes.oneOf(['true', 'false']),
    placeholder: Proptypes.string,
    value: Proptypes.string,
    className: Proptypes.string,
    rows: Proptypes.oneOf([1,2,3,4,5]),
    onChange: Proptypes.func
}

Textbox.defaultProps = {
    labelValue: "",
    required: "false",
    placeholder: "",
    value: "",
    className: "",
    row:4
};

export default Textbox