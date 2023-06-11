import React, {useState, useContext} from "react";
import { useForm } from "../../shared/components/hooks/form-hook";

import Input from "../../shared/components/FormElements/Input";
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
        ...initialLoginState
    };

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [initalFormState, setInitalFormState] = useState(initialLoginState)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    const [formState, inputHandler] = useForm(initalFormState, false);

    const auth = useContext(AuthContext);

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        if(isLoginMode) {
            try{
                const response =  await fetch("http://localhost:5000/api/users/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                });
                const responseData = await response.json();
                console.log(responseData);
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                auth.login();
            }
            catch(err) {
                console.log(err);
                setIsLoading(false);
                setError(err.message || "Something went wrong, please try again.");
            }
        }
        else {
            try{
                const response = await fetch("http://localhost:5000/api/users/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                });
                const responseData = await response.json();
                console.log(responseData);
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
                setIsLoading(false);
                auth.login();
            }
            catch(err) {
                console.log(err);
                setIsLoading(false);
                setError(err.message || "Something went wrong, please try again.");
            }
        }
    };

    const switchModeHandler = () => {
        setIsLoginMode(prevMode => !prevMode); // switch mode
        isLoginMode ? setInitalFormState(initialLoginState) : setInitalFormState(initialSignupState) // set initial form state
    };


    return(
        <React.Fragment>
            <ErrorModal error={error} onClear={() => setError(null)}/>
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
                        validators={[VALIDATOR_MINLENGTH(5)]}
                        errorText="Please enter a valid password, at least 5 characters."
                        onInput={inputHandler}
                    />

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