import React from 'react';
import { NavLink } from 'react-router';

const MyLink = ({children, to}) => {
    const defaultStyle = 'text-[1rem] font-medium text-secondary-content'
    return (
        <li>
            <NavLink to={to} className={({isActive}) => isActive ? `${defaultStyle} text-primary`:defaultStyle}>{children}</NavLink>
        </li>
    );
};

export default MyLink;