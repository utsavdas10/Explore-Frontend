import React from "react";

import './PlaceList.css';

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";

const PlaceList = props => {
    if(props.items.length === 0) {
        return (
            <Card className="place-list center">
                <h2>No places found. Maybe create one?</h2>
                <button>Share Place</button>
            </Card>
        );
    }
    else{
        return (
            <ul className="place-list">
                {props.items.map(place => (
                    <PlaceItem 
                        key={place.id}
                        id={place.id}
                        title={place.title}
                        description={place.description}
                        image={place.imageUrl}
                        address={place.address}
                        coordinates={place.location}
                        creatorId={place.creator}
                    />)
                )}
            </ul>
        )
    }
};

export default PlaceList;