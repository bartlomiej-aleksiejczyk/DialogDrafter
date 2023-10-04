import React from 'react';
import ReactDOM from 'react-dom';

// TODO: Convert style to classname
export const DropdownPortal = ({ children, position }) => {

    const dropdown = (
        <div
            className={`fixed top [${position.y}] left [${position.x}]`}
            style={{ position: 'fixed', top: position.y, left: position.x }}>
            {children}
        </div>
    );

    return ReactDOM.createPortal(dropdown, document.body);
};