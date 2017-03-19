import React from 'react';

import styles from './CheckBox.css';

const CheckBox = ({ id, label, name = id, value, checked, onChange }) => (
  <div className={styles.container}>
    <input id={id} type="checkbox" name={name} className={styles.input} checked={checked} onChange={() => onChange(value, !checked)} />
    <label htmlFor={id} className={styles.label}>
      <span className={styles.checkbox} />
      <span>{label}</span>
    </label>
  </div>
);
CheckBox.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  name: React.PropTypes.string,
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};
CheckBox.defaultProps = {
  label: '',
  name: undefined,
  checked: false,
  onChange: () => {},
};
export default CheckBox;
