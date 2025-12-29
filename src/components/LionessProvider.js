import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Context from '../Context.js'
import interpolate from '../interpolate.js'

function createInterpolatingTranslate(translate) {
  return function ({ context, message, messagePlural, count, scope }) {
    const translation = translate({
      context,
      message,
      messagePlural,
      count,
    })
    return interpolate(translation, scope)
  }
}

/**
 * Localization context provider
 */
class LionessProvider extends Component {
  static propTypes = {
    adapter: PropTypes.func.isRequired,
    messages: PropTypes.shape({}).isRequired,
    locale: PropTypes.string.isRequired,
    transformInput: PropTypes.func,
    children: PropTypes.node.isRequired,
    debug: PropTypes.bool,
  }

  static defaultProps = {
    transformInput: (x) => x,
    debug: false,
  }

  constructor(props) {
    super(props)

    const options = {
      sourceLocale: props.locale,
      debug: Boolean(props.debug),
    }
    this.translator = props.adapter(props.messages, props.locale, options)
    this.translate = createInterpolatingTranslate(this.translator.translate)
  }

  /**
   * Set the locale when receiving new props
   */
  shouldComponentUpdate(nextProps) {
    const { locale } = this.props
    if (nextProps.locale !== locale) {
      this.translator.setLocale(nextProps.locale)
    }
    return true
  }

  render() {
    const { locale, messages, transformInput, children } = this.props

    return (
      <Context.Provider
        value={{
          locale,
          messages,
          transformInput,
          t: this.translate,
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export default LionessProvider
