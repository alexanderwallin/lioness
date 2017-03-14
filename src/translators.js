import curry from 'lodash.curry'

export const t = curry((interpolate, translate, message, scope = {}) => {
  return interpolate(translate(message), scope)
})

export const tn = curry((interpolate, translate, one, other, count, scope = {}) => {
  return interpolate(translate(one, other, count), scope)
})

export const tp = curry((interpolate, translate, context, message, scope = {}) => {
  return interpolate(translate(context, message), scope)
})

export const tpn = curry((interpolate, translate, context, one, other, count, scope = {}) => {
  return interpolate(translate(context, one, other, count), scope)
})
