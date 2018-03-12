import curry from 'lodash.curry'

import { interpolateComponents, interpolateString } from './interpolators.js'

export const ti = curry((interpolate, translate, message, scope = {}) => {
  return interpolate(translate(message), scope)
})

export const tin = curry(
  (interpolate, translate, one, other, count, scope = {}) => {
    return interpolate(translate(one, other, count), scope)
  }
)

export const tip = curry(
  (interpolate, translate, context, message, scope = {}) => {
    return interpolate(translate(context, message), scope)
  }
)

export const tinp = curry(
  (interpolate, translate, context, one, other, count, scope = {}) => {
    return interpolate(translate(context, one, other, count), scope)
  }
)

export const t = ti(interpolateString)
export const tn = tin(interpolateString)
export const tp = tip(interpolateString)
export const tnp = tinp(interpolateString)

export const tc = ti(interpolateComponents)
export const tcn = tin(interpolateComponents)
export const tcp = tip(interpolateComponents)
export const tcnp = tinp(interpolateComponents)
