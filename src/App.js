import React from 'react';

import BurgerBuilder from './components/containers/BurgerBuilder/BurgerBuilder';
import Layout from './components/hoc/Layout/Layout';
import Checkout from './components/containers/Checkout/Checkout';

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder />
        <Checkout />
      </Layout>
    </div>
  );
}

export default App;
