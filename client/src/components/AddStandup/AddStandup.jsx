import React from 'react';
import { connect } from 'react-redux';
import { TextInput, DayInput, Button } from 'widgets';
import { FORM_UPDATE, FORM_RESET, FORM_SUBMIT } from 'constants';
import Questions from './Questions/Questions';

import style from './AddStandup.css';

const AddStandup = ({ values, update, reset, submit }) => (
  <form className={style.container} onSubmit={data => console.log(data)}>
    <h1>Add Standup</h1>
    <TextInput label={'Name'} id={'name'} onChange={update} value={values.name} />
    <TextInput label={'Channel'} id={'channel'} onChange={update} value={values.channel} />
    <DayInput label={'Sunday'} id={'days'} days={values.days} onChange={update} />
    <TextInput label={'Time'} id={'time'} onChange={update} value={values.time} />
    <Button onClick={submit}>Save</Button>
    <Button onClick={reset}>Cancel</Button>
  </form>
);

export default connect(
  ({ standups }) => ({ values: standups.new }),
  {
    update: (name, value) => ({
      type: FORM_UPDATE,
      name,
      value,
    }),
    reset: () => ({
      type: FORM_RESET,
    }),
    submit: () => ({
      type: FORM_SUBMIT,
    }),
  },
)(AddStandup);
