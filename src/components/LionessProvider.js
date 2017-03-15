import React, { Component, PropTypes } from 'react'

import getGettextInstance from '../getGettextInstance.js'
import * as contextTypes from '../contextTypes.js'
import { t, tn, tp, tpn, tc, tcn, tcp, tcpn } from '../translators.js'
import interpolateComponents from '../interpolateComponents.js'

/**
 * Localization context provider
 */
class LionessProvider extends Component {

  // Prop types
  static propTypes = {
    messages: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  }

  // Child context types
  static childContextTypes = {
    ...contextTypes,
  }

  constructor(props) {
    super(props)

    this.gt = getGettextInstance(props.messages, props.locale)
  }

  /**
   * Translator functions are curried, so we return a set of functions
   * which all have been given a translation function.
   */
  getChildContext() {
    return {
      locale: this.props.locale,
      t: t(this.gt.gettext.bind(this.gt)),
      tn: tn(this.gt.ngettext.bind(this.gt)),
      tp: tp(this.gt.pgettext.bind(this.gt)),
      tpn: tpn(this.gt.npgettext.bind(this.gt)),
      tc: tc(interpolateComponents, this.gt.gettext.bind(this.gt)),
      tcn: tcn(interpolateComponents, this.gt.ngettext.bind(this.gt)),
      tcp: tcp(interpolateComponents, this.gt.pgettext.bind(this.gt)),
      tcpn: tcpn(interpolateComponents, this.gt.npgettext.bind(this.gt)),
    }
  }

  /**
   * Set the locale when receiving new props
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.locale !== this.props.locale) {
      this.gt.setLocale(nextProps.locale)
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

export default LionessProvider
