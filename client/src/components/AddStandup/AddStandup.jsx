import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { TextInput, DayInput } from 'widgets';

import style from './AddStandup.css';

const AddStandup = ({ addStandup }) => (
  <form className={style.container}>
    <h1>Add Standup</h1>
    <ul>
      <li>
        <label htmlFor="name">Name</label>
        <input id="name" type="text" />
      </li>
      <li>
        <label htmlFor="channel">Channel</label>
        <input id="channel" type="text" />
      </li>
      <DayInput label={'Sunday'} id={'day'} />
      <TextInput label={'Time'} id={'time'} />
    </ul>
    <button onClick={addStandup}>Save</button>
  </form>
);

export default AddStandup;
