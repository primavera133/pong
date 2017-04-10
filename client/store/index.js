import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'redux-simple-router';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
let socket = io(process.env.IO_SOCKET);
let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunkMiddleware, socketIoMiddleware)(createStore);
const store = createStoreWithMiddleware(reducers)

//store.dispatch({type:'server/hello', data:'Hello Socket!'});

export default store;
