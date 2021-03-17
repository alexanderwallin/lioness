import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Context from '../Context.js'
import interpolate from '../interpolate.js'

function createTranslator(translator) {
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
    this.adapter = props.adapter(props.messages, props.locale, options)
    this.translate = createTranslator(this.adapter.translate)
  }

  /**
   * Set the locale when receiving new props
   */
  shouldComponentUpdate(nextProps) {
    const { locale } = this.props
    if (nextProps.locale !== locale) {
      this.adapter.setLocale(nextProps.locale)
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
          translate: this.translate,
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export default LionessProvider
