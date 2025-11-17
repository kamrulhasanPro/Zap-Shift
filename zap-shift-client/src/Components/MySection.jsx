import React from 'react';

const MySection = ({children, className}) => {
    return (
        <section className={`bg-base-200 rounded-2xl p-4 sm:p-6 lg:p-16 ${className}`}>
            {children}
        </section>
    );
};

export default MySection;