import React from 'react';

import styles from './CheckBox.css';

const CheckBox = ({ id, label, name = id, checked }) => (
  <div className={styles.container}>
    <input id={id} type="checkbox" name={name} className={styles.input} checked={checked} />
    <label htmlFor={id} className={styles.label}><span className={styles.checkbox} />{label}</label>
  </div>
);
CheckBox.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  checked: React.PropTypes.bool,
};
CheckBox.defaultProps = {
  label: '',
  name: undefined,
  checked: false,
};
export default CheckBox;
