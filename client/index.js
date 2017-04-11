import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {I18nextProvider} from 'react-i18next';
import i18n from './config/i18n';
import store from './store';

import About from './components/About'
import Account from './components/Account'
import App from './components/App'
import Authenticate from './components/Authenticate'
import Match from './components/Match'
import MatchList from './components/MatchList'
import MatchStart from './components/MatchStart'
import NotFound from './components/NotFound'
import SignUp from './components/SignUp'

import {requireAuth, updateMatch} from './routes';

render((
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <IndexRedirect to='/matches'/>
          <Route path="/about" component={About}/>
          <Route path="/account" component={Account} onEnter={requireAuth}/>
          <Route path='/login' component={Authenticate} onEnter={requireAuth}/>
          <Route path="/matches" component={MatchList} onEnter={requireAuth}/>
          <Route
            path="/match/:id"
            component={Match}
            onEnter={updateMatch}/>
          />
          <Route path="/signup" component={SignUp} onEnter={requireAuth}/>
          <Route path="/startmatch" component={MatchStart} onEnter={requireAuth}/>
          <Route path="*" component={NotFound} onEnter={requireAuth}/>
        </Route>
      </Router>
    </I18nextProvider>
  </Provider>
), document.getElementById('root'))
