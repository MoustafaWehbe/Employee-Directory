import React from 'react';
import './style.css';
import { Button,Spinner } from 'react-bootstrap'

const Loading = () => {
    return (
        <div className="loader">
            <Spinner
                animation="border"
                size="x-lg"
                role="status"
                variant="primary"
            />
        </div>
    );
}

export default Loading;