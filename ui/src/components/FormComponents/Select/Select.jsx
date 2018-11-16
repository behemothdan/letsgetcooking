import React from "react";
import PropTypes from "prop-types";

const Select = ({ name, onChange, defaultText, feedback, optionItems, optionKey }) => {
    return (
        <span>
            <select name={name} onChange={onChange} aria-describedby={name + '_error'}>
                <option key={name + "-none"}>{defaultText}</option>
                {optionItems.map(option => (
                    <option key={option[optionKey]} value={option[optionKey]}>{option[optionKey]}</option>
                ))}
            </select>
            <span id={name + '_error'} className="error" role="alert">{feedback}</span>
        </span>
    )
}

Select.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    defaultText: PropTypes.string.isRequired,
    optionItems: PropTypes.array.isRequired,
    feedback: PropTypes.string,
    optionKey: PropTypes.string.isRequired
};

export default Select