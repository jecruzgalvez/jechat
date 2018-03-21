import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../src/reducers';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import './bootstrap-3.3.7-dist/css/bootstrap.css';
import './bootstrap-3.3.7-dist/css/bootstrap-theme.css';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
