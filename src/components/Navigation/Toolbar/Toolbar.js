import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './Toolbar.module.css';

const toolbar = () => (
  <header className={classes.toolbar}>
    <div>MENU</div>
    <div className={classes.logo}>
      <Logo />
    </div>
    <nav className={classes['desktop-only']}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
