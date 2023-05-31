import React, {useState, useContext} from "react";
import { useForm } from "../../shared/components/hooks/form-hook";

import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import Button from "../../shared/components/FormElements/Button";

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
        address: {
            value: "",
            isValid: false
        },
        ...initialLoginState
    };

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [initalFormState, setInitalFormState] = useState(initialLoginState)

    const [formState, inputHandler] = useForm(initalFormState, false);

    const auth = useContext(AuthContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        auth.login();
    };

    const switchModeHandler = () => {

        setIsLoginMode(prevMode => !prevMode); // switch mode
        isLoginMode ? setInitalFormState(initialLoginState) : setInitalFormState(initialSignupState) // set initial form state
    };


    return(
        <Card className="authentication">
            <h2 className="authentication__header">{isLoginMode ? "Login Required" : "Sign In"}</h2>
            <hr/>
            <form>
            {!isLoginMode && 
                <React.Fragment>
                    <Input 
                        element="input" 
                        id="name"
                        type="name" 
                        label="Name" 
                        validators={[VALIDATOR_REQUIRE()]} 
                        errorText="Please enter a name."
                        onInput={inputHandler}
                    />
                    <Input 
                        element="input" 
                        id="address"
                        type="address" 
                        label="Address" 
                        validators={[VALIDATOR_REQUIRE()]} 
                        errorText="Please enter address."
                        onInput={inputHandler}
                    />
                </React.Fragment>}

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
    );
};

export default Auth;