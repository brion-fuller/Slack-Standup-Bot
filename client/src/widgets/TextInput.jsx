import React from 'react';
import classNames from 'classnames';

import styles from './TextInput.css';

const TextInput = ({ id, label, className, onBlur, onChange, error, value, name }) => (
  <div className={classNames(styles.formElement, className, error ? styles.invalid : '')}>
    <label htmlFor={id} className={styles.label}>{label}</label>
    <input
      id={id}
      name={name || id}
      type="text"
      value={value}
      className={styles.input}
      onBlur={e => onBlur(name || id, e.target.value)}
      onChange={e => onChange(name || id, e.target.value)}
      aria-describedby={id + styles.msg}
    />
    { error ? <p id={id + styles.msg}className={styles.msg}>This is an error!</p> : null }
  </div>
);
TextInput.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
  value: React.PropTypes.string,
  label: React.PropTypes.string,
  error: React.PropTypes.string,
  className: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.string),
    React.PropTypes.string,
  ]),
  onBlur: React.PropTypes.func,
  onChange: React.PropTypes.func,
};
TextInput.defaultProps = {
  name: null,
  value: '',
  label: null,
  error: null,
  className: '',
  onBlur: () => {},
  onChange: () => {},
};

export default TextInput;
