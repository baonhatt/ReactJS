import React from 'react';
import './Modal.css'

const Modal = ({ task, onClose }) => {
    return <>
        <div className="modal">
            <h2>Task Details</h2>
            {task ? (
                <p>{task.text}</p>
            ) : (
                <p>No task selected.</p>
            )}
            <button onClick={onClose}>Close</button>
        </div>
    </>
}

export default Modal