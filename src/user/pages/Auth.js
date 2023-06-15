import React, {useState, useContext} from "react";
import { useForm } from "../../shared/components/hooks/form-hook";
import { useHttpClient } from "../../shared/components/hooks/http-hook";

import Input from "../../shared/components/FormElements/Input";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";

import { AuthContext } from "../../shared/context/auth-context";

import "./Auth.css"


const Auth = () => {

    const initialLoginState={
        email: {    
            value: "",
            isValid: false
        },
        password: {
            value: "",
            isValid: false
        }
    };
    const initialSignupState={
        name: {
            value: "",
            isValid: false
        },
        image: {
            value: null,
            isValid: false
        },
        ...initialLoginState
    };

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [initalFormState, setInitalFormState] = useState(initialLoginState)

    const [formState, inputHandler] = useForm(initalFormState, false);

    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const auth = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formState.inputs);
        if(isLoginMode) {
            try {
                const responseData = await sendRequest(
                    "http://localhost:5000/api/users/login",
                    "POST",
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        "Content-Type": "application/json"
                    }
                )
                auth.login(responseData.userId, responseData.token);
            }
            catch(err) {
                console.log(err);
            }
        }
        else {
            try {
                const formData = new FormData();
                formData.append("name", formState.inputs.name.value);
                formData.append("email", formState.inputs.email.value);
                formData.append("password", formState.inputs.password.value);
                formData.append("image", formState.inputs.image.value);
                const responseData = await sendRequest(
                    "http://localhost:5000/api/users/signup",
                    "POST",
                    formData
                );
                auth.login(responseData.userId, responseData.token);
            }
            catch(err) {
                console.log(err);
            }
        }    
    };

    const switchModeHandler = () => {
        setIsLoginMode(prevMode => !prevMode); // switch mode
        isLoginMode ? setInitalFormState(initialLoginState) : setInitalFormState(initialSignupState) // set initial form state
    };


    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay/>}
                <h2 className="authentication__header">{isLoginMode ? "Login Required" : "Sign In"}</h2>
                <hr/>
                <form>
                {!isLoginMode && 
                    <Input 
                        element="input" 
                        id="name"
                        type="name" 
                        label="Name" 
                        validators={[VALIDATOR_REQUIRE()]} 
                        errorText="Please enter a name."
                        onInput={inputHandler}
                    />}

                    <Input 
                        element="input" 
                        id="email"
                        type="email" 
                        label="E-Mail" 
                        validators={[VALIDATOR_EMAIL()]} 
                        errorText="Please enter a valid email address."
                        onInput={inputHandler}
                    />
                    <Input
                        element="input"
                        id="password"
                        type="password"
                        label="Password"
                        validators={[VALIDATOR_MINLENGTH(6)]}
                        errorText="Please enter a valid password, at least 6 characters."
                        onInput={inputHandler}
                    />
                {!isLoginMode && 
                    <ImageUpload 
                        center
                        label="Profile Image"
                        id="image" 
                        onInput={inputHandler} 
                        errorText="Please provide an image."
                    />}

                    <Button inverse 
                        type="submit" 
                        disabled={!formState.isValid}
                        onClick={handleSubmit}
                    >{isLoginMode ? "LOGIN" : "SIGNUP"}
                    </Button>

                </form>
                <Button inverse 
                    onClick={switchModeHandler}>SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}</Button>
            </Card>
        </React.Fragment>
    );
};

export default Auth;