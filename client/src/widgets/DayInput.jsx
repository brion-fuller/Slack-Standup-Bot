import React from 'react';

import styles from './DayInput.css';

import CheckBox from './CheckBox';

const days = [
  { code: 'sunday', selected: false },
  { code: 'monday', selected: false },
  { code: 'tuesday', selected: false },
  { code: 'wednesday', selected: false },
  { code: 'thrusday', selected: false },
  { code: 'friday', selected: false },
  { code: 'saturday', selected: false },
];
export default class DayInput extends React.Component {
  getCheckBoxes() {
    return days.map((day, i) => (
      <CheckBox
        label={day.code[0].toUpperCase() + day.code.slice(1)}
        id={`${this.props.id}-${day.code}`}
        name={this.props.name}
        value={i}
        key={day.code}
        onChange={() => this.handleChange(day.code, !this.isChecked(day.code))}
        checked={this.isChecked(day.code)}
      />
    ));
  }
  isChecked(day) {
    return this.props.days.indexOf(day) >= 0;
  }
  handleChange(day, selected) {
    const days = [...this.props.days];
    const index = days.indexOf(day);
    if (index >= 0 && !selected) {
      days.splice(index, 1);
    }
    if (index < 0 && selected) {
      days.push(day);
    }
    this.props.onChange(days);
  }
  render() {
    return (
      <div id={this.props.id} className={styles.day} name={this.props.name || this.props.id}>
        <p className={styles.title}>Day of the Week</p>
        <div className={styles.dayContainer}>
          {this.getCheckBoxes()}
        </div>
      </div>
    );
  }
}
DayInput.propTypes = {
  id: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
  days: React.PropTypes.arrayOf(React.PropTypes.string),
  onChange: React.PropTypes.func,
};
DayInput.defaultProps = {
  name: null,
  days: [],
  onChange: () => {},
};

