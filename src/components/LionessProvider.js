import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Context from '../Context.js'
import getGettextInstance from '../getGettextInstance.js'
import { t, tn, tp, tnp, tc, tcn, tcp, tcnp } from '../translators.js'

/**
 * Localization context provider
 */
class LionessProvider extends Component {
  // Prop types
  static propTypes = {
    messages: PropTypes.shape({}).isRequired,
    locale: PropTypes.string.isRequired,
    transformInput: PropTypes.func,
    children: PropTypes.node.isRequired,
    debug: PropTypes.bool,
  }

  static defaultProps = {
    transformInput: (x) => x,
    debug: null,
  }

  constructor(props) {
    super(props)

    const options = props.debug === null ? {} : { debug: props.debug }
    this.gt = getGettextInstance(props.messages, props.locale, options)
  }

  /**
   * Set the locale when receiving new props
   */
  shouldComponentUpdate(nextProps) {
    const { locale } = this.props
    if (nextProps.locale !== locale) {
      this.gt.setLocale(nextProps.locale)
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
          t: t(this.gt.gettext.bind(this.gt)),
          tn: tn(this.gt.ngettext.bind(this.gt)),
          tp: tp(this.gt.pgettext.bind(this.gt)),
          tnp: tnp(this.gt.npgettext.bind(this.gt)),
          tc: tc(this.gt.gettext.bind(this.gt)),
          tcn: tcn(this.gt.ngettext.bind(this.gt)),
          tcp: tcp(this.gt.pgettext.bind(this.gt)),
          tcnp: tcnp(this.gt.npgettext.bind(this.gt)),
        }}
      >
        {children}
      </Context.Provider>
    )
  }
}

export default LionessProvider
