import React from 'react';
import classnames from 'classnames';

import styles from './Button.css';

const Button = ({ children, className, onClick }) => (
  <button className={classnames(styles.button, className)} onClick={onClick} type="button">
    {children}
  </button>
);
Button.propTypes = {
  children: React.PropTypes.oneOfType([
    React.PropTypes.element,
    React.PropTypes.string,
  ]),
  className: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.arrayOf(React.PropTypes.string),
  ]),
  onClick: React.PropTypes.func,
};
Button.defaultProps = {
  children: null,
  className: null,
  onClick: () => {},
};
export default Button;
