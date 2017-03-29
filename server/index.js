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

mongoose.connect(config.get('database.host'))
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
    if(action.type === 'server/hello'){
      console.log('Got hello data!', action.data);
      socket.emit('action', {type:'RECEIVE_IO', data:'good day! ' + action.data});
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
    console.info('Pong listening at:', server.info.uri)
  })
})
