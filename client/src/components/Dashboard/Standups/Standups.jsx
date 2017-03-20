import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Button } from 'widgets';
import { ADD_STANDUP } from '../../../reducers/standups';
import style from './Standups.css';

export const Standups = ({ standups, addStandup }) => {
  const listStandups = () => standups.map((standup, key) => (
    <div className={style.item} key={key}>{standup.name}</div>
  ));
  return (
    <div>
      <div className={style.item}>Standups</div>
      {listStandups()}
      <Button className={style.add}><Link to="/dashboard/add-standup/123">Add Standup</Link></Button>
    </div>
  );
};

export default connect(
  ({ standups }) => ({ standups: standups.list }),
  {
    addStandup: () => ({ type: ADD_STANDUP, payload: { name: 'Standup' } }),
  },
)(Standups);
