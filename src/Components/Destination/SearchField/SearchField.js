import React, { useState } from "react";
import { useParams } from "react-router";
import vehicleList from "../../FakeData/FakeData";
import "./SearchField.css";

const SearchField = () => {
  let {productId} = useParams();
    const vehicleDetail = vehicleList.find(singleVehicleDetails => singleVehicleDetails.id === productId)
    console.log(vehicleDetail);
    const[destinationPlace, setDestinationPlace] = useState({
        isSearch: false,
        pickFrom: '',
        pickTo: ''
    });
    
    const handleSearchPlace = (e) => {
        let isFormValid = true;
    if (e.target.name === 'pickFrom' && e.target.value !== '') {
      isFormValid = true;
    }
    if (e.target.name === "pickTo" && e.target.value !== '') {
      isFormValid = true;
    }
    if (isFormValid) {
      const newDestinationPlace = { ...destinationPlace };
      newDestinationPlace[e.target.name] = e.target.value;
      setDestinationPlace(newDestinationPlace);
      console.log(newDestinationPlace);
    }
    }

    const searchFromSubmit = (e) => {
        if (destinationPlace.pickFrom && destinationPlace.pickTo) {
            const placeSearched = {...destinationPlace};
            placeSearched.isSearch = true;
            setDestinationPlace(placeSearched);
        }
    e.preventDefault()
    }

  return (
    <div className="search-box">
        {
           destinationPlace.isSearch && <div className=' ml-4 mb-5'>
            <h4 className= 'text-center text-danger'>Destination</h4>
            <h2 className='text-success'>{destinationPlace.pickFrom}</h2>
            <h2>to</h2>
            <h2 className='text-success'>{destinationPlace.pickTo}</h2>
            </div>
        }
      <div className="search-form">
        {
            destinationPlace.isSearch? <div> </div> : <form onSubmit={searchFromSubmit}> 
            <div className="form-group">
              <label className="ml-4" htmlFor="pick-place">
                Pick From:
              </label>
                  <input 
                  type="text"
                  name= 'pickFrom' 
                  className="form-search-control"
                  onBlur = {handleSearchPlace} 
                  id="pick-place" 
                  required
                  />
            </div>
            <div className="form-group">
              <label className="ml-4" htmlFor="destination">
                Pick To:
              </label>
                  <input 
                  type="text"
                  name= 'pickTo' 
                  className="form-search-control" 
                  onBlur = {handleSearchPlace}
                  id="destination" 
                  required
                  />
            </div>
            <input
              type="submit"
              className="btn btn-primary btn-size mx-auto d-block"
              value="Search"
            />
          </form>
        }
        
      </div>

       { (destinationPlace.isSearch && vehicleDetail) &&
          <div>
          <div className='d-flex justify-content-around align-items-center mt-2'>
            <img width ='50px' src={vehicleDetail.imgUrl} alt=""/>
            <p>{vehicleDetail.title}</p>
            <p>${vehicleDetail.price}</p>
          </div>
          <div className='d-flex justify-content-around align-items-center mt-2'>
            <img width ='50px' src={vehicleDetail.imgUrl} alt=""/>
            <p>{vehicleDetail.title}</p>
            <p>${vehicleDetail.price}</p>
          </div>
          <div className='d-flex justify-content-around align-items-center mt-2'>
            <img width ='50px' src={vehicleDetail.imgUrl} alt=""/>
            <p>{vehicleDetail.title}</p>
            <p>${vehicleDetail.price}</p>
          </div>
          </div>
        }
       
    </div>
  );
};

export default SearchField;
