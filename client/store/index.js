import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'redux-simple-router';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunkMiddleware)(createStore);

export default createStoreWithMiddleware(reducers);
