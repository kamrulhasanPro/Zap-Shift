import React from 'react';

const HeadTitle = ({children, className}) => {
    return (
        <h2 className={`text-2xl md:text-4xl lg:text-5xl text-secondary font-extrabold`}>
           {children} 
        </h2>
    );
};

export default HeadTitle;