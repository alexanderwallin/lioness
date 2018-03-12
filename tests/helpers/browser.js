/* global document */
/* eslint import/first: 0 */
import babelRegister from 'babel-register'

babelRegister()

import { jsdom } from 'jsdom'

const exposedProperties = ['window', 'navigator', 'document']

global.document = jsdom('')
global.window = document.defaultView
Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property)
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js',
}
