import React, { Component, PropTypes } from 'react';

import { getGettextInstance } from '../gettext';
import * as contextTypes from '../contextTypes';
import { t, tn, tp, tpn } from '../translators';

// Prop types
const propTypes = {
  messages: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  children: PropTypes.node,
};

// Child context types
const childContextTypes = {
  ...contextTypes,
};

/**
 * Localization context provider
 */
class LionessProvider extends Component {

  constructor(props) {
    super(props);

    this.gt = getGettextInstance(props.messages, props.locale);
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
    };
  }

  /**
   * Set the locale when receiving new props
   */
  componentWillReceiveProps(nextProps) {
    this.gt.setLocale(nextProps.locale);
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

LionessProvider.propTypes = propTypes;
LionessProvider.childContextTypes = childContextTypes;

export default LionessProvider;
