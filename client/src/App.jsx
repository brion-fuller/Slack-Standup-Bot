import React from 'react';
import style from './App.css';

export default () => (
  <div id={style.app}>
    <header className={style.header}>Header</header>
    <div className={style.container}>
      <div className={style.leftSidebar}>Left Side</div>
      <div className={style.body}>Body</div>
      <div className={style.rightSidebar}>Right Side</div>
    </div>
    <footer>Footer</footer>
  </div>
);
