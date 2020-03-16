import React from 'react';

import classes from './NavigationItem.module.css';

const navigationItem = (props) => (
  <li className={classes['navigation-item']}>
    <a
      href={props.link}
      className={props.active ? classes.active : null}>
        {props.children}
    </a>
  </li>
);

export default navigationItem;