import interpolate from './interpolate.js'

export default function createTranslator(translator) {
  return function translate({ context, message, messagePlural, count, scope }) {
    const translation = translator({
      context,
      message,
      messagePlural,
      count,
    })
    return interpolate(translation, scope)
  }
}
