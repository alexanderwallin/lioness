import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isRequiredIf from 'react-proptype-conditional-require'

import withTranslators from '../withTranslators.js'

const messagePropType = otherPropName => {
  return isRequiredIf(
    PropTypes.string,
    props => !props[otherPropName],
    `T requires either a message prop or a child node in the form of a pure string`
  )
}

class T extends Component {
  static propTypes = {
    message: messagePropType('children'),
    children: messagePropType('messages'),
    messagePlural: PropTypes.string,
    context: PropTypes.string,
    count: PropTypes.number,
    tcnp: PropTypes.func.isRequired,
  }

  static defaultProps = {
    message: null,
    children: null,
    messagePlural: null,
    context: '',
    count: 1,
  }

  render() {
    const {
      message,
      messagePlural,
      context,
      count,
      children,
      tcnp,
      ...scope
    } = this.props

    delete scope.t
    delete scope.tp
    delete scope.tn
    delete scope.tnp
    delete scope.tc
    delete scope.tcp
    delete scope.tcn

    const msgid = message || children || ''

    const translatedContent = tcnp(context, msgid, messagePlural, count, {
      ...scope,
      count,
    })

    return typeof translatedContent === 'string' ? (
      <span>{translatedContent}</span>
    ) : (
      translatedContent
    )
  }
}

export default withTranslators(T)
