import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from 'src/redux';

import 'src/styles/index.scss';

import App from './App';

const root = document.getElementById('root');
const reactRoot = createRoot(root);
reactRoot.render(
  <Provider store={store}>
    <App/>
  </Provider>);