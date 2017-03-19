import React from 'react';
import classNames from 'classnames';

import styles from './TextInput.css';

const TextInput = ({ id, label, className, onBlur, onChange, error }) => (
  <div className={classNames(styles.formElement, className, error ? styles.invalid : '')}>
    <label htmlFor={id} className={styles.label}>{label}</label>
    <input id={id} type="text" className={styles.input} onBlur={onBlur} onChange={onChange} aria-describedby={id + styles.msg} />
    { error ? <p id={id + styles.msg}className={styles.msg}>This is an error!</p> : null }
  </div>
);
TextInput.propTypes = {
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string,
  className: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.string),
    React.PropTypes.string,
  ]),
  onBlur: React.PropTypes.func,
  onChange: React.PropTypes.func,
};
TextInput.defaultProps = {
  label: null,
  className: '',
  onBlur: () => {},
  onChange: () => {},
};

export default TextInput;
