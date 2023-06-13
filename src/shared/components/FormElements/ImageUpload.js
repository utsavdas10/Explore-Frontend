import React, { useRef, useState, useEffect } from "react";

import Button from "./Button";

import "./ImageUpload.css";

const ImageUpload = props => {
    const filePickerRef = useRef();
    const [file, setFile] = useState();
    const [previewUrl, setPreviewUrl] = useState();
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!file) {
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewUrl(fileReader.result);
        };
        fileReader.readAsDataURL(file);
    }, [file]);

    const pickedHandler = event => {
        console.log(event.target);
        let pickedFile;
        let fileIsValid = isValid;
        if (event.target.files && event.target.files.length === 1) {
            pickedFile = event.target.files[0];
            setFile(pickedFile);
            setIsValid(true);
            fileIsValid = true;
        }
        else {
            setIsValid(false);
            fileIsValid = false;
        }
        props.onInput(props.id, pickedFile, fileIsValid);
    };

    const pickImageHandler = () => {
        filePickerRef.current.click();
    };

    return (
        <div className="form-control">
            <label htmlFor={props.id}>{props.label}</label>
            <input 
                id={props.id}
                ref={filePickerRef}
                className="image-upload__input"
                type="file"
                accept=".jpg,.png,.jpeg"
                style={{display: "none"}}
                onChange={pickedHandler}
            />
            <div className={`image-upload ${props.center && 'center'}`}>
                <div className="image-upload__preview"> 
                    {previewUrl && <img src={previewUrl} alt="Preview"/>}
                    {!previewUrl && <p>Please pick an image.</p>}
                </div>
                <Button type="button" onClick={() => filePickerRef.current.click()}>PICK IMAGE</Button>
            </div>
            {!isValid && <p>{props.errorText}</p>}
        </div>

    );
};


export default ImageUpload;