import React from 'react';
import CartList from './CartList';
import CarForm from './CartForm';

const App: React.FC = () => {
  return (
    <div>
        <div>
      <h1>Hello, world!</h1>
      <CartList/>

        </div>
        <div>
            <CarForm/>
        </div>
    </div>
  );
};

export default App;
