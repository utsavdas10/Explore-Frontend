import React from "react";

import "./Map.css";

const Map = props => {
    return (
        <div className={`map ${props.className}`} style={props.style}>
        <iframe
            title="map"
            width="100%"
            height="100%"
            src={`https://maps.google.com/maps?q=${props.coordinates.lat},${props.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
        />
        </div>
    );
}

export default Map;