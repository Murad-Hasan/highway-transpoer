import React from "react";
import { Link } from "react-router-dom";
import "./VehicleDetails.css";

const VehicleDetail = (props) => {
  const { id, title, imgUrl } = props.vehicle;

  return (
    <Link className= 'text-decoration-none' to = {"/vehicle/"+id}>
      <div
        className="card text-center mr-4 mb-3"
        style={{ width: "15rem" }}
      >
        <img height={"200px"} src={imgUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <p className="card-text h4">{title}</p>
        </div>
      </div>
    </Link>
  );
};

export default VehicleDetail;
