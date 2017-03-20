import React from 'react';
import classnames from 'classnames';

import styles from './CheckBox.css';

const CheckBox = ({ id, label, name, className, checked, onChange }) => (
  <div className={classnames(styles.container, className)}>
    <input id={id} type="checkbox" name={name || id} className={styles.input} checked={checked} onChange={() => onChange(!checked)} />
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
  className: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
  checked: React.PropTypes.bool,
  onChange: React.PropTypes.func,
};
CheckBox.defaultProps = {
  label: '',
  name: undefined,
  className: null,
  checked: false,
  onChange: () => {},
};
export default CheckBox;
