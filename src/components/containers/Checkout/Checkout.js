import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    price: 0
  }

  componentWillMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = 0;
    for (const queryParam of queryParams.entries()) {
      if (queryParam[0] === 'price') {
        price = queryParam[1];
      } else {
        ingredients[queryParam[0]] = +queryParam[1];
      }
    }

    this.setState({totalPrice: price});
    this.setState({ingredients: ingredients});
  }
  
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  }
  
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          canceled={this.checkoutCanceledHandler}
          continued={this.checkoutContinuedHandler} />

          <Route path={this.props.match.path + '/contact-data'} render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props} />} />
      </div>
    )
  }
}

export default Checkout;
