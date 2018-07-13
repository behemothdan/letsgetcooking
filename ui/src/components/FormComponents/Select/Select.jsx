import React from "react";
import "./Select.css";
import PropTypes from "prop-types";

const Select = ({name, onChange, defaultText, optionItems}) => {
    return (
        <select name={name} onChange={onChange}>
            <option key={name + "-none"}>{defaultText}</option>
            {optionItems.map(option => (
                <option key={option.type} value={option.type}>{option.type}</option>
            ))}
        </select>
    )
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    defaultText: PropTypes.string.isRequired,
    optionItems: PropTypes.array.isRequired
};

export default Select