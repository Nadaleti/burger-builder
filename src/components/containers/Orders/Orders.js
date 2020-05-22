import React, { Component } from 'react';

import Axios from '../../../axios-orders';
import Order from '../../Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import classes from './Orders.module.css';

class Orders extends Component {
  state = {
    loading: true,
    orders: []
  }

  componentDidMount() {
    Axios.get('/orders.json')
      .then(res => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
           ...res.data[key],
           id: key
          })
        }
        this.setState({orders: fetchedOrders, loading: false});
      })
      .catch(err => {
        this.setState({loading: false});
      })
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => 
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={order.price}
            />)}
      </div>
    )
  }
}

export default withErrorHandler(Orders, Axios);
