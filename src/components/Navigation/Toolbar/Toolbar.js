import React from 'react';

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

import classes from './Toolbar.module.css';

const toolbar = (props) => (
  <header className={classes.toolbar}>
    <DrawerToggle clicked={props.toggleDrawer} />
    <div className={classes.logo}>
      <Logo />
    </div>
    <nav className={classes['desktop-only']}>
      <NavigationItems />
    </nav>
  </header>
);

export default toolbar;
