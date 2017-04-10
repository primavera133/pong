'use strict'
console.log(1111111, process.env.AUTH_KEY)
console.log(2222222, process.env.PORT)
require('babel-register')
require('./server')
