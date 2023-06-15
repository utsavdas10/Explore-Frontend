import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import Button from '../../shared/components/FormElements/Button';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';

import { useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { useForm } from '../../shared/components/hooks/form-hook';
import { useHttpClient } from '../../shared/components/hooks/http-hook';
import  ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

import { AuthContext } from '../../shared/context/auth-context';

import './PlaceForm.css';

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const history = useHistory();

  const placeSubmitHandler = async event => {
    event.preventDefault();
    try{
      const formData = new FormData();
      formData.append('title', formState.inputs.title.value);
      formData.append('description', formState.inputs.description.value);
      formData.append('address', formState.inputs.address.value);
      formData.append('image', formState.inputs.image.value);
      console.log(formData);
      const responseData = await sendRequest(
        'http://localhost:5000/api/places',
        'POST',
        formData,
        {
          Authorization: `Bearer ${auth.token}`
        }
      );
      history.push('/');
      console.log(responseData);
    }
    catch(err) {}

  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image" 
          label="Place Image"
          onInput={inputHandler} 
          errorText="Please provide an image."
        />
        <Button inverse type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
