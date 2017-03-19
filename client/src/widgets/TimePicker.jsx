import React from 'react';

import styles from './TimePicker.css';

const TimePicker = () => (
  <label className={styles.label}>
    <input type="text" className={[styles.noArrows, styles.input].join(' ')} />
  </label>
);

export default TimePicker;
