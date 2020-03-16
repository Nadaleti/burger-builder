import React, { Component, Fragment } from 'react';

import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';

import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: true
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
  }

  render() {
    return (
      <Fragment>
        <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} />
        <Toolbar />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Fragment>
    )
  }
}

export default Layout;