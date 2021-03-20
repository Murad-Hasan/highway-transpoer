import React, { useState } from 'react';
import vehicleList from '../FakeData/FakeData';
import VehicleDetail from '../VehicleDetail/VehicleDetail';
import './Home.css'

const Home = () => {
    const [vehicleDetails, setVehicleDetails] = useState(vehicleList);
    return (
        <div className="home-background" >
                <div className="container">
                <div className="row justify-content-center" style= {{paddingTop: '200px'}}>   
                {
                    vehicleDetails.map( vehicle => <VehicleDetail  key = {vehicle.id} vehicle={vehicle}></VehicleDetail> )
                }
                </div>
                </div>
                
        </div>
    );
};

export default Home;