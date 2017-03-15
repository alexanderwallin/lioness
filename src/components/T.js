import React, { PropTypes } from 'react'

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

  const translatedContent = tcpn(context, message || children.toString(), messagePlural, count, { ...scope, count })
  return ensureReactElement(translatedContent)
}

T.propTypes = {
  message: PropTypes.string,
  messagePlural: PropTypes.string,
  context: PropTypes.string,
  count: PropTypes.number,
  children: PropTypes.node,
  tcpn: PropTypes.func.isRequired,
}

T.defaultProps = {
  message: null,
  messagePlural: null,
  context: '',
  count: 1,
  children: null,
}

export default withTranslators(T)
