'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  useEslint: false,
  NODE_ENV: '"development"',
  BASE_API: '"http://47.96.144.110:9000"'
})
