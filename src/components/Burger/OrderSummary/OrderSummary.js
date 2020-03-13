import React, { Fragment } from 'react'

import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients)
    .map(ingredientName =>
      <li key={ingredientName}>
        <span style={{ textTransform: 'capitalize' }}>{ingredientName}</span>: {props.ingredients[ingredientName]}
      </li>);

  return (
    <Fragment>
      <h3>Your Order</h3>
      <p>Delicious burger with the following ingredients:</p>
      <ul>
        {ingredientSummary}
      </ul>
      
      <p><strong>Total Price: ${props.totalPrice.toFixed(2)}</strong></p>

      <p>Continue to checkout?</p>

      <div style={{float: 'right'}}>
        <Button buttonType="danger" clicked={props.purchaseCanceled}>CANCEL</Button>
        <Button buttonType="success" clicked={props.purchaseContinued}>CONTINUE</Button>
      </div>
    </Fragment>
  )
}

export default orderSummary;
