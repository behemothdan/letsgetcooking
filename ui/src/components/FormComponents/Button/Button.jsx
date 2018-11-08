import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

const Button = ({ type, value, buttonClick, className }) => {
    return (
        <button className={className} type={type} onClick={buttonClick}>{value}</button>
    )
}

Button.propTypes = {
    type: PropTypes.oneOf(["submit", "button"]),
    value: PropTypes.string,
    buttonClick: PropTypes.func,
    className: PropTypes.string
}

export default Button