import React, { Component } from 'react';

import Axios from '../../../../axios-orders';
import Button from '../../../UI/Button/Button';
import Spinner from '../../../UI/Spinner/Spinner';

import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: 'Matheus Nadaleti Garcia',
        address: {
          street: 'Rubens Palomio',
          zipCode: '13304651',
          country: 'Brazil'
        },
        email: 'mat.nadaleti@hotmail.com'
      },
      deliveryMethod: 'fastest'
    }

    this.setState({ loading: true });

    Axios.post('/orders.json', order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch((error) => {
        this.setState({ loading: false });
      });

    console.log(this.props.ingredients);
  }

  render() {
    let form = (<form>
      <input type="text" name="name" placeholder="Your Name" className={classes.Input} />
      <input type="text" name="email" placeholder="Your Mail" className={classes.Input} />
      <input type="text" name="street" placeholder="Street" className={classes.Input} />
      <input type="text" name="postal" placeholder="Postal Code" className={classes.Input} />
      <Button buttonType="success" clicked={this.orderHandler}>ORDER</Button>
    </form>);

    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Entry your contact data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData;
