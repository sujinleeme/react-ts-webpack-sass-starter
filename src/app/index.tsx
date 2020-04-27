import React from 'react';

import { hot } from 'react-hot-loader';

import Banner from '../components/Banner';

const App: React.FC<{}> = () => (
  <div>
    <Banner name="sujin" />
    This is app entry.
  </div>
);

export default hot(module)(App);
