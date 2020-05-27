import React, { Component, Fragment } from 'react';
import Axios from '../../../axios-orders';
import { connect } from 'react-redux';

import * as actionTypes from '../../../store/actions';
import Burger from '../../Burger/Burger';
import BuildControls from '../../Burger/BuildControls/BuildControls';
import Modal from '../../UI/Modal/Modal';
import OrderSummary from '../../Burger/OrderSummary/OrderSummary';
import Spinner from '../../UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  }

  componentDidMount() {
    // Axios.get('https://react-burger-builder-ed482.firebaseio.com/ingredients.json')
    //   .then((response) => {
    //     this.setState({ ingredients: response.data })
    //   })
    //   .catch((error) => this.setState({error: true}));
  }


  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.history.push('/checkout');
  }

  updatePurchaseState = () => {
    const sum = Object.keys(this.props.ings)
      .map(ingredientName => this.props.ings[ingredientName])
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ?
      <p>Ingredients cannot be loaded</p> : <Spinner />;
    
    if (this.props.ings) {
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        totalPrice={this.props.totalPrice} />;
      
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            ordered={this.purchaseHandler}
            price={this.props.totalPrice}
            purchasable={this.updatePurchaseState()} />
        </Fragment>
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Fragment>
        <Modal show={this.state.purchasing} closed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingredientName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingredientName}),
    onIngredientRemoved: (ingredientName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingredientName}),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));
