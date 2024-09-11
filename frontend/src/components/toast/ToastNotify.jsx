import React, { useEffect, useRef } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimesCircle } from 'react-icons/fa';
import './toastNotify.scss';

const ToastNotify = ({ show, onClose, message, variant = 'success', delay = 1500 }) => {
    const toastRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (toastRef.current && !toastRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
            const timer = setTimeout(onClose, delay);

            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
                // clearTimeout(timer);
            };
        }
    }, [show, onClose, delay]);

    const getIcon = () => {
        switch (variant) {
            case 'success':
                return <FaCheckCircle className="toast-icon toast-success" />;
            case 'error':
                return <FaTimesCircle className="toast-icon toast-error" />;
            case 'info':
                return <FaInfoCircle className="toast-icon toast-info" />;
            case 'warning':
                return <FaExclamationCircle className="toast-icon toast-warning" />;
            default:
                return null;
        }
    };

    return (
        <ToastContainer position='middle-end' className='p-2'>

            <Toast
                ref={toastRef}
                animation={true}
                delay={delay}
                show={show}
                onClose={onClose}
                className={`toast-${variant}`}
                autohide={true}
            >
                <Toast.Header className={`toast-header toast-${variant}`}>
                    {getIcon()}
                </Toast.Header>
                <Toast.Body>
                    <span className="toast-message">{message}</span>
                </Toast.Body>
            </Toast>
        </ToastContainer>
    );
};

export default ToastNotify;
