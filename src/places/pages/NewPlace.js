import React from 'react';
import Input from '../../shared/components/FormElements/Input';

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
        validators={[]}
      />
    </form>
  )
  
};

export default NewPlace;