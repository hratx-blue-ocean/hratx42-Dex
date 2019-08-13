import React from 'react';
import {Alert} from 'react-bootstrap';

const Flash = ({flashData}) => {
    return flashData.show ? ( 
        <div className="flash-container">
            <Alert variant={flashData.variant}>{flashData.message}</Alert> 
        </div>
    ) : null;
}
 
export default Flash;