import React from 'react';
import './style.css';

interface Props {
    children: React.ReactNode;
}


const Modal = ({children}: Props) => {
    return (
        <div className="Modal">
            {children}
        </div>
    )
}

export default Modal;