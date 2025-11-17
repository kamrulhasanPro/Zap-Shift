import React from 'react';

const MyContainer = ({children, className}) => {
    return (
        <section className={`max-w-[1600px] px-[3%] mx-auto ${className}`}>
            {children}
        </section>
    );
};

export default MyContainer;