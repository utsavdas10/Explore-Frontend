import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom"

import { useHttpClient } from "../../shared/components/hooks/http-hook";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import PlaceList from "../components/PlaceList";


const UserPlaces = () => {
    const userId = useParams().userId;

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedPlaces, setLoadedPlaces] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            try{
                const responseData = await sendRequest(
                    process.env.REACT_APP_BACKEND_API_ENDPOINT + `/api/places/user/${userId}`
                );
                setLoadedPlaces(responseData.places);
            }
            catch(err) {}
        };
        fetchPlaces();
    },[sendRequest, userId]);

    const placeDeletedHandler = (deletedPlaceId) => {
        setLoadedPlaces(prevPlaces => 
            prevPlaces.filter(place => place.id !== deletedPlaceId)
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <PlaceList 
                items={loadedPlaces}
                onDeletePlace={placeDeletedHandler}
            >
                {isLoading && (
                    <div className="center">
                        <LoadingSpinner />
                    </div>
                )}
            </PlaceList>
        </React.Fragment>
    );   
}

export default UserPlaces;