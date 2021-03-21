import React from "react";
import GoogleMap from "react-google-maps/lib/components/GoogleMap";
import withGoogleMap from "react-google-maps/lib/withGoogleMap";
import withScriptjs from "react-google-maps/lib/withScriptjs";


function Map() {
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 25.329693, lng: 89.542965 }}
      />
    );
  }

const MapWrapped = withScriptjs(withGoogleMap(Map));
const GoogleMapShow = () => {
    return (
        <div style={{ width: "100%", height: "100vh" ,borderRadius:'10px', marginLeft:'10px'}}>
        <MapWrapped
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDs55VlM1bHizKH_jgafKsoHXVxp2nn3HE`}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `100%` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    );
};

export default GoogleMapShow;