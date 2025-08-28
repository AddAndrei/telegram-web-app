import React from 'react';

const Input = ({type, className, name}) => {
    return (
        <div>
            <input type={type} className={className} name={name}/>
        </div>
    );
};

export default Input;