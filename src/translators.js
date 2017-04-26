import curry from 'lodash.curry'

export const tc = curry((interpolate, translate, message, scope = {}) => {
  return interpolate(translate(message), scope)
})

export const tcn = curry((interpolate, translate, one, other, count, scope = {}) => {
  return interpolate(translate(one, other, count), scope)
})

export const tcp = curry((interpolate, translate, context, message, scope = {}) => {
  return interpolate(translate(context, message), scope)
})

export const tcd = curry((interpolate, translate, domain, message, scope = {}) => {
  return interpolate(translate(domain, message), scope)
})

export const tcpn = curry((interpolate, translate, context, one, other, count, scope = {}) => {
  return interpolate(translate(context, one, other, count), scope)
})

export const tcdn = curry((interpolate, translate, domain, one, other, count, scope = {}) => {
  return interpolate(translate(domain, one, other, count), scope)
})

export const tcdp = curry((interpolate, translate, domain, context, message, scope = {}) => {
  return interpolate(translate(domain, context, message), scope)
})

export const tcdnp = curry((interpolate, translate, domain, context, one, other, count, scope = {}) => {
  return interpolate(translate(domain, context, one, other, count), scope)
})

const identity = x => x

export const t = tc(identity)
export const tn = tcn(identity)
export const tp = tcp(identity)
export const td = tcd(identity)
export const tpn = tcpn(identity)
export const tdn = tcdn(identity)
export const tdp = tcdp(identity)
export const tdnp = tcdnp(identity)
