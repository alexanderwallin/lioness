import React, { PropTypes } from 'react'
import isRequiredIf from 'react-proptype-conditional-require'

import withTranslators from '../withTranslators.js'

function ensureReactElement(toBeRendered) {
  return typeof toBeRendered === 'string'
    ? <span>{toBeRendered}</span>
    : toBeRendered
}

const T = ({ message, messagePlural, context, count, children, tcpn, ...scope }) => {
  delete scope.t
  delete scope.tp
  delete scope.tn
  delete scope.tpn
  delete scope.tc
  delete scope.tcp
  delete scope.tcn

  const msgid = message || children || ''

  const translatedContent = tcpn(context, msgid, messagePlural, count, { ...scope, count })
  return ensureReactElement(translatedContent)
}

const messagePropType = (otherPropName) => {
  return isRequiredIf(
    PropTypes.string,
    (props) => !props[otherPropName],
    `T requires either a message prop or a child node in the form of a pure string`
  )
}

T.propTypes = {
  message: messagePropType('children'),
  children: messagePropType('messages'),
  messagePlural: PropTypes.string,
  context: PropTypes.string,
  count: PropTypes.number,
  tcpn: PropTypes.func.isRequired,
}

T.defaultProps = {
  message: null,
  children: null,
  messagePlural: null,
  context: '',
  count: 1,
}

export default withTranslators(T)
