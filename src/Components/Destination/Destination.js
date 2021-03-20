import React from 'react';
import GoogleMapShow from './GoogleMap/GoogleMap';
import SearchField from './SearchField/SearchField';


const Destination = () => {
    return (
        <div className='container mt-3'>
            <div className="row">
            <div className="left-container col-md-4">
                <SearchField/>
            </div>
            <div className="right-container col-md-8 text-center">
                <GoogleMapShow/>
            </div>
            </div>
        </div>
    );
};

export default Destination;