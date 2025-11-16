import React from 'react';

const MyContainer = ({children, className}) => {
    return (
        <section className={`w-11/12 mx-auto ${className}`}>
            {children}
        </section>
    );
};

export default MyContainer;