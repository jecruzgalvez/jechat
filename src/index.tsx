import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from '../src/reducers/index';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import './bootstrap-3.3.7-dist/css/bootstrap.css';
import './bootstrap-3.3.7-dist/css/bootstrap-theme.css';

const store = createStore(rootReducer, composeWithDevTools( applyMiddleware(thunk) ));
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
