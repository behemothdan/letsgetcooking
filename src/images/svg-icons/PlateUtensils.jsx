import React from 'react';
import PropTypes from 'prop-types';

function PlateUtensils({ className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" aria-labelledby="title"
            aria-describedby="desc" role="img" className={ className }>
            <title>Dinner</title>
            <desc>A flat styled icon from Orion Icon Library.</desc>
            <path data-name="layer4"
                d="M61.716 34.171V48a2 2 0 0 1-2 2 2 2 0 0 1-2-2V34.059" fill="#f16465"></path>
            <path data-name="layer1" d="M61.716 34.173V12.007a6.342 6.342 0 0 0-6.334 6.348V31a3.17 3.17 0 0 0 3.167 3.174z"
                fill="#bacae8"></path>
            <circle data-name="layer3" cx="32.72" cy="32.995" r="19" fill="#e6ecf8"></circle>
            <circle data-name="layer2" cx="32.72" cy="32.995" r="11" fill="#d3ddf1"></circle>
            <path data-name="opacity" d="M32.72 22c-.337 0-.67.02-1 .05a10.995 10.995 0 0 1 0 21.9c.33.03.663.05 1 .05a11 11 0 0 0 0-22z"
                fill="#21205e" opacity=".05"></path>
            <path data-name="layer1" d="M10.517 12.011h-2.8v9.5a1 1 0 1 1-2 0v-9.5h-2.8l-.633 12.666a3.543 3.543 0 0 0 2.434 3.451v19.879a2 2 0 1 0 4 0V28.128a3.544 3.544 0 0 0 2.434-3.451z"
                fill="#bacae8"></path>
        </svg>
    );
}

PlateUtensils.propTypes = {
    className: PropTypes.string
}

export default PlateUtensils