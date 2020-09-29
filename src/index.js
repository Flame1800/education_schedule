import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers/index';
import thunk from 'redux-thunk';
import * as actions from './actions/index';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(thunk),
  )
);

store.dispatch(actions.loadShedule())

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
