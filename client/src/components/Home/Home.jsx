import React from 'react';

import style from './Home.css';

const Home = () => (
  <div className={style.container}>
    <h1 className={style.header}>Slack Standup Bot</h1>
    <div className={style.card}>This is a Section</div>
    <div className={style.card}>This is a Section</div>
    <div className={style.card}>This is a Section</div>
  </div>
);

export default Home;
