import React from 'react';

const List = ({value, className, onClick, deleted}) => {
    return (
        <div className={className}>
            Test: {value}
        </div>
    )
}

export default List