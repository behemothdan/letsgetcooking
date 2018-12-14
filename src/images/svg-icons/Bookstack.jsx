import React from 'react';
import PropTypes from 'prop-types';

function Bookstack({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
            aria-describedby="desc" role="img" className={className}>
            <title>Documentation</title>
            <desc>A flat styled icon from Orion Icon Library.</desc>
            <path data-name="layer1"
                d="M62 22H10a10 10 0 0 1 0-20h52a2 2 0 0 1 0 4H10a6 6 0 0 0 0 12h52a2 2 0 0 1 0 4z"
                fill="#f27e7c"></path>
            <path data-name="layer3" d="M61.382 18a25.4 25.4 0 0 1 .039-12H10a6 6 0 0 0 0 12z"
                fill="#eaf7ff"></path>
            <path data-name="layer5" d="M62 42H10a10 10 0 0 1 0-20h52a2 2 0 0 1 0 4H10a6 6 0 0 0 0 12h52a2 2 0 0 1 0 4z"
                fill="#8fa9d8"></path>
            <path data-name="layer3" d="M61.382 38a25.407 25.407 0 0 1 .039-12H10a6 6 0 0 0 0 12z"
                fill="#eaf7ff"></path>
            <path data-name="layer4" d="M62 62H10a10 10 0 0 1 0-20h52a2 2 0 0 1 0 4H10a6 6 0 0 0 0 12h52a2 2 0 0 1 0 4z"
                fill="#71c3f3"></path>
            <path data-name="layer3" d="M61.382 58a25.4 25.4 0 0 1 .039-12H10a6 6 0 0 0 0 12z"
                fill="#eaf7ff"></path>
            <path data-name="layer2" d="M31 32a1 1 0 0 1-1 1H12a1 1 0 0 1-1-1 1 1 0 0 1 1-1h18a1 1 0 0 1 1 1z"
                fill="#cce3ff"></path>
            <path data-name="opacity" d="M14 32l-5.739 5.739A5.963 5.963 0 0 0 10 38a5.956 5.956 0 0 1-1.74-.26l-3.04 3.041A9.945 9.945 0 0 0 9.988 42 10 10 0 0 0 10 62h8l10-9.995z"
                fill="#000064" opacity=".15"></path>
            <path data-name="layer1" fill="#f27e7c" d="M27.998 51.998l-6.999-6.002-7 6.003-.001-19.997 14-.001v19.997z"></path>
        </svg>
    );
}

Bookstack.propTypes = {
    className: PropTypes.string
}

export default Bookstack