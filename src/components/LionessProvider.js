import React, { Component } from 'react'
import PropTypes from 'prop-types'

import getGettextInstance from '../getGettextInstance.js'
import * as contextTypes from '../contextTypes.js'
import { t, tn, tp, tnp, tc, tcn, tcp, tcnp } from '../translators.js'
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
    debug: PropTypes.bool,
  }

  static defaultProps = {
    debug: null,
  }

  // Child context types
  static childContextTypes = {
    ...contextTypes,
  }

  constructor(props) {
    super(props)

    const options = props.debug === null
      ? {}
      : { debug: props.debug }
    this.gt = getGettextInstance(props.messages, props.locale, options)
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
      tnp: tnp(this.gt.npgettext.bind(this.gt)),
      tc: tc(interpolateComponents, this.gt.gettext.bind(this.gt)),
      tcn: tcn(interpolateComponents, this.gt.ngettext.bind(this.gt)),
      tcp: tcp(interpolateComponents, this.gt.pgettext.bind(this.gt)),
      tcnp: tcnp(interpolateComponents, this.gt.npgettext.bind(this.gt)),
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
