import React, { Component, PropTypes } from 'react'

import getGettextInstance from '../getGettextInstance.js'
import * as contextTypes from '../contextTypes.js'
import { t, tn, tp, td, tpn, tdn, tdp, tdnp, tc, tcn, tcp, tcd, tcpn, tcdp, tcdn, tcdnp } from '../translators.js'
import interpolateComponents from '../interpolateComponents.js'

/**
 * Localization context provider
 */
class LionessProvider extends Component {

  // Prop types
  static propTypes = {
    messages: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    textDomain: PropTypes.string,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    textDomain: 'messages',
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
      textDomain: this.props.textDomain,
      t: t(this.gt.gettext.bind(this.gt)),
      tn: tn(this.gt.ngettext.bind(this.gt)),
      tp: tp(this.gt.pgettext.bind(this.gt)),
      td: td(this.gt.dgettext.bind(this.gt)),
      tpn: tpn(this.gt.npgettext.bind(this.gt)),
      tdp: tdp(this.gt.dpgettext.bind(this.gt)),
      tdn: tdn(this.gt.dngettext.bind(this.gt)),
      tdnp: tdnp(this.gt.dnpgettext.bind(this.gt)),
      tc: tc(interpolateComponents, this.gt.gettext.bind(this.gt)),
      tcn: tcn(interpolateComponents, this.gt.ngettext.bind(this.gt)),
      tcp: tcp(interpolateComponents, this.gt.pgettext.bind(this.gt)),
      tcd: tcd(interpolateComponents, this.gt.dgettext.bind(this.gt)),
      tcpn: tcpn(interpolateComponents, this.gt.npgettext.bind(this.gt)),
      tcdp: tcdp(interpolateComponents, this.gt.dpgettext.bind(this.gt)),
      tcdn: tcdn(interpolateComponents, this.gt.dngettext.bind(this.gt)),
      tcdnp: tcdnp(interpolateComponents, this.gt.dnpgettext.bind(this.gt)),
    }
  }

  /**
   * Set the locale when receiving new props
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.locale !== this.props.locale) {
      this.gt.setLocale(nextProps.locale)
    }

    if (nextProps.textDomain !== this.props.textDomain) {
      this.gt.setTextDomain(nextProps.textDomain)
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}

export default LionessProvider
