import React, { Fragment, Component } from 'react';

import Modal from '../../UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, Axios) => {
  return class extends Component {
    state ={
      error: null
    }

    componentWillMount() {
      this.reqInterceptors = Axios.interceptors.request.use(
        (request) => {
          this.setState({error: null});
          return request;
        }
      );

      this.resInterceptors = Axios.interceptors.response.use(
        (response) => response,
        (error) => this.setState({error: error})
      );
    }

    // Need cleanup because the class is created every time, and the interceptors are created too. So, everytime it's created, the old interceptor still on the memory
    componentWillUnmount() {
      Axios.interceptors.request.eject(this.reqInterceptors);
      Axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }
    
    render() {
      return (
        <Fragment>
          <Modal show={!!this.state.error}
            closed={this.errorConfirmedHandler}>
              {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      )
    }
  };
};

export default withErrorHandler;