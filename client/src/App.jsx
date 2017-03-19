import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore, compose } from 'redux';

import style from './App.css';

import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import AddStandup from './components/AddStandup/AddStandup';
import Test from './components/Test/Test';

import reducer from './reducers';

const store = createStore(
  reducer,
  compose(
    window.devToolsExtension ? window.devToolsExtension() : undefined,
  ),
);


const App = () => (
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <Router history={syncHistoryWithStore(browserHistory, store)}>
      <div id={style.app}>
        <Route path="/" component={Home} />
        <Route path="login" component={Login} />
        <Route path="/dashboard" component={Dashboard}>
          <Route path="test" component={Test} />
          <Route path="add-standup" component={AddStandup} />
        </Route>
      </div>
    </Router>
  </Provider>
);

export default App;
