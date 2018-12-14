import React from 'react';
import PropTypes from 'prop-types';

function RecipeBook({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
            aria-describedby="desc" role="img" className={ className }>
            <title>Bookmark</title>
            <desc>A flat styled icon from Orion Icon Library.</desc>
            <path data-name="layer3"
                d="M54 14H16a6 6 0 0 1 0-12h38z" fill="#e1f0ff"></path>
            <path data-name="layer2" d="M54 13H16a5 5 0 0 1 0-10h38a1 1 0 1 0 0-2H16a7.008 7.008 0 0 0-7 7v49a6 6 0 0 0 6 6h39a1 1 0 0 0 1-1V14a1 1 0 0 0-1-1z"
                fill="#71c3f3"></path>
            <path data-name="opacity" fill="#000064" opacity=".15" d="M45.999 35.496l-7.915-6.003-8.085 6.003V13h16v22.496zM16 13a5 5 0 0 1 0-10V1h-.01A7.008 7.008 0 0 0 9 8v49a6 6 0 0 0 6 6h1z"></path>
            <path data-name="layer1" fill="#f27e7c" d="M47.999 33.996l-7.915-6.003-8.085 6.003V9.995h16v24.001z"></path>
        </svg>
    );
}

RecipeBook.propTypes = {
    className: PropTypes.string
}

export default RecipeBook