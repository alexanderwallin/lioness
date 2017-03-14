import { PropTypes } from 'react'

import { withTranslators } from '../composers.js'

function ensureReactElement(toBeRendered) {
  return typeof toBeRendered === 'string'
    ? <span>{toBeRendered}</span>
    : toBeRendered
}

const T = ({ message, messagePlural, context, count, children, tpn, ...scope }) => {
  const translatedContent = tpn(context, message || children.toString(), messagePlural, count, { ...scope, count })
  return ensureReactElement(translatedContent)
}

T.propTypes = {
  message: PropTypes.string,
  messagePlural: PropTypes.string,
  context: PropTypes.string,
  count: PropTypes.number,
  children: PropTypes.node,
  tpn: PropTypes.func.isRequired,
}

T.defaultProps = {
  message: null,
  messagePlural: null,
  context: '',
  count: 1,
  children: null,
}

export default withTranslators(T)
