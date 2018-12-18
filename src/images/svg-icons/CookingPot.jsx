import React from 'react';
import PropTypes from 'prop-types';

function CookingPot({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
            aria-describedby="desc" role="img" className={ className }>
            <title>Cooking Pot</title>
            <desc>A flat styled icon from Orion Icon Library.</desc>
            <path data-name="layer1"
                d="M10 30.5H6.9a5.007 5.007 0 0 0-4.9-4 1 1 0 0 0 0 2 3 3 0 0 1 3 3 1 1 0 0 0 1 1h4a1 1 0 1 0 0-2z"
                fill="#a4b8df"></path>
            <path data-name="opacity" d="M10 30.5H6.9a5.007 5.007 0 0 0-4.9-4 1 1 0 0 0 0 2 3 3 0 0 1 3 3 1 1 0 0 0 1 1h4a1 1 0 1 0 0-2z"
                fill="#21205e" opacity=".1"></path>
            <path data-name="layer1" d="M62 26.5a5.007 5.007 0 0 0-4.9 4H54a1 1 0 0 0 0 2h3.998a1 1 0 0 0 1-1 3 3 0 0 1 3-3 1 1 0 0 0 0-2z"
                fill="#a4b8df"></path>
            <path data-name="layer3" d="M28.609 18.621a4 4 0 1 1 6.752.043"
                fill="#f16465"></path>
            <path data-name="layer2" d="M54.061 27.5v12a12 12 0 0 1-12 12h-20a12 12 0 0 1-12-12v-12z"
                fill="#d3ddf1"></path>
            <path data-name="opacity" d="M48.061 27.5h6v12a11.984 11.984 0 0 1-6 10.381z"
                fill="#fff" opacity=".3"></path>
            <path data-name="layer2" d="M54.061 26.184c-6.492-4.828-13.285-7.686-22-7.686-8.639 0-15.662 2.933-22.125 7.686l.123.318h44z"
                fill="#d3ddf1"></path>
            <path data-name="opacity" d="M16.061 27.5h-6v12a11.985 11.985 0 0 0 6 10.381z"
                fill="#21205e" opacity=".1"></path>
            <path data-name="layer1" d="M10.061 28.5H54c.021 0 .04-.011.061-.012v-1.974c-.021 0-.04-.012-.061-.012H10.061z"
                fill="#a4b8df"></path>
        </svg>
    );
}

CookingPot.propTypes = {
    className: PropTypes.string
}

export default CookingPot