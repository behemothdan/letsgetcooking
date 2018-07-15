import React from "react";
import "./Button.css";
import PropTypes from "prop-types";

const Button = ({buttonType, buttonValue, buttonClick}) => {
    return (
        <button type={buttonType} onClick={buttonClick}>{buttonValue}</button>
    )
}

Button.propTypes = {
    buttonType: PropTypes.string,
    buttonValue: PropTypes.string,
    buttonClick: PropTypes.func
}

export default Button