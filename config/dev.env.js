'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  useEslint: false,
  NODE_ENV: '"development"',
  BASE_API: '"http://www.edgar615.com:9000"'
})
