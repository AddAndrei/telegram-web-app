import React from 'react';

const Form = ({method, inputs}) => {
    return (
        <form method={method}>
            {inputs.map(item => item)}
        </form>
    );
};

export default Form;