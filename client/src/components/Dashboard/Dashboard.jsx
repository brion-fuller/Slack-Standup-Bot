import React from 'react';
import {
  Link,
} from 'react-router';

import style from './Dashboard.css';

import Standups from './Standups/Standups';

const Dashboard = ({ children }) => (
  <div id={style.app}>
    <header className={style.header}>
      <span className={style.title}>
        Standup Bot
      </span>
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/dashboard/test">Profile</Link></li>
      </ul>
    </header>
    <div className={style.container}>
      <div className={style.leftSidebar}><Standups /></div>
      <div className={style.body}>{children}</div>
      <div className={style.rightSidebar}>Right Side</div>
    </div>
    <footer className={style.footer}><span className={style.madeWithLove}>Made with ♥ by Brion Fuller</span></footer>
  </div>
);

export default Dashboard;
