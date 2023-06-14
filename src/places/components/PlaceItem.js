import React, {useState, useContext} from "react";

import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import Modal from "../../shared/components/UIElements/Modal";
import Map from "../../shared/components/UIElements/Map";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { AuthContext } from "../../shared/context/auth-context";

import { useHttpClient } from "../../shared/components/hooks/http-hook";


import "./PlaceItem.css";

const PlaceItem = props => {
    const auth = useContext(AuthContext);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    
    const [showMap, setShowMap] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const openConfirmHandler = () => setShowConfirmModal(true);

    const closeConfirmHandler = () => setShowConfirmModal(false);

    const confirmDeleteHandler = async () => {
        try {
            await sendRequest(
                `http://localhost:5000/api/places/${props.id}`,
                "DELETE"
            );
            setShowConfirmModal(false);
            props.onDelete(props.id);
        } catch (err) {}
    }


    const footerElement =
                <React.Fragment>
                    <Button inverse onClick={closeConfirmHandler} >Cancel</Button>
                    <Button danger onClick={confirmDeleteHandler} >Delete</Button>
                </React.Fragment>;

    return (
        <React.Fragment>
            <Modal 
                show={showMap} 
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content" 
                footerClass="place-item__modal-actions"
                footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
            >
                <div className="map-container">
                    <Map coordinates={props.coordinates} />
                </div>
            </Modal>
            
            <Modal
                show={showConfirmModal}
                onCancel={closeConfirmHandler}
                header="Are you sure?"
                footerClass="place-item__modal-actions"
                footer={footerElement}
            >
                {isLoading && <LoadingSpinner asOverlay />}
                <p>Do you want to proceed and delete this place? Please note that it can't be undone thereafter.</p>
            </Modal>

            <ErrorModal error={error} onClear={clearError} />

            <li className="place-item">
                <Card className="place-item__content">
                    <div className="place-item__image">
                        <img src={`http://localhost:5000/${props.image}`} alt={props.title}/>
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>View on Map</Button>
                        {auth.isLoggedIn && auth.userId === props.creatorId &&
                            <React.Fragment>
                                <Button to={`/places/${props.id}`}>Edit</Button>
                                <Button danger onClick={openConfirmHandler} >Delete</Button>
                            </React.Fragment>}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;