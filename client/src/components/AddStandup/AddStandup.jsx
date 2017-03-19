import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextInput, DayInput } from 'widgets';

import style from './AddStandup.css';

const AddStandup = ({ addStandup }) => (
  <form className={style.container}>
    <h1>Add Standup</h1>
    <TextInput label={'Name'} id={'name'} />
    <TextInput label={'Channel'} id={'channel'} />
    <DayInput label={'Sunday'} id={'day'} days={['sunday', 'wednesday']} />
    <TextInput label={'Time'} id={'time'} />
    <button onClick={addStandup}>Save</button>
  </form>
);

export default AddStandup;
