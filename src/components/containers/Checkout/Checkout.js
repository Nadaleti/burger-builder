import React, { Component } from 'react';

import CheckoutSummary from '../../Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
  state = {
    ingredients: null
  }

  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (const queryParam of queryParams.entries()) {
      ingredients[queryParam[0]] = +queryParam[1];
    }

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
      </div>
    )
  }
}

export default Checkout;
