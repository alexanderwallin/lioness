import { PropTypes } from 'react'

import { withTranslators } from '../composers.js'

const T = ({ message, messagePlural, context, count, children, tpn, ...scope }) =>
  tpn(context, message || children.toString(), messagePlural, count, { ...scope, count })

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
