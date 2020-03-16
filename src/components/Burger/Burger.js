import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.module.css';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map(ingredientName => {
      return [...Array(props.ingredients[ingredientName])]
        .map((_, i) => <BurgerIngredient key={ ingredientName + i } type={ingredientName} />);
    })
    .reduce((arr, el) => arr.concat(el), []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please, start adding ingredients!</p>;
  }

  return (
    <div className={classes.burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
