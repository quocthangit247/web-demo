import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import Homepage from './components/homepage/homepage';

const App = () => (
  <React.Fragment>
    <Homepage name="world 111" />
  </React.Fragment>
);
export default hot(App);
