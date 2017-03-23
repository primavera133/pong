import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {I18nextProvider} from 'react-i18next';
import i18n from './config/i18n';
import store from './store';

import App from './components/App'
import SignUp from './components/SignUp'
import MatchList from './components/MatchList'
import MatchStart from './components/MatchStart'
import Authenticate from './components/Authenticate'

import {requireAuth, updateHealthCenter, updateCorporation, updateUser, updateEncounter} from './routes';

render((
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRedirect to='/matches'/>
          <Route path="/signup" component={SignUp} onEnter={requireAuth}/>
          <Route path="/matches" component={MatchList} onEnter={requireAuth}/>
          <Route path="/startmatch" component={MatchStart} onEnter={requireAuth}/>
          <Route path='/login' component={Authenticate} onEnter={requireAuth}/>
        </Route>
      </Router>
    </I18nextProvider>
  </Provider>
), document.getElementById('root'))
