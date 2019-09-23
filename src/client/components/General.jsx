import React from 'react';

import Menu from './Menu/Menu';


const General = ({ children }) => {
    return (
        <>
            <Menu />
            <div>{children}</div>
        </>
    )
};
export default General;