import React from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from './store';

import App from './components/App';
import DataTable from './components/DataTable/index';

// Sync routing history with redux store
const history = syncHistoryWithStore(browserHistory, store);

// Route configuration
export default (
  <Router history={history}>
    <Route path="/" component={App} />
    <Route path="/data_table"  component={DataTable}/>
  </Router>
);
