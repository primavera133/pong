import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { I18nextProvider } from 'react-i18next';
import i18n from './config/i18n';
import store from './store';

import App from './components/App'
import List from './components/List'
import Create from './components/Create'
import Authenticate from './components/Authenticate'

import { requireAuth, updateHealthCenter, updateCorporation, updateUser, updateEncounter } from './routes';

render((
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to='/list'/>

        <Route path="/list" component={List} onEnter={requireAuth}/>
        <Route path="/create" component={Create} onEnter={requireAuth}/>
        <Route path='/login' component={Authenticate} onEnter={requireAuth}/>
      </Route>
    </Router>
    </I18nextProvider>
  </Provider>
), document.getElementById('root'))
