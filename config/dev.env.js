'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  useEslint: false,
  NODE_ENV: '"development"',
  BASE_API: '"http://dev.tabaosmart.com:9000"'
})
