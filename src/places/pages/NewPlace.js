import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import {VALIDATOR_REQUIRE} from '../../shared/util/validators';

import './NewPlace.css';

const NewPlace = () => {
  return (
    <form className="place-form">
      <Input
        label="Title"
        element="input" 
        type="text" 
        placeholder="Enter a title"
        errorText="Please enter a valid title"
        validators={[VALIDATOR_REQUIRE()]}
      />
    </form>
  )
};

export default NewPlace;