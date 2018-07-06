import React from "react";
import "./Button.css";

const Button = ({buttonType, buttonValue}) => {
    return (
        <button type={buttonType}>{buttonValue}</button>
    )
}

export default Button