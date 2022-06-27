import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import combineRedux from './redux/combineRedux';
const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(combineRedux)
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

