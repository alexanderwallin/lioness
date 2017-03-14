import curry from 'lodash.curry'

import interpolateComponents from './interpolateComponents.js'

export const t = curry((translate, message, scope = {}) => {
  return interpolateComponents(translate(message), scope)
})

export const tn = curry((translate, one, other, count, scope = {}) => {
  return interpolateComponents(translate(one, other, count), scope)
})

export const tp = curry((translate, context, message, scope = {}) => {
  return interpolateComponents(translate(context, message), scope)
})

export const tpn = curry((translate, context, one, other, count, scope = {}) => {
  return interpolateComponents(translate(context, one, other, count), scope)
})

