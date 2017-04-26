import React, { Component, PropTypes } from 'react'
import isRequiredIf from 'react-proptype-conditional-require'

import withTranslators from '../withTranslators.js'

const messagePropType = (otherPropName) => {
  return isRequiredIf(
    PropTypes.string,
    (props) => !props[otherPropName],
    `T requires either a message prop or a child node in the form of a pure string`
  )
}

class T extends Component {
  static propTypes = {
    message: messagePropType('children'),
    children: messagePropType('messages'),
    messagePlural: PropTypes.string,
    context: PropTypes.string,
    textDomain: PropTypes.string,
    count: PropTypes.number,
    tcpn: PropTypes.func.isRequired,
  }

  static defaultProps = {
    message: null,
    children: null,
    messagePlural: null,
    context: '',
    textDomain: '',
    count: 1,
  }

  render() {
    const { message, messagePlural, context, textDomain, count, children, tcdnp, ...scope } = this.props

    delete scope.t
    delete scope.tn
    delete scope.tp
    delete scope.td
    delete scope.tpn
    delete scope.tdp
    delete scope.tdn
    delete scope.tdnp
    delete scope.tc
    delete scope.tcn
    delete scope.tcp
    delete scope.tcd
    delete scope.tcpn
    delete scope.tcdp
    delete scope.tcdn

    const msgid = message || children || ''

    const translatedContent = tcdnp(textDomain, context, msgid, messagePlural, count, { ...scope, count })

    return typeof translatedContent === 'string'
      ? <span>{translatedContent}</span>
      : translatedContent
  }
}

export default withTranslators(T)
