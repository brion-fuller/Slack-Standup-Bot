import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { ADD_STANDUP } from '../../../reducers/standups';
import style from './Standups.css';

export const Standups = ({ standups, addStandup }) => {
  const listStandups = () => standups.list.map((standup, key) => (
    <div className={style.item} key={key}>{standup.name}</div>
  ));
  return (
    <div>
      <div className={style.item}>Standups</div>
      {listStandups()}
      <button className={style.add}><Link to="/dashboard/add-standup">Profile</Link></button>
    </div>
  );
};

export default connect(
  ({ standups }) => ({ standups }),
  {
    addStandup: () => ({ type: ADD_STANDUP, payload: { name: 'Standup' } }),
  },
)(Standups);
