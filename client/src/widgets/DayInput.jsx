import React from 'react';

import styles from './DayInput';

import CheckBox from './CheckBox';

const DayInput = ({ id, name = id }) => (
  <div id={id} className="day" name={name}>
    <p>Day of the Week</p>
    <CheckBox label={'Sunday'} id={`${id}-sunday`} name={name} checked />
    <CheckBox label={'Monday'} id={`${id}-monday`} name={name} />
    <CheckBox label={'Tuesday'} id={`${id}-tuesday`} name={name} />
    <CheckBox label={'Wednesday'} id={`${id}-wednesday`} name={name} />
    <CheckBox label={'Thrusday'} id={`${id}-thrusday`} name={name} />
    <CheckBox label={'Friday'} id={`${id}-friday`} name={name} />
    <CheckBox label={'Saturday'} id={`${id}-saturday`} name={name} />
  </div>
);
DayInput.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
};
DayInput.defaultProps = {
  name: undefined,
};
export default DayInput;
