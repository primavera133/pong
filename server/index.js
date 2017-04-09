import Path from 'path'
import Hapi from 'hapi'
import Inert from 'inert'
import mongoose from 'mongoose'
import config from 'config'
import base from './base'
import auth from './api/auth'
import players from './api/players'
import matches from './api/matches'
import games from './api/games'

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('error', console.error.bind(console, 'db error:'))

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(Path.dirname(__dirname), 'dist')
      }
    }
  }
})

server.connection({
  host: 'localhost',
  port: process.env.PORT || 8000
})

const io = require('socket.io')(server.listener);
io.on('connection', (socket) => {
  // console.log("Socket connected: " + socket.id);

  socket.on('action', (action) => {
    switch (action.type) {
      case 'server/room/join':
        console.log('server/join', action.data)
        socket.join(action.data.room)
        break;
      case 'server/room/emit':
        console.log('server/room/emit', action.data)
        io.sockets.in(action.data.room).emit('action', {type: 'RECEIVE_ROOM_EMIT', data: JSON.stringify(action.data)});
        break;
      case 'server/room/broadcast':
        console.log('server/room/broadcast', action.data)
        socket.broadcast.to(action.data.room).emit('action', {type: 'RECEIVE_ROOM_BROADCAST', data: JSON.stringify(action.data)});
        break;
      case 'server/hello':
        console.log('server/hello', action.data);
        socket.emit('action', {type: 'RECEIVE_IO', data: 'emit! ' + action.data});
        socket.broadcast.emit('action', {type: 'RECEIVE_IO', data: 'broadcast! ' + action.data});
        io.sockets.emit('action', {type: 'RECEIVE_IO', data: 'yall! ' + action.data});
    }
  });
});

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack')
  const WebpackPlugin = require('hapi-webpack-plugin')
  const wpconfig = require('../webpack/config.dev')

  server.register({
    register: WebpackPlugin,
    options: {
      compiler: webpack(wpconfig),
      assets: {
        noInfo: true,
        publicPath: wpconfig.output.publicPath,
        quiet: true
      }
    }
  }, (error) => {
    if (error) throw error;
  })
}

server.register([
  {
    register: Inert
  },
  {
    register: base
  },
  {
    register: auth
  },
  {
    register: matches
  },
  {
    register: games
  },
  {
    register: players
  }
], (error) => {
  if (error) throw error

  server.start(() => {
    console.info('Ratatoskify listening at:', server.info.uri)
  })
})
